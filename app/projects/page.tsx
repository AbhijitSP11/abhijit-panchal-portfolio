import Button from '@/components/ui/Button/index';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import React from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  status: 'Live' | 'Planning' | 'In Development';
  imageUrl: string;
  githubUrl: string;
  liveUrl: string;
  techStack: string[];
}

const ProjectPage: React.FC<{ projects: Project[] }> = ({ projects }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <Card key={project.id} className="h-full">
          <div className="relative h-48 overflow-hidden">
          <Image
            src={project.imageUrl}
            alt={project.title}
            layout="fill"
            objectFit="cover"
            className="w-full h-full"
          />
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div className="flex gap-4">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Button onClick={()=> console.log("")} text='Github'/>
                </a>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <Button  onClick={()=> console.log("")} text='live'/>
                </a>
              </div>
            </div>
          </div>
          <CardHeader>
            <CardTitle>{project.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">{project.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${project.status === 'Live' ? 'bg-green-500 text-white' : project.status === 'Planning' ? 'bg-yellow-500 text-white' : 'bg-blue-500 text-white'}`}>
                {project.status}
              </span>
              <div className="flex gap-2">
                {project.techStack.map((tech, index) => (
                  <span key={index} className="px-2 py-1 rounded-full text-xs bg-gray-700 text-gray-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProjectPage;