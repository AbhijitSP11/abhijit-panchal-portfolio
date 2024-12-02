import React from 'react';
import { projects } from '../constants/projects';
import ProjectCard from './ProjectCard';

const Projects: React.FC = () => {
  return (
    <>
      {
        projects.map((project)=> (
          <ProjectCard
            key={project.id} 
            id={project.id}
            title={project.title}
            description={project.description}
            githubUrl={project.githubUrl}
            imageUrl={project.imageUrl}
            liveUrl={project.liveUrl}
            status={project.status}
            techStack={project.techStack}
          />
        ))
      }
    </>
  );
};

export default Projects;