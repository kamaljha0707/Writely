import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/features/authSlice.js'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import {useForm} from "react-hook-form"
import {Input, Button, Container} from './index'
import { GoArrowLeft } from "react-icons/go";

function Login() {
    let navigate = useNavigate()
    let dispatch = useDispatch()
    const { register, handleSubmit} = useForm()
    let [error, setError] = useState('')

const login = async(data)=>{
    setError('')
    try {
        const session = await authService.login(data)
        if(session){
            const userData = await authService.getCurrentUser()
            if(userData) dispatch(authLogin(userData));
            navigate('/')
        }
    } catch (error) {
        setError(error.message)
    }

}
  return (
    <Container>
    <div className=' flex w-full  justify-center items-start'>
      <div ><Link to={'/'}><GoArrowLeft title= 'Home page' className='text-3xl mt-3  '/></Link> </div>
    <div className='bg-white rounded-lg shadow-lg w-4/6  px-12 py-10 mx-24 min-h-60'>
        <h2 className="text-center text-4xl text-[#373f45] font-bold leading-tight font-serif">Log in to your account</h2>
        <p className="mt-2 text-center text-base text-[#373f45c8]">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline underline-offset-2 text-[#5678ff]"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='w-full  px-20 mt-6 p-8 justify-between items-center gap-6'>
            <div className='space-y-5'>
                <Input
                label="Email : "
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password : "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                <Button
                type="submit"
                >Sign in</Button>
            </div>
        </form>
        </div>
  </div>
    </Container>
        
  )
}

export default Login