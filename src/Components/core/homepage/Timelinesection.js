import React from 'react';
import { Link } from 'react-router-dom';
import timelineImage from "../../../assets2/images/timeline.mp4"
import Logo1 from "../../../assets2/images/g-cap.png"
import Logo2 from "../../../assets2/images/badge.png"
import Logo3 from "../../../assets2/images/diamond.png"
import Logo4 from "../../../assets2/images/square-code.png"


const timeline = [
    {
        Logo: Logo1,
        heading: "Leadership",
        Description:"Fully committed to the success company",
    },
    {
        Logo: Logo2,
        heading: "Responsibility",
        Description:"Students will always be our top priority",
    },
    {
        Logo: Logo3,
        heading: "Flexibility",
        Description:"The ability to switch is an important skills",
    },
    {
        Logo: Logo4,
        heading: "Solve the problem",
        Description:"Code your way to a solution",
    },
];
const Timelinesection= () => {
    return (
        <div className=' bg-pure-greys-5'>
        <div className=' flex flex-row justify-around mx-40'>
           
           {/* div1 */}
           <div className=' lg:w-[45%] h-[432px] '>
           {
                timeline.map( (element, index) => {
                    return (
                        <div className='flex flex-col lg:gap-3' key={index} >
                            <div className='flex gap-6'>
                                <div className='w-[52px] h-[52px] p-[4px] border border-pure-greys-25 bg-white rounded-full flex justify-center items-center shadow-[#00000012] shadow-[0_0_62px_0]'>
                                    <img className=' h-[24px] w-[24px]' src={element.Logo} />
                                </div>

                                <div>
                                    <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                                    <p className='text-base text-richblack-600'>{element.Description}</p>
                                </div>
                            </div>
                            
                            <div className={` ${index === 3 ? "hidden":""}   h-14 
                            border-dotted border-r border-richblack-100 bg-richblack-400/0 w-[26px]`}>

                            </div>
                        </div>
                    )
                } )
            }
           </div>

         {/* div2 */}
            <div className="shadow-blue-200 shadow-[0px_0px_30px_0px] w-fit h-fit relative ">
                
  <video muted loop autoPlay className=" w-[860px] ">
    <source src={timelineImage} type="video/mp4"/>
  </video>

  <div className='absolute lg:left-[50%] lg:bottom-0 lg:translate-x-[-50%] 
            lg:translate-y-[50%] bg-caribbeangreen-700 top-0 lg:top-auto
            flex lg:flex-row flex-col text-white uppercase py-5 gap-4 lg:gap-0 lg:py-6 items-center '>
                <div className=' flex flex-raw items-center'>
                    <p className=' text-[38px] font-bold'>10</p>
                    <p className=' text-[13px] mx-4 w-[70px]  text-caribbeangreen-300'>years experience</p>
                </div>
                <div className=' h-[38px] w-[1px] bg-caribbeangreen-300 mx-6'></div>
                <div className=' flex flex-raw items-center mx-6'>
                    <p className=' text-[38px] font-bold'>250</p>
                    <p className=' text-[13px] mx-4 w-[70px]  text-caribbeangreen-300'>types of courses</p>
                </div>
            </div>
</div>
        </div>
        </div>
    );
};

export default Timelinesection;
