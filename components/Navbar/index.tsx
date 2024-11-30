import { div } from 'framer-motion/client';
import React from 'react'

type Props = {}

interface INavLinks {
    id: number;
    name: string;
    link: string;
}

const Nav_Links: INavLinks[] = [
    {   id:1,
        name: "About", 
        link: "", 
    },
    {   id:2,
        name: "Projects", 
        link: "", 
    },
    {   id:3,
        name: "Experience", 
        link: "", 
    },
    {   id:4,
        name: "Contact", 
        link: "", 
    },
]

const Navbar = (props: Props) => {
  return (
    <nav className='flex justify-between items-center'> 
        <div>Abhijit</div>
        <div className='flex gap-8 items-center'>
            {
                Nav_Links.map((nav, idx)=> (
                    <div key={idx}>{nav.name}</div>
                ))
            }
        </div>
        <button className='bg-white text-gray-800 px-4 py-2 rounded-full'>Resume</button>
    </nav>
  )
}

export default Navbar