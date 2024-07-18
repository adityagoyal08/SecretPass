import React from 'react';

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>
      <div className='md:myContainer flex justify-between items-center py-5 h-14 '>
        <div className="logo font-bold text-white text-2xl">
          <span className='text-green-700'>&lt;</span>
          <span>Pass</span><span className='text-green-700'>OP/&gt;</span>
        </div>
        <ul>
          <li className='flex gap-3 font-bold'>
            <a className='' href="/" >Home</a>
            <a className='' href="#" >About</a>
            <a className='' href="#" >Contact</a>
          </li>
        </ul>
        <a href="https://github.com" target='_blank'>
          <button className='text-white my-5 flex justify-between items-center bg-gray-600 rounded-full'>
            <img className='w-9 p-2  md:m-0' src="/icons/github-mark-white.png" alt="Github" />
            <span className='font-bold px-2 hidden md:block'>GitHub</span>
          </button>
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
