import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import appwriteService from "../appwrite/db.js"
import parse from "html-react-parser";
import formatDate from '../appwrite/date.js';

function Postcard({$id, title, content, featuredImage, $createdAt, username}) {

  const createdAt = $createdAt


 
  return (
    <Link to={`/post/${$id}`}>
    <div className=' bg-white flex flex-col sm:flex-row gap-6 justify-center items-center px-8 py-4 min-h-72'>
        <div className='hover:shadow-lg overflow-hidden rounded-xl w-full sm:w-72 max-h-56 sm:h-52 '>
          <img src={appwriteService.previewFile(featuredImage)} alt={title}
            className='rounded-xl transition h-full w-full ease-in-out delay-150 duration-300 hover:scale-110' />
        </div>
        <div className='w-full font-serif  '>
          <Link to={`/post/${$id}`}>
           <h2 className='text-2xl text-[#373f45] hover:underline capitalize font-bold'>{title}</h2>
          </Link>
         <p className='my-6 text-base font-sans line-clamp-3  w-full'>{parse(content)}</p>
        <span> {formatDate(createdAt)} • 4 min read</span>
        <br />
        <span>{username !== null ? <h1 className='font-sans capitalize'>Author • {username}</h1> : 'loading...'}</span>
        </div>
      
    </div>
</Link>
  )
}

export default Postcard