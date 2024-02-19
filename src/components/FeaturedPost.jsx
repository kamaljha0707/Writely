import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import appwriteService from "../appwrite/db";
import  parse  from 'html-react-parser';



function FeaturedPost() {
    const [posts, setPosts] = useState([])
    const createdAt = posts.$createdAt
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
}


        useEffect(() => {
            appwriteService.getAllPost()
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents.slice().reverse()[0])
                }
            })
        }, [])
   
   

  return (
    <div className="bg-white text-[#373f45] rounded-lg w-full mb-6  flex gap-6 justify-between items-center  md:w-auto  px-8 py-6 min-h-72">
        <div className="content h-full w-4/6">
          <span className='bg-[#DAE0EB] text-[#48639C] font-serif text-sm p-1 px-2 rounded-lg '>Featured Post</span>
          <Link to={`/post/${posts.$id}`} >
          <h2 className='text-3xl hover:underline capitalize font-semibold my-5 mt-7 font-serif'>{posts.title}</h2>
          </Link>
          <p className='min-h-32 text-base capitalize mb-6'>{parse(String(posts.content))}</p>
          <Link to={`/post/${posts.$id}`} className='border font-serif font-semibold p-3 px-2 mt-2 text-[#373f45] rounded-md hover:bg-gray-200 mr-5'>Read now</Link>
          <span> {formatDate(createdAt)} • 4 min read</span>
        </div>
        <div className="post-img w-auto h-72">
            <Link to={`/post/${posts.$id}`}>
            <img src={appwriteService.previewFile(posts.featuredImage)}
            className='rounded-lg h-full w-full ' />
            </Link>
        
        </div>
    </div>
  )
}

export default FeaturedPost