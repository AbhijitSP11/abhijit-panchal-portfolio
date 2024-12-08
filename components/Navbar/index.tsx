import Link from 'next/link';
import React from 'react'

interface INavLinks {
    id: number;
    name: string;
    link: string;
}

const Nav_Links: INavLinks[] = [
    {   id:1,
        name: "About", 
        link: "/about", 
    },
    {   id:2,
        name: "Projects", 
        link: "/projects", 
    },
    {   id:3,
        name: "Experience", 
        link: "/experience", 
    },
    {   id:4,
        name: "Contact", 
        link: "/contact", 
    },
]

const Navbar = () => {
  return (
    <nav className={`flex justify-between items-center fixed top-0 left-0 w-full px-32 py-4 z-50 `}>
       <div className='flex items-center gap-2'>
            <span className='text-2xl font-bold text-white'>Abhijit</span>
            <span className='text-sm text-green-500 tracking-wide rounded-full px-4 bg-[#1A1A1A]'>
                Available
            </span>
        </div>
        <div className='flex gap-8 items-center bg-[#070707] text-sm py-4  px-8 rounded-full'>
            {
                Nav_Links.map((nav, idx) => (
                    <Link href={nav.link} key={idx}>
                        <div key={idx} className="text-white hover:bg-white hover:text-black hover:p-4 hover:rounded-full">{nav.name}</div>
                    </Link>
                ))
            }
        </div>
        <a href="/path-to-your-resume.pdf" download>
            <button className='bg-white text-black italic px-6 py-2 rounded-full hover:scale-105 transition transform duration-300'>
                Resume
            </button>
        </a>
    </nav>
  )
}

export default Navbar;
