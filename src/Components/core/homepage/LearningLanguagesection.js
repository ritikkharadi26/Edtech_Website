import React from 'react';
import { Link } from 'react-router-dom';
import Highlighttext from "../homepage/highlighttext"
import know_your_progress from "../../../assets2/images/know your progress.png"
import compare from "../../../assets2/images/compare with others.png"
import plan from "../../../assets2/images/plan your sucess.png"
import CTAButton from "../homepage/button";
const LearningLanguagesection = ({  }) => {
    return (
        <div className=' my-44 flex flex-col items-center '>
      <div className=' font-semibold text-[32px]'>Your swiss knife for
        <Highlighttext  text={" learning any language"}/>
      </div>
      <div className=' text-md w-[55%] text-richblack-600 mx-auto text-center my-2'>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</div>
        <div className=' flex flex-raw relative my-8'>
            <img 
                    src = {know_your_progress}
                    alt = "KNowYourProgressImage"
                    className='object-contain lg:mt-0  lg:-mr-32   '
                />

<img 
                    src = {compare}
                    alt = "KNowYourProgressImage"
                    className='object-contain lg:mt-0  lg:-mr-32   '

                />

<img 
                    src = {plan}
                    alt = "KNowYourProgressImage"
                    className='object-contain lg:mt-0  lg:-mr-32  '
                />
            </div>
            
            <CTAButton active={true} linkto={"/login"}>
      <div className=" text-richblack-800 text-bold text-sm">
        Learn More
      </div>
     </CTAButton>
        </div>
        
        );
};

export default  LearningLanguagesection;