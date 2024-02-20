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

  return post ? (
      <div className="bg-[#f3f6f9] w-full md:px-24 md:py-16 xl:px-28 min-h-screen">
        <div className="flex gap-8 items-start">    
       <Link to={'/'}><GoArrowLeft title='Home page' className='text-3xl mt-3 mr-3  '/></Link>
          <div className="w-3/12">
          <header className=" rounded-lg  justify-between  items-start    min-h-60">
            <Logo className =''></Logo>
            <div className=" my-4 mx-6">
              <h1 className=" md:text-2xl text-4xl font-serif font-semibold text-[#373f45]">
                Writely{" "}
                {/* <span className="md:text-lg text-2xl font-medium ">
                  (A bloging app)
                </span> */}
              </h1>
              <h3 className="text-[#373f45c8] md:text-lg text-xl my-2 font-serif font-semibold">
                by Kamal Jha
              </h3>
              <p className="md:my-6 md:mb-4 my-8 md:text-base border-b-2 pb-4 text-lg md:leading-7 leading-8">
                Welcome to Writely, where users can seamlessly write, read,
                update, and delete their blogs while effortlessly incorporating
                striking featured images to enhance their storytelling.
              </p>
              <span className="font-serif font-semibold gap-4 flex items-center">Share {<RiTwitterXLine className=" text-4xl rounded-full p-2 bg-gray-200"/>}
              {<FaFacebook className=" text-4xl rounded-full p-2 bg-gray-200"/>} 
              {<MdEmail className=" text-4xl rounded-full p-2 bg-gray-200"/>} </span>
            </div>
          </header>
          </div>
          <div className="w-full bg-white p-8 rounded-lg">
            <div className="w-full mb-4">
              <h1 className="text-5xl mb-6 font-serif text-[#373f45] font-bold">{post.title}</h1>
              <span className=" text-sm  font-serif">Publishd 4 day ago </span>
            </div>
              <hr />
            <div className="my-8 font-serif min-h-24 ">{parse(post.content)}</div>
            <div className="h-72 w-full flex justify-start  ">
            <img
              src={appwriteService.previewFile(post.featuredImage)}
              alt={post.title}
              className="rounded-xl h-full  "
            />
            </div>
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
