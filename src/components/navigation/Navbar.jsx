import React from "react";
import { Logout } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsReceiptCutoff } from "react-icons/bs";
import { VscDiffAdded } from "react-icons/vsc";

function Navbar() {
  const authStatus = true;
  const navigate = useNavigate();
  const navItems = [
    {
      name: "Posts",
      slug: "/posts",
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
      slug: "/sign-up",
      active: !authStatus,
    },
  ];
  return (
    <nav className="bg-white rounded-lg w-auto my-6 flex justify-between  px-12 py-5 mx-64 min-h-16">
      <ul className='flex gap-10'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className="text-lg font-serif flex items-center gap-3 font-medium cursor-pointer"
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
      <h1>user logged In</h1>
    </nav>
  );
}

export default Navbar;
