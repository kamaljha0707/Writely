import React from 'react'

function Container({children}) {
  return (
    <div className='bg-[#f3f6f9] w-full md:px-24 md:py-16 xl:px-64  min-h-screen '>
        {children}
    </div>
  )
}

export default Container