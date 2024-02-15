import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/db";
import {Container, Header, Navbar, Postcard} from '../components'

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getAllPost().then((posts) => {
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
                                Login to read posts
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
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <Postcard {...post} />
                        </div>
                    ))}
                </div>
            </Container>

        </>
       
    )
}

export default Home