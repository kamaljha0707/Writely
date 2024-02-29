import React from 'react'
import authService from '../appwrite/auth'
import {useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login as authLogin } from "../store/features/authSlice.js";


function GoogleAuth() {
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const googleAuth= async (e)=>{
      e.preventDefault()
    try {
     const session =  await authService.googleLogin()
      if (session) {
        const userData = await authService.getCurrentUser()
        if(userData) dispatch(authLogin(userData));
        navigate("/")
    }
    } catch (error) {
        console.log("Error during Google authentication:",error.message);
    }

    }

  return (
    <button type='submit' className="w-full py-2 text-md font-medium my-4  text-[#5678ff] hover:underline rounded-lg" onClick={(e)=>googleAuth(e)}>Sign in with Google</button>
  )
}

export default GoogleAuth