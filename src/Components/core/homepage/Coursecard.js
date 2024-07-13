import React from 'react';
import { BsFillPeopleFill } from 'react-icons/bs';
import { TbHierarchy3 } from 'react-icons/tb';

const Coursecard = ({ cardData, currentCard}) => {
    return (
       <div className='bg-white text-richblack-400 m-3 w-[360px] lg:w-[30%] h-[300px]'>
             
    <div>
        <p  className=' text-[28px]'>{cardData.heading}</p>
        <p>{cardData.description}</p>
    </div>

    <div className=' flex flex-raw'>

            <div className='flex items-center gap-2 text-[16px]'>
                <BsFillPeopleFill/>
                <span>{cardData.level}</span>
            </div>

            <div className='flex items-center gap-2 text-[16px]'>
                <TbHierarchy3/>
                <span>{cardData.lessionNumber}</span>
            </div>
    </div>

     

           </div>
    );
};

export default Coursecard;
