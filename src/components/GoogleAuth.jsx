import React from 'react'
import authService from '../appwrite/auth'
import {useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login as authLogin } from "../store/features/authSlice.js";


function GoogleAuth() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

   function handleGoogleLogin(){

    authService.googleLogin('http://localhost:5173', 'http://localhost:5173/login')
    .then(session => {
        console.log('User logged in successfully:', session);
        dispatch(authLogin(session))
    })
    .catch(error => {
        console.error('Error during Google login:', error);
    });
    }




  return (
    <button type='submit' className="w-full py-2 text-md font-medium my-4  text-[#5678ff] hover:underline rounded-lg" onClick={handleGoogleLogin}>Sign in with Google</button>
  )
}

export default GoogleAuth