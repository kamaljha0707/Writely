import React, { useEffect, useState } from "react";
import { Query } from "appwrite";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { Logo } from "../components";
import { GoArrowLeft } from "react-icons/go";
import { RiTwitterXLine } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { AiFillLinkedin } from "react-icons/ai";
import authService from "../appwrite/auth";
import appwriteService from "../appwrite/db";
import formatDate from "../appwrite/date";
import  profileImg from '../../public/profile.jpg'



function Profile() {
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);
  const userId = user.$id;
  useEffect(() => {
    appwriteService.getUserPost(userId).then((posts) => {
      if (posts) {
        setPosts(posts.documents.reverse());
      }
    });
  }, [user]);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userData = await authService.getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error("Error while fetching user:", error);
      }
    }
    fetchUserData();
  }, [setUser]);

  return (
    <div className="bg-[#f3f6f9] w-full px-4 lg:px-24 lg:py-16 xl:px-28 min-h-screen">
      <div className="flex flex-col lg:flex-row  lg:gap-8  items-start">
        <Link to={"/"}>
          <GoArrowLeft title="Home page" className="text-3xl hover:bg-gray-300 p-1 rounded-sm mt-3 mr-3  " />
        </Link>
        <div className="w-full lg:w-3/12">
          <header className="h-full w-full flex lg:block rounded-lg  justify-start items-center lg:min-h-60">
            <Logo className=""></Logo>
            <div className="sm:my-4 mx-6">
              <h1 className="text-2xl font-serif font-semibold text-[#373f45]">
                Writely{" "}
              </h1>
              <h3 className="hidden lg:block text-[#373f45c8] md:text-lg text-xl my-2 font-serif font-semibold">
                by Kamal Jha
              </h3>
              <p className="hidden lg:block md:my-6 md:mb-4 my-8 md:text-base border-b-2 pb-4 text-lg md:leading-7 leading-8">
                Welcome to Writely, where users can seamlessly write, read,
                update, and delete their blogs while effortlessly incorporating
                striking featured images to enhance their storytelling.
              </p>
              <span  className=" font-serif font-semibold mt-4 gap-4 flex items-center text-sm"> Share
              <Link to='https://twitter.com/userkamaljha' target='_blank'><RiTwitterXLine className='bg-gray-200 hover:bg-gray-300 rounded-full p-2 text-4xl cursor-pointer'/></Link>
            <Link to= 'https://www.linkedin.com/in/kamal-jha-b55b78236/' target='_blank'><AiFillLinkedin className='bg-gray-200 hover:bg-gray-300 rounded-full p-2 text-4xl cursor-pointer'/></Link>
            <Link to='mailto:kamaljha0707@gmail.com' target='_blank'><MdEmail className='bg-gray-200 hover:bg-gray-300 rounded-full p-2 text-4xl cursor-pointer'/></Link>
               </span>
            </div>
          </header>
        </div>
        <div className="w-full  bg-white py-8 px-6 lg:px-14 rounded-lg">
          <div className="flex   justify-center h-32  lg:justify-start items-center gap-10 lg:gap-10  w-full mb-6">
            {/* <div className=" border p-0 rounded-full w-full xl:h-36 xl:w-52  hidden xl:block   "> */}
              <img src={profileImg} className="w-auto h-28 sm:h-32 cursor-pointer hover:opacity-75  " alt="" />
            {/* </div> */}
           
            <div className="w-full">
              <h1 className="text-2xl lg:text-3xl leading-snug capitalize  font-serif text-[#373f45] font-bold">
                {user.name}{" "}
              </h1>
              <span className=" text-lg text-[#373f45c8] hover:underline   font-serif">
                {user.email}
              </span>
              <br />
              <span className=" text-md ">
              Joined : {formatDate(user.$createdAt)}
              </span>
              <br />
              {/* <button className="bg-gray-200 mt-4 hover:bg-gray-100 px-2 rounded-sm p-1 my-1">Edit Profile</button> */}
            </div>
          </div>

          <hr />

          <div className="my-8 py-5 min-h-24 text-lg  w-full leading-relaxed ">
            <h1 className=" text-2xl lg:text-4xl leading-snug capitalize  font-serif text-[#373f45] font-bold">
              All Posts
            </h1>
            <div className="flex flex-wrap  h-full w-full  justify-start gap-8 items-start my-12">
              
              {posts.length !== 0 ? (
                posts.map((post) => (
                <Link to={`/post/${post.$id}`}>
                  <div className="flex flex-col shadow-md sm:border overflow-hidden drop-shadow-sm w-full md:w-48 gap-4 rounded-md">
                    <div className="h-44  overflow-hidden ">
                    <img
                      src={appwriteService.previewFile(post.featuredImage)}
                      alt={post.title}
                      className=" w-full md:h-44 transition shadow-md ease-in-out delay-150 duration-300 hover:scale-110"/>
                    </div>
                   
                    <div className=" w-full h-14 py-2   text-center line-clamp-3    ">
                    <h1 className=" text-base capitalize  line-clamp-1 font-semibold ">{post.title}</h1>
                    <span className="text-sm">{post.status} • {formatDate(post.$createdAt)}</span>
                    </div>
                    <span className="text-sm px-1 text-center ">Last updated • {formatDate(post.$updatedAt)}</span>
                    <span className=" p-2 text-sm font-normal text-center bg-[#f6f6f7] hover:bg-[#e8e8ebf4] rounded-md w-full">Edit Post</span>
                    <hr className="md:hidden" />
                  </div>
                </Link>

                ))
              ) : (
                <h1>No Post Found!!</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
