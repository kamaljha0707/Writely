import React from 'react'
import Logo from './Logo'

function Header() {
  return (
    <header className='bg-white rounded-lg w-full md:w-auto  flex flex-col justify-between md:flex-row items-start md:py-16 py-6 md:px-12   min-h-60'>
     <Logo></Logo>
    <div className=" my-4 mx-6">
    <h1 className=' md:text-3xl text-4xl font-serif font-semibold text-[#373f45]'>Writely <span className='md:text-xl text-2xl font-medium '>(A bloging app)</span></h1>
    <h3 className='text-[#373f45c8] md:text-lg text-xl my-2 font-serif font-semibold'>by Kamal Jha</h3>
    <p className='md:my-6 my-8 md:text-base text-lg md:leading-7 leading-8'>Welcome to Writely, where users can seamlessly write, read, update, and delete their blogs while effortlessly incorporating striking featured images to enhance their storytelling. Writely provides the tools and support to craft compelling content that captivates audiences. Join our vibrant community of writers and readers today, and let your words shine with the power of visual storytelling. </p>
     <form action="" className='w-full mt-6 flex flex-col md:flex-row justify-between  items-center gap-3'>
     <input type="text" className='text-lg placeholder-gray-300 border py-2  px-4 outline-none md:w-5/6 w-full rounded-md 
'          placeholder='Search blog by title' />
     <button className='bg-[#5678ff] flex  justify-center items-center rounded-md text-white md:w-2/6 text-2xl md:text-xl w-full font-medium font-serif py-2'>Search</button>
     </form>
    </div> 
   </header>
  )
}

export default Header