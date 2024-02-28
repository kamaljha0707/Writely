import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/db";
import { Button, Container, Logo } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import {GoArrowLeft} from 'react-icons/go'
import { RiTwitterXLine } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import formatDate from "../appwrite/date";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  function calculateReadingTime(paragraph) {
    const wordsPerMinute = 200;
  
    const totalWords = paragraph.split(/\s+/).length;
  
    const readingTimeMinutes = totalWords / wordsPerMinute;
  
    const readingTime = Math.ceil(readingTimeMinutes);
  
    return readingTime;
  }

  return post ? (
      <div className="bg-[#f3f6f9] w-full px-4 lg:px-24 lg:py-16 xl:px-28 min-h-screen">
        <div className="flex flex-col lg:flex-row  lg:gap-8  items-start">    
       <Link to={'/'}><GoArrowLeft title='Home page' className='text-3xl hover:bg-gray-300 p-1 rounded-sm mt-3 mr-3  '/></Link>
          <div className="w-full lg:w-3/12">
          <header className="h-full w-full flex lg:block rounded-lg  justify-start items-center lg:min-h-60">
            <Logo className =''></Logo>
            <div className="sm:my-4 mx-6">
              <h1 className="text-2xl font-serif font-semibold text-[#373f45]">
                Writely{" "}
              </h1>
              <p className="hidden lg:block md:my-6 md:mb-4 my-8 md:text-base border-b-2 pb-4 text-lg md:leading-7 leading-8">
                Welcome to Writely, where users can seamlessly write, read,
                update, and delete their blogs while effortlessly incorporating
                striking featured images to enhance their storytelling.
              </p>
              <span  className=" font-serif font-semibold gap-4 flex items-center text-sm">Share {<RiTwitterXLine className=" text-3xl rounded-full p-2 bg-gray-200"/>}
              {<FaFacebook className=" text-3xl rounded-full p-2 bg-gray-200"/>} 
              {<MdEmail className=" text-3xl rounded-full p-2 bg-gray-200"/>} </span>
            </div>
          </header>
          </div>
          <div className="w-full bg-white py-8 px-14 rounded-lg">
            <div className="w-full mb-4">
              <h1 className="text-4xl lg:text-5xl leading-snug mb-6 font-serif text-[#373f45] font-bold">{post.title}</h1>
              <span className=" text-sm  font-serif">Published {formatDate(post.$createdAt)}  •  {calculateReadingTime(`${post.content}`)}  min read  </span>
            </div>
              <hr />
              <div className="overflow-hidden rounded-xl w-full sm:w-72 md:w-96 max-h-64 my-8">
            <img
              src={appwriteService.previewFile(post.featuredImage)}
              alt={post.title}
              className="rounded-xl shadow-md h-full w-full "
            />
            </div>
            <div className="my-8 mb-4 py-5 min-h-24 text-lg leading-relaxed ">{parse(post.content)}</div>
            <span className="flex justify-end text-xl text-[#6c6f71] "> ~ {post.username}</span>
            
            {isAuthor && (
              <div className="flex justify-end gap-4">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button classname="bg-red-500 hover:bg-[#f93f3f]  mt-10 flex-shrink-0 rounded-md text-white font-semibold text-md py-2 px-10" >
                    Edit
                  </Button>
                </Link>
                <Button classname="bg-[#5375fe] hover:bg-[#6886fd]    mt-10 flex-shrink-0 rounded-md text-white text-md font-semibold py-2 px-10" onClick={deletePost}>Delete</Button>
              </div>
            )}
          </div>
        </div>
      </div>
  ) : null;
}
