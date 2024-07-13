import "./App.css";
import Navbar from "./Components/Navbar";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./Components/Home";
import About from "../src/pages/About";
import Contact from "./pages/contact";
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import MyProfile from "./Components/core/Dashboard/MyProfile";
import AddCourse from "./Components/core/course/index"
import Signup from "./pages/Signup"
import EnrolledCourses from "./Components/core/Dashboard/EnrolledCourses";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/verifyEmail";
import PrivateRoute from "./Components/core/auth/PrivateRoute";
import { useSelector } from "react-redux";
import {ACCOUNT_TYPE} from "../src/utils/constants"
import Cart from "./Components/core/cart/index";
import OpenRoute from "../src/Components/core/auth/OpenRoute"
import MyCourses from "./Components/core/Dashboard/MyCourses";
import EditCourse from "./Components/core/Dashboard/EditCourse";
import Catalog from "./pages/Catlog";
import CourseDetails from "./pages/CourseDetails";
import Instructor from "./Components/core/Dashboard/InstructorDashboard/instructorDashboard";
import ViewCourse from "./pages/viewCourse";
import VideoDetails from "./Components/core/viewCourses/VideoDetails";
import Settings from "./Components/core/Dashboard/Setting/Setting";
import Profile from "./Components/core/Dashboard/profile"

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { user } = useSelector((state) => state.profile)

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col ">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login  />} />
        <Route path="/signup" element={<Signup  />} />
        {/* <Route path="/dashboard" element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            
            <Dashboard />
          </PrivateRoute>
        } /> */}

        
      <Route
              path="login/forgot-password"
              element={
               
                  < ForgotPassword />
              
              }
            />  

<Route
              path="update-password/:id"
              element={
        
                  <UpdatePassword />
            
              }
            />  

<Route
              path="/verify-email"
              element={
               
                  <VerifyEmail />
               
              }
             />  

<Route
              path="about"
              element={
               
                  <About />
               
              }
             />  

 <Route 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            
            <Route path="dashboard/my-profile" element={<Profile />} />
               <Route path="dashboard/Settings" element={<Settings />} /> 
            

            {
              user?.accountType === ACCOUNT_TYPE.STUDENT && (
                <>
                 <Route path="/dashboard/Cart" element={<Cart />} /> 
                <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
                </>
              )
            }

             {
              user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                <>
               <Route path="dashboard/instructor" element={<Instructor />} />
                <Route path="dashboard/add-course" element={<AddCourse />} />
                <Route path="dashboard/my-courses" element={<MyCourses />} />
                <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
                
                </>
              )
            }   

         </Route> 
         <Route path="courses/:courseId" element={<CourseDetails/>}/>
          <Route path="catalog/:catalogName" element={<Catalog/>} /> 

          <Route element={
            <PrivateRoute>
              <ViewCourse/>
            </PrivateRoute>
          }>

             {
              user?.accountType === ACCOUNT_TYPE.STUDENT && (
                <>
                  <Route
                    path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                    element={<VideoDetails/>}
                  />
                </>
              )
            } 
          </Route>
      </Routes>

     

      
    
    </div>
  )
}

export default App;
