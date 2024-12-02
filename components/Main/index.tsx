import { ArrowRight } from 'lucide-react'
import React from 'react'
import { social_links } from '../constants/social'
import Social from '../Social'


const Home = () => {
  return (
    <div className='w-full flex flex-col justify-center mt-16'>
      {/*Home Hero Section*/}
      <section>
        <div>
            <div className='flex justify-between'>
              <h1 className='text-9xl hover:font-bold transition-all duration-500 cursor-default tracking-wide'>Frontend</h1>
              <span className='flex items-center gap-4'>
                <button className='bg-white text-black rounded-full px-24 py-4 italic'>Schedule a meet</button>
                <div className='bg-white text-[#121212] rounded-full px-4 py-3 w-16'><ArrowRight className='size-8'/></div>
              </span>
            </div>
        </div>
        <div className='flex items-center justify-between mt-4'>
            <p className='w-96 p-4 leading-6'>I&apos;m a Frontend Engineer passionate about crafting web applications that excel in both speed and design. 
              I utilize the latest technologies and prioritize a user-centric
            </p>
            <h1 className='text-9xl hover:font-normal font-bold transition-all duration-500 cursor-default tracking-wide'>Developer</h1>
        </div>
      </section>

      {/*social links*/}
      <section>
        <div className='flex w-full gap-24 justify-center mt-16'>
          {social_links.map((social, idx) => (
            <Social 
              key={idx}
              icon={social.icon} 
              link={social.link} 
              name={social.name} 
            />
          ))}
        </div>
      </section>
      {/*blog cards*/}
      <section className='my-8'>
        
      </section>
    </div>
  )
}

export default Home