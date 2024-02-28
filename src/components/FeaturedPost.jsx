import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import appwriteService from "../appwrite/db";
import  parse  from 'html-react-parser';
import formatDate from '../appwrite/date';
import profile from '../../public/card.jpg';




function FeaturedPost() {
    const [posts, setPosts] = useState([])
    const createdAt = posts.$createdAt
        useEffect(() => {
            appwriteService.getAllPost()
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents[0])
                }
            })
        }, [])

        function calculateReadingTime(paragraph) {
            const wordsPerMinute = 200;
          
            const totalWords = paragraph.split(/\s+/).length;
          
            const readingTimeMinutes = totalWords / wordsPerMinute;
          
            const readingTime = Math.ceil(readingTimeMinutes);
          
            return readingTime;
          }
   
   

  return (
    <div className="bg-white text-[#373f45]  rounded-lg w-full mb-6  flex flex-col-reverse sm:flex-row gap-6 justify-between items-center   px-8 py-6 min-h-72">
        <div className="content h-full w-full   sm:w-4/6 flex flex-col gap-4  items-start  ">
          <span className='bg-[#DAE0EB] text-[#48639C] font-serif text-sm p-1 px-2 rounded-lg '>Featured Post</span>
          <Link to={`/post/${posts.$id}`} >
          <h2 className='text-3xl  hover:underline  capitalize font-semibold  font-serif'>{posts.title}</h2>
          </Link>
          <p className=' text-base   capitalize  line-clamp-3 '>{parse(String(posts.content))}</p>

          <span className='font-semibold text-[#373f45c8] text-md capitalize flex items-center justify-between'> <h1 className='flex justify-start gap-3 mt-2 items-center font-sans capitalize'><img src={profile} className='h-9 w-9' alt="" />  {posts.username}</h1></span>
          <div className='mt-2'>
          <Link to={`/post/${posts.$id}`} className='border font-serif font-semibold p-3 px-2  text-[#373f45] rounded-md hover:bg-gray-200 mr-5'>Read now</Link>
          <span> {formatDate(createdAt)} • {calculateReadingTime(`${posts.content}`)} min read </span>
          </div>
        </div>
        <div className="post-img w-full sm:w-72  md:w-96 max-h-64  shadow-lg overflow-hidden rounded-lg">
            <Link to={`/post/${posts.$id}`}>
            <img src={appwriteService.previewFile(posts.featuredImage)}
            className='rounded-lg h-full  w-full  transition ease-in-out delay-150 duration-300 hover:scale-110  ' />
            </Link>
        
        </div>
    </div>
  )
}

export default FeaturedPost