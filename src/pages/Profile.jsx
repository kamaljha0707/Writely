import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../components";
import { GoArrowLeft } from "react-icons/go";
import { RiTwitterXLine } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import authService from "../appwrite/auth";
import formatDate from "../appwrite/date";

function Profile() {
  const [user, setUser] = useState("");

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userData = await authService.getCurrentUser();
        const name = userData.name;
        setUser(userData);
      } catch (error) {
        console.error("Error while fetching user:", error);
      }
    }
    fetchUserData();
  }, [setUser]);

  return (
    <div className="bg-[#f3f6f9] w-full md:px-24 md:py-16 xl:px-28 min-h-screen">
      <div className="flex gap-8 items-start">
        <Link to={"/"}>
          <GoArrowLeft title="Home page" className="text-3xl mt-3 mr-3  " />
        </Link>
        <div className="w-3/12">
          <header className=" rounded-lg  justify-between  items-start    min-h-60">
            <Logo className=""></Logo>
            <div className=" my-4 mx-6">
              <h1 className=" md:text-2xl text-4xl font-serif font-semibold text-[#373f45]">
                Writely{" "}
              </h1>
              <h3 className="text-[#373f45c8] md:text-lg text-xl my-2 font-serif font-semibold">
                by Kamal Jha
              </h3>
              <p className="md:my-6 md:mb-4 my-8 md:text-base border-b-2 pb-4 text-lg md:leading-7 leading-8">
                Welcome to Writely, where users can seamlessly write, read,
                update, and delete their blogs while effortlessly incorporating
                striking featured images to enhance their storytelling.
              </p>
              <span className="font-serif font-semibold gap-4 flex items-center">
                Share{" "}
                {
                  <RiTwitterXLine className=" cursor-pointer text-4xl rounded-full p-2 bg-gray-200" />
                }
                {
                  <FaFacebook className=" cursor-pointer text-4xl rounded-full p-2 bg-gray-200" />
                }
                {
                  <MdEmail className=" cursor-pointer text-4xl rounded-full p-2 bg-gray-200" />
                }{" "}
              </span>
            </div>
          </header>
        </div>
        <div className="w-full  bg-white py-8 px-14 rounded-lg">

        <div className="flex justify-start gap-20 items-start w-full mb-6">
        <div className="h-44 rounded-full border w-44   ">
            <img alt="image" className=" w-full rounded-xl h-full" />
          </div>

          <div className="mb-4">
            <h1 className="text-4xl leading-snug  font-serif text-[#373f45] font-bold">
              {user.name}{" "}
            </h1>
            <span className=" text-sm  font-serif">{user.email}</span>
            <br />
            <span className=" text-sm  font-serif">Created At: {formatDate(user.$createdAt)}</span>
          </div>
        </div>
          
          <hr />


          <div className="my-8 py-5 min-h-24 text-lg leading-relaxed ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum,
            fugiat? Explicabo vero repellat incidunt porro, totam laborum
            impedit numquam voluptates sit quaerat velit, provident magni
            dignissimos error repellendus molestiae nulla.
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Profile;
