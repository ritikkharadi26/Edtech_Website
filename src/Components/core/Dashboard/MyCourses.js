import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import { VscAdd } from "react-icons/vsc"
import CoursesTable from "./InstructorCourse/MyCoursesTable"
import { useEffect } from "react";
import { fetchInstructorCourses } from "../../../services/operation/courseDetails";

const MyCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      const fetchCourses = async () => {
          setLoading(true); // Set loading to true before fetching courses
          const result = await fetchInstructorCourses(token);
          if (result) {
              setCourses(result);
          }
          setLoading(false); // Set loading to false after fetching courses
      };

      fetchCourses();
  }, [token]);

  return (
      <div> 
          {loading ? (
                <div className='loader-container '>
                <div className="custom-loader items-center justify-center"></div>
                </div>
          ) : (
              <div> 
                  <div className="mb-14 flex items-center justify-between">
                      <p> MyCourses</p>
                      <IconBtn
                          text="Add Course" 
                          onclick={() => navigate("/dashboard/add-course")}
                      >
                          <VscAdd/>
                      </IconBtn>
                  </div>
                  <div> 
                      {courses && <CoursesTable courses={courses} setCourses={setCourses}/>}
                  </div>
              </div>
          )}
      </div>
  )
}

export default MyCourses;