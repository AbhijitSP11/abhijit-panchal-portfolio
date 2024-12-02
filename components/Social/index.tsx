import { LucideIcon, MoveUpRight } from 'lucide-react';
import React from 'react'

type SocialProps = {
    link:string;
    icon: LucideIcon
    name:string
}

const Social = ({icon: Icon, link, name} : SocialProps) => {
  return (
    <div className='relative w-full group'>
    <a href={link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-2">
      {/* Icon and name */}
      <span className='bg-white text-black p-1 rounded-full'>
        <Icon className="size-4" />
      </span>
      <p className='text-gray-400 italic'>{name}</p>
      
      {/* Hover Icon */}
      <span className="bg-white text-black p-1 rounded-full absolute top-2 right-2 opacity-0 
              group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
        <MoveUpRight className="size-4" />
      </span>
    </a>
    
    {/* Gradient Border */}
    <div className="absolute inset-0 rounded-full border-1
         bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 
         p-[2px] z-[-1] opacity-50 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
      <div className="w-full h-full bg-black rounded-full"></div>
    </div>
  </div>
    ) 
}

export default Social