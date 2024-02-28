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
    <button className='text-sm text-[#373f45] flex items-center gap-3 font-serif font-semibold cursor-pointer' onClick={logoutHandler}>
      <FiLogIn className="hidden md:block text-xl font-light text-[#5678ff]"/> Logout
      </button>
    </>

  )
}

export default Logout