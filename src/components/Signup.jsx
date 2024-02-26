import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {useForm} from  'react-hook-form'
import authService from '../appwrite/auth'
import { login  } from '../store/features/authSlice'
import {Button, Container, Input} from './index'
import { GoArrowLeft } from "react-icons/go";

function Signup() {
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const dispatch = useDispatch()
  const {register, handleSubmit} = useForm()

  const create = async(data)=>{
    setError('')
    try {
      const userData = await authService.createAccount(data)
      if(userData){
        const userData = await authService.getCurrentUser()
        if(userData) dispatch(login(userData));
        navigate('/')
      }
    } catch (error) {
      setError(error.message)
    }

  }
  return (
    <div className="min-h-screen px-6 bg-[#f3f6f9] py-10 flex flex-col sm:flex-row sm:items-center justify-center sm:w-full gap-5 sm:gap-16">
      
      <div className="w-fit self-start my-16 sm:my-4 p-0.5 rounded-sm hover:bg-gray-200 sm:bg-[#f3f6f9] bg-gray-200">
      <Link to={'/'}><GoArrowLeft title='Home page' className='text-3xl  '/></Link> 
      </div>

      <div className="bg-white rounded-sm py-10 px-10 sm:px-20  ">
        <h2 className="text-center text-xl md:text-4xl text-[#373f45] font-bold leading-tight font-serif ">Sign up to create account</h2>
        <p className="mt-2 text-center text-sm md:text-base text-[#373f45c8]">
            Already have an account?&nbsp;
            <Link
                to="/login"
                className="font-medium text-primary transition-all duration-200 hover:underline underline-offset-2 text-[#5678ff]"
            >
                Sign In
            </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)} className='flex my-10 justify-center w-full'>
            <div className='space-y-5 w-full'>
                <Input
                label="Full Name: "
                placeholder="Enter your full name"
                {...register("name", {
                    required: true,
                })}
                />
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,})}
                />
                <Button type="submit">
                    Create Account
                </Button>
            </div>
        </form>
      </div>
     


    </div>

  )
}

export default Signup