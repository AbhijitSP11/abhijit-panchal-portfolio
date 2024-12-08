import { MoveUpRight } from 'lucide-react';
import React from 'react'

type SocialProps = {
    link:string;
    icon: React.ReactNode
    name:string
}

const Social = ({icon, link, name} : SocialProps) => {
  return (
    <div className='relative w-full group'>
    <a href={link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-2">
      {/* Icon and name */}
      {/* <span className='bg-white text-black rounded-full'> */}
      {React.cloneElement(icon as React.ReactElement, { className: 'w-2 h-2' })}
      {/* </span> */}
      <p className='text-gray-400 italic'>{name}</p>
      
      {/* Hover Icon */}
      <span className="bg-white text-black p-1 rounded-full absolute top-2 right-2 opacity-0 
              group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
        <MoveUpRight className="size-4" />
      </span>
    </a>
    
  </div>
    ) 
}

export default Social