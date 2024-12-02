"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { social_links } from '../constants/social'
import Social from '../Social'
import Button from '../ui/Button'


const Contact = () => {
  const textAnimation = {
    initial: { color: '#ffffff' }, // Default text color (white)
    animate: { color: 'transparent' },
    transition: { duration: 0.3, ease: 'easeInOut' },
  }

  const wrapTextWithAnimation = (text: string) => {
    return text.split('').map((letter, index) => (
      <motion.span 
        key={index}
        variants={textAnimation}
        initial="initial"
        animate="animate"
        transition={{ delay: index * 0.03 }} // Adds delay for each letter
        className="inline-block"
      >
        {letter === ' ' ? '\u00A0' : letter}  {/* Handle spaces correctly */}
      </motion.span>
    ));
  }

  return (
    <div className='flex flex-col h-[500px] justify-between border border-gray-600 rounded-2xl p-8'>
      <div className="space-y-8">
        {/* First heading with gradient and letter-by-letter animation */}
        <motion.h1 
          className="text-6xl bg-gradient-to-r from-pink-500 via-purple-600 to-teal-400 bg-clip-text text-transparent"
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{ whiteSpace: 'nowrap' }}
        >
          {wrapTextWithAnimation("And that's a wrap!")}
        </motion.h1>

        {/* Second heading with gradient and letter-by-letter animation */}
        <motion.h1
          className="text-6xl bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent"
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{ whiteSpace: 'nowrap' }}
        >
          {wrapTextWithAnimation("We’re Just a Message Away!")}
        </motion.h1>

        {/* Third heading with gradient and letter-by-letter animation */}
        <motion.h1
          className="text-6xl bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 bg-clip-text text-transparent"
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{ whiteSpace: 'nowrap' }}
        >
          {wrapTextWithAnimation("Let’s Turn Ideas into Reality!")}
        </motion.h1>
      </div>

    <Button text='Schedule a meet' onClick={()=> console.log("")}/>

      <footer>
        <div className='flex w-full gap-24 justify-between'>
          {social_links.map((social, idx) => (
            <Social 
              key={idx}
              icon={social.icon} 
              link={social.link} 
              name={social.name} 
            />
          ))}
        </div>
      </footer>
    </div>
  )
}

export default Contact
