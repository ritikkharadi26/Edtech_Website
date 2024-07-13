import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HomePageExplore } from '../../../data/homepage-explore';
import Highlighttext from './highlighttext';
import Coursecard from './Coursecard';


const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
];

const ExploreMore = () => {
    const [currenttab, setCurrenttab]=useState(HomePageExplore[0].tag)
    const [Course,setCourse]=useState(HomePageExplore[0].courses);
    const [currentCard,setCurrentCard]=useState(HomePageExplore[0].courses[0].heading);

const setmycourse=(value)=>{
    
    setCurrenttab(value)
    const result=HomePageExplore.filter((data)=>data.tag===value);
    setCourse(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);

}     

    return (
        
        <div className="ag-format-container ">
        <div className="text-4xl font-semibold text-center mb-10">
            Unlock the 
            <Highlighttext text={"Power of Code"} />
        </div>

        <p className="text-center text-richblack-300 text-lg font-semibold mt-3 mb-10 lg:mb-0">
            Learn to build anything you can imagine
        </p> 

        <div className="flex justify-center space-x-4 mt-4 bg-richblack-800 rounded-full w-[850px] h-[60px] mx-36">
            {tabsName.map((tab) => (
                <button 
                    key={tab}
                    className={`text-[16px] my-4 flex flex-row items-center gap-9 font-medium  ${currenttab === tab ? 'bg-richblack-600 text-richblack-5 font-medium' : 'text-richblack-200'} rounded-full transition-all duration-200 cursor-pointer
                    hover:bg-richblack-800 hover:text-richblack-5 px-8 py-4 mb-3`}
                    onClick={() =>setmycourse(tab)}
                >
                    {tab}
                </button>
            ))}
        </div>

        <div className="ag-courses_box mt-14">
            {Course.map((course) => (
                <div key={course.heading} className="ag-courses_item gap-4 ">
                    <a href="#" className="ag-courses-item_link">
                        <div className="ag-courses-item_bg"></div>
                        <div className="ag-courses-item_title">
                            {course.heading}
                            <p className=' text-sm font-normal text-richblack-50'>{course.description} </p>
                        </div>

                        <div className="ag-courses-item_date-box gap-2">
                        <div>  Start:
                            <span className="ag-courses-item_date mx-2 text-base">
                                {course.level}
                            </span></div>

                        <div> total lessons:
                            <span className="ag-courses-item_date mx-1 text-base">
                                {course.lessionNumber}
                            </span></div>
                          

                           
                        </div>
                    </a>
                </div>
            ))}
        </div>
    </div>
    );
};

export default ExploreMore;
