import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/db";
import {Container, FeaturedPost, Header, Navbar, Postcard} from '../components'

function Home() {
    const [posts, setPosts] = useState([])
    let  reversePost = posts.slice(0,-1).reverse()

    useEffect(() => {
        appwriteService.getAllPost()
        .then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
  
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
                                No Post to read 
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
                <div className='w-full md:w-auto   '>
                    {reversePost.map((post) => (
                        <div key={post.$id} className=' border-t-2 border-gray-100 '>
                            <Postcard {...post} />
                        </div>
                    ))}
                </div>
            </Container>

        </>
       
    )
}

export default Home