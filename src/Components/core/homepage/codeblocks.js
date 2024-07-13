import React from 'react';
import { Link } from 'react-router-dom';
import CTAButton from "./button";
import highlighttext from './highlighttext';
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';
import { useState } from 'react';

const CodeBlock = ({ position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColor }) => {
  const [tilt, setTilt] = useState(0);

  const handleTouchStart = (event) => {
    const touchX = event.touches[0].clientX;
    const screenWidth = window.innerWidth;
    const percentage = (touchX / screenWidth) * 100;
    const maxTilt = 5; // Maximum tilt angle

    // Calculate tilt angle based on touch position
    const newTilt = (percentage / 100) * maxTilt - maxTilt / 2;
    setTilt(newTilt);
  };

  return (
    <div
      className={`flex ${position} my-20 justify-between gap-10 transition-transform duration-500`}
      onTouchStart={handleTouchStart}
      style={{ transform: `rotateY(${tilt}deg)` }}
    >
      {/* section1 */}
      <div className={`w-[50%] lg:w-[40%] flex flex-col gap-8`}>
        {heading}
        <div className='text-richblack-300 text-base font-bold w-85 -mt-3'>
          {subheading}
        </div>

        <div className='flex gap-7 mt-7'>
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className='flex gap-2 items-center'>
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>

          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>

      {/* section2 */}
      <div className='code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 w-[100%] lg:w-[470px] bg-richblack-00'>
        <div className={`flex flex-row w-[373px] h-[257px] absolute rounded-full`}>
          <div className='text-center flex select-none flex-col w-[10%] text-richblack-400 font-inter font-bold'>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
          </div>

          <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1`}>
            <TypeAnimation
              sequence={[codeblock, 2000, '']}
              repeat={Infinity}
              cursor={true}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeBlock;