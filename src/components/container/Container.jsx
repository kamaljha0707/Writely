import React from 'react'

function Container({children}) {
  return (
    <div className='bg-[#f3f6f9] w-full min-h-screen sm:py-12 sm:px-4 md:px-10 lg:px-24 xl:px-72 '>
        {children}
    </div>
  )
}

export default Container