import React from 'react'

function Button({children,
     type= "button",
    textColor = "text-white",
   classname = "bg-[#5678ff] flex hover:bg-[#6886fd] flex-shrink-0 rounded-md text-white text-xl font-medium font-serif py-2 px-12 justify-center items-center w-full ",
    ...props}) {
  return (
    <button className={`${textColor} ${classname}`} {...props}>
        {children}
    </button>
  )
}

export default Button