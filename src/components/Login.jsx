import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/features/authSlice.js";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { Input, Button, Container } from "./index";
import { GoArrowLeft } from "react-icons/go";
import { FcGoogle } from "react-icons/fc";
import {GoogleAuth} from "./index";


function Login() {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('')


 const login = async(data) => {
  setError('')
    try {
        await authService.logout();
        const session = await authService.login(data)
        if (session) {
            const userData = await authService.getCurrentUser()
            console.log(userData);
            if(userData) dispatch(authLogin(userData));
            navigate("/")
        }
    } catch (error) {
    setError(error.message)
    }
  
}

  return (
      <div className="min-h-screen px-6 bg-[#f3f6f9] py-10 flex flex-col sm:flex-row sm:items-center justify-center sm:w-full gap-5 sm:gap-16">
        <div className="w-fit self-start my-16 p-0.5 rounded-sm hover:bg-gray-200 sm:bg-[#f3f6f9] bg-gray-200">
          <Link to={"/"}>
            <GoArrowLeft title="Home page" className="text-3xl   " />
          </Link>{" "}
        </div>
        <div className=" bg-white rounded-sm py-10 px-10 sm:px-20 ">
          <h2 className="text-center text-xl md:text-4xl text-[#373f45] font-bold leading-tight font-serif">
            Log in to your account
          </h2>
          <p className="mt-2 text-center text-sm md:text-base text-[#373f45c8]">
            Don&apos;t have any account?&nbsp;
            <Link
              to="/signup"
              className="font-medium text-primary transition-all duration-200 hover:underline underline-offset-2 text-[#5678ff]"
            >
              Sign Up
            </Link>
          </p>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
          <form
            onSubmit={handleSubmit(login)}
            className="flex my-10 justify-center w-full"
          >
            <div className="space-y-5 w-full">
              <Input
                label="Email : "
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
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
              <div className=" gap-5">
                <Button type="submit">Sign in</Button>
                {/* <GoogleAuth/> */}
              </div>
            </div>
          </form>
        </div>
      </div>
 
  );
}

export default Login;
