import { LucideIcon } from "lucide-react";

export interface ISocialLinks {
    id:number;
    name: string;
    icon: LucideIcon;
    link:string
}


export interface BlogCard{
    id: number;
    title: string;
    url: string;
    imageURL: string;
    description: string;
}


export interface Project {
    id?: number;
    title: string;
    description: string;
    status: 'Live' | 'Planning' | 'In Development';
    imageUrl: string;
    githubUrl: string;
    liveUrl: string;
    techStack: string[];
  }

export interface Experience {
    role: string;
    company: string;
    location: string;
    description?: string[];
    startDate: string; 
    endDate: string; 
  }
  