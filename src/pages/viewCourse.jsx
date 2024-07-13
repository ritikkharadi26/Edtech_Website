import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../services/operation/courseDetails';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice'
import VideoSideBar from '../Components/core/viewCourses/videoSidebar';
import CourseReviewModal from '../Components/core/viewCourses/courseReviewModal';
import FixedModal from '../Components/core/viewCourses/FixedModal';
import { getUserEnrolledCourses } from '../services/operation/profileApi';
import Comment from '../Components/core/viewCourses/Comment';
const ViewCourse = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { courseId } = useParams();
  const { CompletedLectures, courseSectionData, EntireCourseData, TotalNoOfLectures } = useSelector((state) => state.viewCourse);
  const [reviewModal, setReviewModal] = useState(false);
  const [isSidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  useEffect(() => {
    const setCourseData = async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token);
      console.log("course Data",courseData );
      dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
      dispatch(setEntireCourseData(courseData.courseDetails));
      dispatch(setCompletedLectures(courseData.completedVideos));
    
      let lectures = 0;
      courseData.courseDetails.courseContent.forEach((section) => {
        lectures += section.subSection.length;
      });
      dispatch(setTotalNoOfLectures(lectures));
    };
    setCourseData();
  }, [courseId, token, dispatch]);
 
  console.log("complpete course info", courseSectionData);

  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const [loading, setLoading] = useState(true);

  const getEnrolledCourses = async () => {
    try {
      const response = await getUserEnrolledCourses(token);
      setEnrolledCourses(response);
      console.log("User enrolled courses", response);
    } catch (error) {
      console.log("Unable to Fetch Enrolled Courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const filteredData = enrolledCourses?.filter(course => course._id === courseId);
  console.log("Filtered Data", filteredData);

  const progress = filteredData && filteredData.length > 0 ? filteredData[0].progressPercentage : null;
  console.log("Course progress", progress);

  return (
    <>
      <div className="flex top-0 absolute h-full w-full">
        <div className={`transition-all duration-500 ${isSidebarVisible ? 'w-64' : 'w-0'}`}>
          <VideoSideBar handleAddReview={() => setReviewModal(true)} isVisible={isSidebarVisible} />
        </div>
        <div className={`flex-1 overflow-auto bg-pure-greys-5 transition-all duration-500 ${isSidebarVisible ? 'w-[calc(100%-16rem)]' : 'w-full'}`}>
          <div className="">
            <FixedModal handleAddReview={() => setReviewModal(true)} toggleSidebar={toggleSidebar} progress={progress} />
            <Outlet />
            {/* <Comment toggleSidebar={toggleSidebar} progress={progress} /> */}
          </div>
        </div>
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  );
};

export default ViewCourse;