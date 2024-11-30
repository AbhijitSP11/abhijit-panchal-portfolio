"use client"
import { ArrowRight } from 'lucide-react';
import React from 'react'

type ButtonProps = {
    onClick: ()=> void;
    text: string;
}

const Button = ({onClick, text}: ButtonProps) => {
  return (
    <div className="flex gap-2 items-center">
    <button
        onClick={() => onClick} 
        className='flex tracking-normal text-sm px-8 py-2 bg-[#F5F5F5] text-gray-800 italic rounded-full'
    >
        {text}
    </button>
    <span className="bg-[#F5F5F5] text-gray-800 p-2 rounded-full"> 
    <ArrowRight className="size-4" /> 
  </span>
  </div> 
  )
}

export default Button