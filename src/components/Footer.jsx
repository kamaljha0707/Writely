import React from 'react'
import { RiTwitterXLine } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { AiFillLinkedin } from "react-icons/ai";
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='flex flex-col gap-7 sm:flex-row justify-center sm:justify-between items-center  pt-12 pb-7  sm:px-4 '>
        <div className='flex items-center gap-6 justify-center'>
        <h1 className='text-sm font-semibold font-serif'>Share this page</h1>
        <div className="icon flex items-center gap-4">
            <Link to='https://twitter.com/userkamaljha' target='_blank' title='Twitter profile'><RiTwitterXLine className='bg-gray-200 hover:bg-gray-300 rounded-full p-2 text-4xl cursor-pointer'/></Link>
            <Link to= 'https://www.linkedin.com/in/kamal-jha-b55b78236/' target='_blank' title='Linkedin profile'><AiFillLinkedin className='bg-gray-200 hover:bg-gray-300 rounded-full p-2 text-4xl cursor-pointer'/></Link>
            <Link to='mailto:kamaljha0707@gmail.com' target='_blank' title='Mail'><MdEmail className='bg-gray-200 hover:bg-gray-300 rounded-full p-2 text-4xl cursor-pointer'/></Link>
        </div>
        </div>
        <h1 className='text-gray-500  font-semibold'>Made by <Link to='https://github.com/userkamaljha' title='github profile' target='blank'><span className='hover:underline cursor-pointer'>Kamal Jha</span></Link> </h1>
    </div>
  )
}

export default Footer