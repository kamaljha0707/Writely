import React from 'react'
import Logo from './Logo'

function Header() {
  return (
    <header className='bg-white rounded-lg w-auto flex justify-between items-start   px-12 py-10 mx-64 min-h-60'>
     <Logo></Logo>
    <div className="content">
    <h1 className='text-3xl font-serif font-semibold text-[#373f45]'>Writely <span className='text-xl font-medium '>(A bloging app)</span></h1>
    <h3 className='text-[#373f45c8] text-md my-2 font-serif font-semibold'>by Kamal Jha</h3>
    <p>Welcome to Writely, where users can seamlessly write, read, update, and delete their blogs while effortlessly incorporating striking featured images to enhance their storytelling. Writely provides the tools and support to craft compelling content that captivates audiences. Join our vibrant community of writers and readers today, and let your words shine with the power of visual storytelling. </p>
     <form action="" className='w-full mt-6 flex justify-between items-center gap-6'>
     <input type="text" className=' placeholder-gray-300 border py-2 px-4 outline-none w-full rounded-md 
'          placeholder='Search Blog' />
     <button className='bg-[#5678ff] flex flex-shrink-0 rounded-md text-white text-xl font-medium font-serif py-2 px-12'>Search</button>
     </form>
    </div> 
   </header>
  )
}

export default Header