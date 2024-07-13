import React from 'react'
import { TypeAnimation } from 'react-type-animation';
const highlighttext2=(
  // {text}
  { position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColor }
)=> {
    return (
      
      // <span className=' text-blue-100 font-bold'>
      //   {" "}
      //   {text}</span>

      <div className='code-border flex flex-row  sm:text-sm  w-[100%] lg:w-[245px] bg-richblack-00'>
     
         

          <div className={` flex flex-col gap-2 font-bold  text-4xl  ${codeColor} `}>
            <TypeAnimation
              sequence={[codeblock, 2000, '']}
              repeat={Infinity}
              cursor={false}
              omitDeletionAnimation={true}
            />
     
        </div>
      </div>
    )
}

export default highlighttext2 ;
 