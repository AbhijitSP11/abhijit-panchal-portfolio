"use client"
import React from 'react'
import { FaGithub} from 'react-icons/fa'
import { Project } from '../types'
import Image from 'next/image'
import Button from '../ui/Button'
import {  MoveUpRight } from 'lucide-react'

const ProjectCard = ({description, githubUrl, imageUrl, liveUrl, status, techStack, title}: Project) => {
  return (
    <div className='flex w-full gap-8  rounded-2xl p-8 h-[460px] mb-6 bg-[#070707]'>
      {/* Left */}
      <div className='flex flex-col justify-between w-[45%]'>
        <div className='flex flex-col gap-4'>
          <span className='flex gap-4 items-center'>
            <h1 className='text-2xl font-bold'>{title}</h1>
            <span className='flex items-center gap-2 border border-gray-800 px-2 py-1 rounded-xl bg-gray-800'>
              <div className='w-2 h-2 bg-yellow-500 rounded-full animate-pulse'></div>
              <p className='text-xs text-gray-300 italic'>{status}</p>
            </span>
          </span>
          <p className='text-gray-300'>{description}</p>
          <div className='flex gap-2'>
            {techStack.map((tech, idx) => (
              <div key={idx} className='border border-gray-800 px-6 py-1 rounded-full text-sm text-gray-300'>{tech}</div>
            ))}
          </div>
        </div>
        <Button text={'Case Study'} onClick={() => console.log('clicked')} />
      </div>

      {/* Right */}
      <div className='w-[55%] h-full'>
        <div className='relative h-full'>
            <Image
            src={imageUrl}
            alt='logo'
            width={400}
            height={100}
            loading="lazy"
            style={{objectFit: "cover"}}
            className='rounded-xl w-full h-full'
            />
        <div className='absolute top-4 right-4 z-10 flex space-x-2'>
          <a
            href={githubUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='bg-white text-gray-800 p-4 rounded-full hover:bg-gray-300 transition-colors'
          >
            <FaGithub size={16} />
          </a>
          <a
            href={liveUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='bg-white text-gray-800 p-4 rounded-full hover:bg-gray-300 transition-colors'
          >
            <MoveUpRight size={16} />
          </a>
        </div>
        </div>
     
      </div>
    </div>
  )
}

export default ProjectCard