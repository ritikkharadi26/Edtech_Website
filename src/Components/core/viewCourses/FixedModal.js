
import React from 'react';
import { MdOutlineSyncAlt } from 'react-icons/md';
import IconBtn from '../../common/IconBtn';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../../../slices/viewCourseSlice';
import { useSelector } from 'react-redux';
import { getUserEnrolledCourses } from '../../../slices/profileSlice';
import ProgressBar from '@ramonak/react-progress-bar';

const FixedModal = ({ handleAddReview, toggleSidebar, isVisible, progress }) => {
  const { courseEntireData } = useSelector((state) => state.viewCourse);

  return (
    <div
      className={`left-0 z-50 flex h-[3.5rem] w-full items-center justify-between bg-pure-greys-5 px-4 border-b border-richblack-25 transition-transform duration-500 ${
        isVisible ? 'ml-[320px]' : 'ml-0'
      }`}
    >
      <div className="flex items-center gap-9">
        <MdOutlineSyncAlt
          size={30}
          className="text-blue cursor-pointer text-richblack-100"
          onClick={toggleSidebar}
        />
        <h2 className="ml-4 text-xl font-semibold text-richblack-900">
          {courseEntireData?.courseName}
        </h2>
      </div>
      <div className="flex flex-row items-center gap-32 mx-10 h-[3.5rem]">
        <div className="flex w-full items-center gap-2 px-2">
          <p>Progress: {progress || 0}%</p>
          <div className="text-blue flex-1">
            <ProgressBar
              completed={progress || 0}
              height="8px"
              isLabelVisible={false}
            />
          </div>
        </div>
        <button
          onClick={handleAddReview}
          id="blue"
          className="px-4 py-2 w-56 h-10 ml-auto text-white rounded hover:bg-blue-700"
        >
          Add Review
        </button>
      </div>
    </div>
  );
};

export default FixedModal;