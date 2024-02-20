import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import appwriteService from "../appwrite/db.js"
import parse from "html-react-parser";
import userService from '../appwrite/user.js';

function Postcard({$id, title, content, featuredImage, $createdAt, userId}) {

  const [username, setUsername] = useState(null)

  useEffect(()=>{
  userService.getUserNameById(userId)
  .then(username => {
    setUsername(username);
    })
    .catch(err => console.log('error while fetching username', err))
  }, [userId])
  const createdAt = $createdAt
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
}
  return (
    <Link to={`/post/${$id}`}>
    <div className='bg-white flex justify-start items-center gap-16 rounded-lg w-full px-12 py-6 min-h-44'>
        <div className='w-2/6 overflow-hidden '>
            <img src={appwriteService.previewFile(featuredImage)} alt={title}
            className='rounded-lg w-auto h-56 transition ease-in-out delay-150 duration-300 hover:scale-110' />

        </div>
        <div className='w-full font-serif mt-8 '>
          <Link to={`/post/${$id}`}>
           <h2 className='text-2xl text-[#373f45] hover:underline capitalize font-bold'>{title}</h2>
          </Link>
        <p className='mt-8 text-base  min-h-20 '>{parse(content)}</p>
        <span> {formatDate(createdAt)} • 4 min read</span>
        <br />
        {/* <span>{username !== null ? <h1>username : {username}</h1> : 'loading...'}</span> */}
        </div>
      
    </div>
</Link>
  )
}

export default Postcard