import React from "react";
import { Logout } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsReceiptCutoff } from "react-icons/bs";
import { VscDiffAdded } from "react-icons/vsc";
import authService from "../../appwrite/auth";

function Navbar() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate();
  const navItems = [
    {
      name: "Posts",
      slug: "/posts",
      class: " border-b-2  pb-5 border-[#5678ff]",
      active: true,
      icon: <BsReceiptCutoff className="text-xl font-light"/>
    },
    {
      name: "Add Posts",
      slug: "/add-posts",
      active: authStatus,
      icon: <VscDiffAdded className="text-xl font-light"/>
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
  return (
    <nav className="bg-white text-[#373f45] rounded-lg w-full my-5 md:my-4 flex justify-between  md:w-auto  px-12 py-6 pb-0  min-h-16">
      <ul className='flex gap-11'>
            {navItems.map((item) => 
            item.active ? (
              <li className={`${item.class}`} key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className=" md:text-sm text-lg font-serif flex items-center gap-3 font-semibold cursor-pointer"
                > {item.icon} {item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                 <Logout />
              </li>
            )}
          </ul>
      <h1>logged In</h1>
    </nav>
  );
}

export default Navbar;
