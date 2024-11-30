import { LucideIcon } from 'lucide-react';
import React, { ReactElement } from 'react'

type SocialProps = {
    link:string;
    icon: LucideIcon
    name:string
}

const Social = ({icon: Icon, link, name} : SocialProps) => {
  return (
        <div className='flex border border-gray-800 rounded-full px-8 py-2 gap-4'>
        <a href={link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            <Icon className="size-4" /> 
            <p className='text-gray-400 italic'>{name}</p>
        </a>
        </div>
    ) 
}

export default Social