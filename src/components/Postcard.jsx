import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import appwriteService from "../appwrite/db.js"
import parse from "html-react-parser";
import formatDate from '../appwrite/date.js';
import profile from '../../public/card.jpg';

function Postcard({$id, title, content, featuredImage, $createdAt, username}) {

  const createdAt = $createdAt

  function calculateReadingTime(paragraph) {
    const wordsPerMinute = 200;
  
    const totalWords = paragraph.split(/\s+/).length;
  
    const readingTimeMinutes = totalWords / wordsPerMinute;
  
    const readingTime = Math.ceil(readingTimeMinutes);
  
    return readingTime;
  }
 
  return (
    <Link to={`/post/${$id}`}>
    <div className=' bg-white flex flex-col sm:flex-row gap-6 justify-center items-center px-8 py-4 max-h-96'>
        <div className='hover:shadow-lg overflow-hidden rounded-xl w-full sm:w-72 max-h-48 sm:h-52 '>
          <img src={appwriteService.previewFile(featuredImage)} alt={title}
            className='rounded-xl transition h-full w-full ease-in-out delay-150 duration-300 hover:scale-110' />
        </div>
        <div className='w-full font-serif  '>
          <Link to={`/post/${$id}`}>
           <h2 className='text-2xl text-[#373f45] hover:underline capitalize font-bold'>{title}</h2>
          </Link>
         <p className='my-6 text-base font-sans line-clamp-2  w-full'>{parse(content)}</p>

        
        <span> {formatDate(createdAt)} • {calculateReadingTime(content)} min read</span>
        <br />
        <span>{username !== null ? <h1 className='flex justify-start gap-4 mt-2 items-center font-sans capitalize'><img src={profile} className='h-8 w-8' alt="" />  {username}</h1> : 'loading...'}</span>
        </div>
      
    </div>
    <hr />
</Link>
  )
}

export default Postcard