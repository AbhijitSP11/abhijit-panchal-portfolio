import React from 'react'
import { experiences } from '../constants/experiences'
import { Experience as ExperienceType } from '../types'

const Experience = () => {
  return (
    <div >
        {experiences.map((exp, index) => (
            <ExperienceCard key={index} {...exp} />
        ))}
    <TotalExperience experiences={experiences} />
    </div>
  )
}

const calculateExperience = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
  
    if (months < 0) {
      years--;
      months += 12;
    }
  
    return { years, months };
  };
  
  const ExperienceCard = ({ role, company, location, description, startDate, endDate }: ExperienceType) => {
    const { years, months } = calculateExperience(startDate, endDate);
    
    return (
      <div className="flex items-center justify-between p-8 hover:cursor-pointer bg-[#121212] 
            border border-gray-600 hover:bg-[#F5F5F5] text-gray-300 hover:text-gray-950 rounded-2xl mb-2"
        >
        <div className="flex-1">{role}</div>
        <div className="flex-1">{company}</div>
        <div className="flex-1">
          {location}
          <div className="text-gray-500 italic">{years} years, {months} months</div>
        </div>
      </div>
    );
  };
  
  const TotalExperience = ({ experiences }: { experiences: ExperienceType[] }): React.JSX.Element => {
    let totalYears = 0;
    let totalMonths = 0;
  
    if (!Array.isArray(experiences)) {
      console.error("Expected experiences to be an array");
      return <div>Error: Invalid experiences data.</div>;
    }
  
    experiences.forEach(exp => {
      const { years, months } = calculateExperience(exp.startDate, exp.endDate);
      totalYears += years;
      totalMonths += months;
    });
  
    if (totalMonths >= 12) {
      totalYears += Math.floor(totalMonths / 12);
      totalMonths = totalMonths % 12;
    }
  
    return (
      <div className="flex flex-col justify-between p-8 bg-[#121212] border-t border-gray-300 text-gray-300">
        <div className="flex-1 text-lg text-gray-100">Total Experience</div>
        <div className="flex-1 italic">{totalYears} years, {totalMonths} months</div>
      </div>
    );
  };
  

export default Experience