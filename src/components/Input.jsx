import React, {useId} from 'react'

const  Input = React.forwardRef(function Input({
      label,
      type = 'text',
      classname = 'placeholder-gray-300 border flex py-2 px-4 outline-none w-full rounded-md mt-2',
       ...props }, ref ){
     const id = useId()
        return(
        <div className=''>
        {label && <label className='text-lg' htmlFor={id}>
            {label}
            </label>
            }
            <input type={type} className={`${classname}`} ref={ref} {...props} id={id} />
    </div>
    )
})

export default Input