import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-800 text-white flex justify-between px-9 py-2 w-full'>

      <div className='logo font-bold text-white text-2xl'>
        <span className='text-green-700'>&lt;</span>
        <span>Pass</span>

        <span className='text-green-500'>OP/&gt;</span>
      </div>
      <div className='font-bold'>&copy; Copyright 2024 pass.OP</div>
      <div className='font-bold'> Created by Aditya</div>
    </div>
  )
}

export default Footer