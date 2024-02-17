import React from 'react'
import { Link } from 'react-router-dom'
import appwriteService from "../appwrite/db"

function Postcard({$id, title, featuredImage, username}) {
  return (
    <Link to={`/post/${$id}`}>
    <div className='bg-white rounded-sm w-full px-12 py-10 min-h-96'>
        <div className='w-full justify-center mb-4'>
            <img src={appwriteService.previewFile(featuredImage)} alt={title}
            className='rounded-xl' />

        </div>
        <h2
        className='text-xl font-bold'
        >{title}</h2>
        <h2>{username}</h2>
    </div>
</Link>
  )
}

export default Postcard