import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import appwriteService from "../appwrite/db.js"
import parse from "html-react-parser";
import formatDate from '../appwrite/date.js';

function Postcard({$id, title, content, featuredImage, $createdAt, username}) {

  const createdAt = $createdAt


 
  return (
    <Link to={`/post/${$id}`}>
    <div className='bg-white flex justify-start items-center gap-16 rounded-lg w-full px-12 py-6 min-h-44'>
        <div className='overflow-hidden rounded-xl h-48 w-72'>
          <img src={appwriteService.previewFile(featuredImage)} alt={title}
            className='rounded-xl transition h-full w-full ease-in-out delay-150 duration-300 hover:scale-110' />
        </div>
        <div className='w-full font-serif mt-8 '>
          <Link to={`/post/${$id}`}>
           <h2 className='text-2xl text-[#373f45] hover:underline capitalize font-bold'>{title}</h2>
          </Link>
         <p className='mt-8 text-base font-sans line-clamp-2 mb-8  w-full'>{parse(content)}</p>
        <span> {formatDate(createdAt)} • 4 min read</span>
        <br />
        <span>{username !== null ? <h1 className='font-sans capitalize'>Author • {username}</h1> : 'loading...'}</span>
        </div>
      
    </div>
</Link>
  )
}

export default Postcard