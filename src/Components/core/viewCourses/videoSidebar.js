import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../../../slices/viewCourseSlice';
import { BsChevronDown } from "react-icons/bs"
import {IoMdArrowBack  } from "react-icons/io"

import { MdOutlineSyncAlt } from 'react-icons/md';
import { BiTagAlt } from "react-icons/bi"


const VideoSidebar = ({ setReviewModal, isVisible }) => {
  const { sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const location=useLocation();
  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  const [activeStatus, setActiveStatus] = useState(sectionId);
  const [videoBarActive, setVideoBarActive] = useState(subSectionId);
  
  useEffect(() => {
    const setActiveFlags = () => {
      if(!courseSectionData.length) return;
      // console.log("In Sidebar, courseSectionData",courseSectionData)
      const currentSectionIndex = courseSectionData.findIndex(
          (sec) => sec._id === sectionId)

      const currentSubSectionIndex =  courseSectionData?.[currentSectionIndex].subSection.findIndex(
          (subSec)=> subSec._id === subSectionId
      )    

      setActiveStatus(courseSectionData?.[currentSectionIndex]?._id)
      setVideoBarActive(courseSectionData?.[currentSectionIndex].subSection?.[currentSubSectionIndex]?._id )
    }
    
    setActiveFlags();

    
  }, [courseSectionData, courseEntireData, location.pathname])
  
  useEffect(() => {
    
  
      return () => {
          dispatch(setCourseSectionData([]));
          
          dispatch(setEntireCourseData([]));
          
          dispatch(setCompletedLectures(0))
        }
  },[])

  return (
    <div className={`flex flex-col h-full overflow-y-auto bg-pure-greys-5 border-r-2 border-richblack-25  transition-all duration-500 ${isVisible ? 'w-64' : 'w-0'}`}>
    
    
     <div  className="flex items-center gap-2 px-4 py-3 border-b border-richblack-700">
     <button
          onClick={() => navigate("/dashboard/enrolled-courses")}
          className="text-blue flex items-center text-center justify-center h-8 w-8 rounded-full  hover:scale-90"
        >
          <IoMdArrowBack   size={24} />
          
        </button>
        <h2 className="text-blue text-base font-semibold ">Back to Courses</h2>
     </div>

      <div id='blue' className="flex items-center gap-2 px-4 py-2 border-b border-richblack-700">
        
        
        <h2 className=" text-[18px] font-semibold text-white ">Course Content</h2>
      </div>
      {courseSectionData.map((section, index) => (
        <div key={index} className=" text-sm text-richblack-5">
          <div
            className="flex items-center justify-between  py-4 px-3  cursor-pointer"
            onClick={() => setActiveStatus(section?._id)}
          >
            <div className="text-blue font-semibold gap-3 flex flex-raw">
            <BiTagAlt className=' my-1'/>
            {section?.sectionName}</div>
            <span className={`${activeStatus === section?._id ? "rotate-0" : "rotate-180"} transition-transform duration-500`}>
              <BsChevronDown />
            </span>
          </div>
          {activeStatus === section?._id && (
            <div className="">
              {section.subSection.map((topic, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 px-7 py-2 cursor-pointer ${videoBarActive === topic._id ? " text-black font-semibold bg-richblack-25 " : " text-black"}`}
                  onClick={() => {
                    navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`);
                    setVideoBarActive(topic?._id);
                  }}
                >
                  <input type="checkbox" checked={completedLectures.includes(topic?._id)} onChange={() => {}} />
                  <span>{topic.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default VideoSidebar;
