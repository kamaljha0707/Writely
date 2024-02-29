import React, { useEffect, useState } from "react";
import { Logout } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsReceiptCutoff } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import authService from "../../appwrite/auth";
import  profile from '../../../public/profile.jpg'
import  card from '../../../public/card.jpg'


function Navbar() {
  const [username , setUsername] = useState('')
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status)
  const navItems = [
    {
      name: "Posts",
      slug: "/posts",
      active: true,
      icon: <BsReceiptCutoff className="text-xl font-light hidden md:block"/>
    },
    {
      name: "Add Posts",
      slug: "/add-posts",
      active: authStatus,
      // icon: <VscDiffAdded className="text-xl font-light hidden md:block"/>
      icon: <MdOutlineAddPhotoAlternate className="text-xl font-light hidden md:block"/>
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Sign up",
      slug: "/signup",
      active: !authStatus,
    },
  ];
  useEffect(() => {
    async function fetchUserData() {
        try {
            const userData = await authService.getCurrentUser();
            const name = userData.name;
            setUsername(name);
        } catch (error) {
            console.error("Error while fetching username:", error);
        }
    }

    fetchUserData();
}, [username]);
console.log(authStatus);
  return (
    <nav className="bg-white  text-[#373f45] rounded-lg w-full my-5 md:my-4 flex justify-between items-center   md:w-auto md:px-9 px-5 py-5 min-h-16">
      <ul className='flex  justify-between w-full '>
        <div className="flex  items-center gap-6 md:gap-11">
        {navItems.map((item) => 
            item.active ? (
              <li  key={item.name} className="text-md md:text-sm">
                <button
                onClick={() => navigate(item.slug)}
                className=" font-serif flex  items-center md:gap-3  font-semibold cursor-pointer"
                > {item.icon} {item.name}</button>
              </li>
            ) : null
            )}
            {/* logout */}
            {authStatus && (
              <li>
                 <Logout />
              </li>
            )}
        </div>
          <div className="flex items-center">
           {/* logged in */}
           {authStatus ? (
            <Link to={`/profile/${username}`}>
          <li className="flex items-center gap-3" title="go to profile">
            
            <img src={profile} className=" h-10 w-10   bg-gray-100 rounded-full"/>
            <button className="capitalize text-lg hover:underline hidden sm:block ">{username} </button>
             </li>
            </Link>  
         ) :  <li className="flex items-center gap-3" title="Guest">
            <img src={card} className=" h-10 w-10   bg-gray-100 rounded-full  text-[#5678ff]"/>
           <h1>Guest</h1>
         </li>}
           </div>
          </ul>
         
    </nav>
  );
}

export default Navbar;
