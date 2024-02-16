import React from 'react'
import {useDispatch} from 'react-redux' 
import authService from '../../appwrite/auth.js'
import {logout} from "../../store/features/authSlice.js"
import { FiLogIn } from "react-icons/fi";


function Logout() {
    const dispatch = useDispatch()
    const logoutHandler = ()=>{
        authService.logout()
        .then(()=>{
            dispatch(logout())
        })
    }
  return (
    <>
    <button className='text-lg flex items-center gap-3 font-serif font-medium cursor-pointer' onClick={logoutHandler}>
      <FiLogIn className="text-xl font-light text-[#5678ff]"/> Logout
      </button>
    </>

  )
}

export default Logout