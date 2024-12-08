"use client"
import React from 'react';
import { projects } from '@/components/constants/projects';
import ProjectList from '@/components/Projects/ProjectList';

const ProjectsPage = () => {
  return (
    <div className="min-h-screen bg-[#121212] py-20">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="mb-20">
          <h1 className="text-5xl font-bold text-[#F5F5F5] mb-6">
            Portfolio
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl">
            I am passionate about transforming new ideas into reality through innovative 
            projects. Explore this portfolio to see my latest works, showcasing both my creativity 
            and technical expertise.
          </p>
        </div>

        <ProjectList projects={projects} />
      </div>
    </div>
  );
};

export default ProjectsPage;