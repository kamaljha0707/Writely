import React, {useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { BeatLoader } from "react-spinners"


export default function Protected({children, authentication}) {
    let navigate = useNavigate()
    let [loader, setLoader] = useState(true)
    let authStatus = useSelector(state => state.auth.status)
    
    useEffect(()=>{
     if(authentication  && authStatus !== authentication ){
      navigate('/login')
     }else if(!authentication  && authStatus !== authentication ){
       navigate("/")
     }

     setLoader(false)
    },[authStatus, navigate, authentication ])


  return loader ? <BeatLoader color="#5678ff" />: <>{children}</>
}
