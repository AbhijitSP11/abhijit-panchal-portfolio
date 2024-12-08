"use client"
import React from 'react'
import { Project } from '../types'
import Image from 'next/image'
import Link from 'next/link'

interface ProjectItemProps {
  project: Project
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => {
  return (
    <Link href={project.liveUrl} className="group flex flex-col">
      <div className="relative w-full overflow-hidden rounded-2xl">
        <Image
          src={project.imageUrl}
          alt={project.title}
          width={1200}
          height={675}
          className="w-full object-cover aspect-[16/9] transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      <div className="mt-4 space-y-3">
        <div>
          <h3 className="text-2xl font-bold text-[#F5F5F5]">{project.title}</h3>
          <p className="text-gray-400">HighLevel</p>
        </div>
        <p className="text-gray-400 line-clamp-2">{project.description}</p>
      </div>
    </Link>
  )
}

const ProjectList: React.FC<{ projects: Project[] }> = ({ projects }) => {
  return (
    <div className="space-y-24">
      {projects.map((project) => (
        <ProjectItem key={project.id} project={project} />
      ))}
    </div>
  )
}

export default ProjectList