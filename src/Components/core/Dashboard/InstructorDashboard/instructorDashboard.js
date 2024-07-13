import React from 'react'
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { fetchInstructorCourses } from "../../../../services/operation/courseDetails"
import { getInstructorData } from "../../../../services/operation/profileApi"
import InstructorChart from "./instructorChart"
import { FaBook } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa";
import { TbMoneybag } from "react-icons/tb";

const Instructor = () => {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const [loading, setLoading] = useState(false)
  const [instructorData, setInstructorData] = useState(null)
  const [courses, setCourses] = useState([])

  useEffect(() => {
    (async ()=> {
      setLoading(true);

      const instructorApiData = await getInstructorData(token)
      const result = await fetchInstructorCourses(token)
      
      if (instructorApiData.length) {
        setInstructorData(instructorApiData)
      }
      if (result) {
        setCourses(result)
      }
      setLoading(false)
    })()
  }, [])

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated,
    0
  )

  const totalStudents = instructorData?.reduce(
    (acc, curr) => acc + curr.totalStudentsEnrolled,
    0
  )
  
  return (
    <div>
    
    {
      loading ? (
        <div className='loader-container '>
          <div className="custom-loader items-center justify-center"></div>
          </div>
        
      
    ) : courses.length > 0 ? (
      <div className=' max-w-[90%]  '>
         <div className="flex min-w-[250px] flex-col rounded-md ">
            <p className="text-lg font-bold text-richblack-5 ">Statistics</p>
            <div className="mt-2 space-y-4 flex flex-row gap-4">
      {/* Card 1: Total Courses */}
      <div className="blue rounded-lg  p-4 transition-transform hover:scale-105 flex flex-col my-4 items-center h-40 w-72">
        <p className="text-lg text-white flex items-center my-3">
          <FaBook className="text-white rounded-full  p-1 mr-2 text-3xl" />
          Total Courses
        </p>
        <p className="text-3xl font-semibold text-white">
          {courses.length}
        </p>
      </div>

      {/* Card 2: Total Students */}
      <div className="pink rounded-lg p-4 transition-transform hover:scale-105 flex flex-col  items-center h-40 w-72">
        <p className="text-lg text-white flex items-center my-3">
          <FaGraduationCap className="text-white rounded-full  p-1 mr-2 text-3xl" />
          Total Students
        </p>
        <p className="text-3xl font-semibold text-white">
          {totalStudents}
        </p>
      </div>

      {/* Card 3: Total Income */}
      <div className="green rounded-lg p-4 transition-transform hover:scale-105 flex flex-col items-center h-40 w-72">
        <p className="text-lg text-white flex items-center my-3 ">
          <TbMoneybag  className="text-white rounded-full bg-orange-900 p-1 mr-2 text-3xl" />
          Total Income
        </p>
        <p className="text-3xl font-semibold text-white">
          Rs. {totalAmount}
        </p>
      </div>
    </div>
          </div>


        <div className="my-4 flex h-[380px] space-x-4 ">
          {/* Render chart / graph */}
          {totalAmount > 0 || totalStudents > 0 ? (
            <InstructorChart courses={instructorData} />
          ) : (
            <div className="flex-1 rounded-md bg-richblack-800 p-6">
              <p className="text-lg font-bold text-richblack-5">Visualize</p>
              <p className="mt-4 text-xl font-medium text-richblack-50">
                Not Enough Data To Visualize
              </p>
            </div>
          )}
          </div>

          {/* Total Statistics */}
 
        
        <div className="rounded-md    ">
          {/* Render 3 courses */}
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-richblack-5">Your Courses</p>
            <Link to="/dashboard/my-courses">
              <p className="text-xs font-semibold text-yellow-50">View All</p>
            </Link>
          </div>
          <div className="my-4 flex flex-col space-y-2 ">
      {courses.slice(0, 2).map((course) => (
        <div key={course._id} className="w-full flex flex-row bg-richblack-800 hover:scale-105">
          <img
            src={course.thumbnail}
            alt={course.courseName}
            className=" h-24 w-44 rounded-md object-cover"
          />
          <div className=" mt-4 mx-6 w-full">
            <p className="text-sm font-medium text-richblack-50">
              {course.courseName}
            </p>
            <div className="mt-1 flex flex-col space-y-1">
              <p className="text-xs font-medium text-richblack-300">
                {course.studentEnrolled.length} students
              </p>
              <p className="text-xs font-medium text-richblack-300">
                Rs. {course.price}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
        </div>
      </div>
    ) : (
      <div className="mt-20 rounded-md bg-richblack-800 p-6 py-20">
        <p className="text-center text-2xl font-bold text-richblack-5">
          You have not created any courses yet
        </p>
        <Link to="/dashboard/add-course">
          <p className="mt-1 text-center text-lg font-semibold text-yellow-50">
            Create a course
          </p>
        </Link>
      </div>
    )}
  </div>
  )
}

export default Instructor