"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import  Button  from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

type BlogCardProps = {
  title: string;
  url: string;
  imageURL: string;
  description: string;
  category?: string;
  readTime?: string;
};

const BlogCard: React.FC<{ 
    blog: BlogCardProps; 
    isActive: boolean; 
    opacity: number; 
  }> = ({ blog, isActive, opacity }) => { 
    return ( 
      <motion.div 
        initial={{ scale: 0.9, opacity: 0.5 }} 
        animate={{ 
          scale: isActive ? 1 : 0.9, 
          opacity: opacity, 
        }} 
        transition={{ duration: 0.3 }} 
        className={` 
          h-[220px] flex rounded-2xl overflow-hidden shadow-2xl relative 
          transition-all duration-300 
        `} 
      > 
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: `url(${blog.imageURL})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
          }} 
        > 
        </div> 
  
        {/* Text and button container shifted to the right */}
        <div className="relative z-10 w-2/3 p-6 flex bg-black/80 flex-col justify-between text-white ml-auto">
          <div className="flex flex-col justify-end"> 
            <h3 className="text-xl font-bold mb-2 line-clamp-2"> 
              {blog.title} 
            </h3> 
            <p className="text-gray-200 line-clamp-3 mb-4 text-sm"> 
              {blog.description} 
            </p> 
          </div> 
            <Button 
              text="Read More" 
              onClick={() => window.open(blog.url, '_blank')} 
            /> 
          </div> 
      </motion.div> 
    ); 
  };
  

const BlogCarousel: React.FC<{ blogs: BlogCardProps[] }> = ({ blogs }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  useEffect(() => {
    const totalBlogs = blogs.length;

    if (totalBlogs <= 1) {
      setVisibleCards([0]);
      return;
    }

    const computeVisibleCards = () => {
      const visibleIndexes = [];
      const leftIndex = (currentIndex - 1 + totalBlogs) % totalBlogs;
      const rightIndex = (currentIndex + 1) % totalBlogs;

      visibleIndexes.push(leftIndex, currentIndex, rightIndex);
      return visibleIndexes;
    };

    setVisibleCards(computeVisibleCards());
  }, [currentIndex, blogs.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % blogs.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + blogs.length) % blogs.length);
  };

  const calculateOpacity = (index: number) => {
    if (index === currentIndex) return 1;
    return 0.5;
  };

  const hasMoreCards = blogs.length > 3;

  return (
    <div className="relative w-full h-72 flex items-center justify-center overflow-hidden">
      {blogs.length > 1 && (
        <>
             <button 
            onClick={handlePrev}
            className="absolute left-4 z-10 bg-white/20 backdrop-blur-sm p-3 rounded-full"
          >
            ←
          </button>
          <button 
            onClick={handleNext}
            className="absolute right-4 z-10 bg-white/20 backdrop-blur-sm p-3 rounded-full"
          >
            →
          </button>
        </>
      )}

      <div className="flex items-center justify-center space-x-6">
        <AnimatePresence>
          {visibleCards.map((index) => (
            <BlogCard
              key={index}
              blog={blogs[index]}
              isActive={index === currentIndex}
              opacity={calculateOpacity(index)}
            />
          ))}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {blogs.map((_, idx) => (
          <div
            key={idx}
            className={`
              w-2 h-2 rounded-full 
              ${idx === currentIndex ? 'bg-blue-600' : 'bg-gray-300'}
            `}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogCarousel;