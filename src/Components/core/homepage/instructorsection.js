import React from 'react';
import { Link } from 'react-router-dom';
import teacher from "../../../assets2/images/teacher.png"
import Highlighttext from './highlighttext';
import CTAButton   from "../homepage/button";
import { GoArrowRight } from "react-icons/go";


const instructorsection = ({  }) => {
    return (
        <div className=" flex flex-raw">
        <div className=' lg:w-[50%] mx-40 '> 
        <img
                src={teacher}
                alt=""
                className=' h-[500px] w-[400px]'
            />
        </div>

        <div className=' flex flex-col items-center lg:w-[50%] my-20 mx-52'>

        <div className=' text-4xl font-bold text-richblack-800'>
           Become an  <br/>
            <Highlighttext  text={" Instructor"}/>
             </div>

        <div className=' text-[17px] text-richblack-400 font-semibold text-center w-[75%] my-8'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
            </div>  
    
           <div className=' my-10 text-md'>
            <CTAButton active={true} linkto={"/signup"}>
      <div className=" flex flex-raw items-center">
      explore full cottage
      <GoArrowRight className=" text-pure-greys-5 text-lg" />
      </div>
      </CTAButton>
      </div>
            
        </div>
        
        </div>
      
    );
};

export default instructorsection;
