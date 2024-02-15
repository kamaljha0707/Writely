import React from 'react'

function Button({children,
     type= "button",
    textColor = "text-white",
   classname = "bg-[#5678ff] flex  mt-10 flex-shrink-0 rounded-md text-white text-xl font-medium font-serif py-2 px-12",
    ...props}) {
  return (
    <button className={`${textColor} ${classname}`} {...props}>
        {children}
    </button>
  )
}

export default Button