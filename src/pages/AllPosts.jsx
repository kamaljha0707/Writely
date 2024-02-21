import React, { useEffect, useState } from 'react'
import { Postcard } from '../components'
import appwriteService from "../appwrite/db"

function AllPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(()=>{
    appwriteService.getAllPost([])
    .then((posts) => {
      if(posts){
        setPosts(posts.documents)
      }
    })
  }, [ ])

 
  return (
   <div>
      <div className='flex  flex-wrap'></div>
      {posts.map((post)=> (
        <Postcard key={post.$id} post= {post}/>
      ))}
   </div>
  )
}

export default AllPosts