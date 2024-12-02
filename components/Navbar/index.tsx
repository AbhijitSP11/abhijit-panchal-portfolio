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
    <nav className='flex justify-between items-center fixed top-0 left-0 w-full backdrop-blur-md bg-black bg-opacity-60 px-32 py-4 z-50'>
       <div className="text-lg font-signature text-white">
            Abhijit
        </div>
        <div className='flex gap-8 items-center'>
            {
                Nav_Links.map((nav, idx) => (
                    <Link href={nav.link} >
                        <div key={idx} className="text-white">{nav.name}</div>
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
