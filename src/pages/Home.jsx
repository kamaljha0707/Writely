import React, {useEffect, useState} from 'react'
import { Query } from 'appwrite';
import appwriteService from "../appwrite/db";
import { IoMdClose } from "react-icons/io";
import { useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import {Container, FeaturedPost, Header, Navbar, Postcard} from '../components'
import {Footer} from '../components';


function Home() {
    const [posts, setPosts] = useState([])
    const [limit, setLimit] = useState(5)
    const createdAt = ('')
    useEffect(() => {
        appwriteService.getAllPost([Query.limit(limit), Query.offset(0), Query.orderDesc(createdAt)])
        .then((posts) => {
            if (posts) {
                setPosts(posts.documents)
                
            }
            
        })
    }, [limit])


    if (posts.length === 0) {
        return (
            <>
            <Container>
            <Header/>
            <Navbar/>
             <div className="w-full py-8  text-center">
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                <BeatLoader color="#5678ff" />
                            </h1>
                        </div>
                    </div>
            </div>
            </Container>
            </>
           
        )
    }
    return (
        <>
        <Container>
            <Header/>
            <Navbar/>
            <FeaturedPost />
                    {posts.length <= 1 ? null :<div className='w-full md:w-auto bg-white rounded-lg'>
                    {posts.slice(1).map((post) => (
                        <div key={post.$id}>
                            <Postcard {...post} />
                        </div>
                    ))}
                   {(limit == posts.length) ? ( <div className='flex justify-center p-4'>
                     <button className='p-2 border rounded-md  hover:bg-gray-100 ' onClick={()=> setLimit(limit + 5)}>View more posts</button>
                    </div>) : null  }
                    
                </div>}
                <Footer/>
            </Container>

        </>
       
    )
}

export default Home