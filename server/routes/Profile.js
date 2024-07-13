const express = require("express")
const router = express.Router()

const {
  deleteAccount,
  updateProfile,
//getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
  instructorDashboard,
} = require("../controllers/Profile")


// Importing Middlewares
const { auth, isInstructor, isStudent, isAdmin } = require("../midleware/auth")
// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delete User Account
router.delete("/deleteProfile",auth,  deleteAccount)//done
//update is not working
router.put("/updateProfile", auth, updateProfile)//done
//router.get("/getUserDetails", auth, getAllUserDetails)
// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)

module.exports = router