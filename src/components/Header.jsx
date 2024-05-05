import React from 'react'

const Header = () => {
  return (
    <div className='flex flex-row justify-evenly items-center w-full bg-blue-400 md:h-[4rem]'>
        <h1 className='text-white mx-2 text-xl font-bold'>Front-end App</h1>
        <a href="https://parv-portfolio.netlify.app/">Have a look at my portfolio too!</a>
    </div>
  )
}

export default Header