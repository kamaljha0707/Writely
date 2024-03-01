import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import appwriteService from "../appwrite/db.js"
import parse from "html-react-parser";
import formatDate from '../appwrite/date.js';
import profile from '../../public/card.jpg';
import { BeatLoader } from 'react-spinners';

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
    <>
    <div className=' bg-white flex flex-col sm:flex-row gap-6 justify-center items-center px-8 py-6 max-h-96'>
        <div className='shadow-sm hover:shadow-lg overflow-hidden rounded-xl w-full sm:w-72 max-h-48 sm:h-52 '>
      <Link to={`/post/${$id}`}>
          <img src={appwriteService.previewFile(featuredImage)} alt={title}
            className='rounded-xl transition h-full w-full ease-in-out duration-100 hover:scale-110' />
       </Link>
        </div>

        <div className='w-full font-serif  '>
          <Link to={`/post/${$id}`}>
           <h2 className='text-2xl text-[#373f45] hover:underline capitalize font-bold'>{title}</h2>
          </Link>
         <p className='my-6 text-base font-sans line-clamp-2  w-full'>{parse(content)}</p>

        
        <span>{username !== null ? <h1 className='flex justify-start gap-4 my-2 items-center font-sans capitalize'><img src={profile} className='h-8 w-8' alt="" />  {username}</h1> : <BeatLoader/>}</span>
        <span> {formatDate(createdAt)} • {calculateReadingTime(content)} min read</span>
        </div>
      
    </div>
    <hr />
   </>
  )
}

export default Postcard