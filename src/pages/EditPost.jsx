import React, {useEffect, useState} from 'react'
import { PostForm } from '../components'
import appwriteService from "../appwrite/db"
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
    let [post, setPost] = useEffect(null)
    let {slug} =useParams()
    let navigate = useNavigate()

    useEffect(()=>{
    if(slug){
        appwriteService.getPost(slug)
        .then((post) =>{
      if(post){
        setPost(post)
      }else( navigate('/'))
        })
    }
    }, [slug, navigate])
  return post ? (
    <div className='py-8'>
        <PostForm post={post}/>
    </div>
  ) : null
}

export default EditPost