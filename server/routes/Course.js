const express = require("express")
const router = express.Router()

// Import the Controllers

// Course Controllers Import
const {
  createCourse,
  showAllCourses,
  getCourseDetails,
  getFullCourseDetails,
  editCourse,
  getInstructorCourses,
  deleteCourse,
} = require("../controllers/Course")

const {
  updateCourseProgress
} = require("../controllers/CourseProgress");

// Categories Controllers Import
const {
  showAllCategories,
  createCategory,
  categoryPageDetails,
} = require("../controllers/Category")

// Sections Controllers Import
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section")

// Sub-Sections Controllers Import
const {
  createSubSection,
 updateSubSection,
  deleteSubSection,
} = require("../controllers/Subsection")

// Rating Controllers Import
const {
  createRating,
  getAverageRating,
  getAllRating ,
} = require("../controllers/RatingAndReview")

const {
  createDiscussion,
  getDiscussionDetails
}=require("../controllers/Discussion")

// Importing Middlewares
const { auth, isInstructor, isStudent, isAdmin } = require("../midleware/auth")

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
router.post("/createCourse", auth, isInstructor, createCourse)//done
//Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection)//done
// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection)//done
// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection)//done
// *** Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection)//done
// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)//done
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection)//done
// Get all Registered Courses
//router.get("/getAllCourses", showAllCourses)
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails)//done
// Get Details for a Specific Courses
router.post("/getFullCourseDetails", auth, getFullCourseDetails)
// Edit Course routes
router.post("/editCourse", auth, isInstructor, editCourse)
// Get all Courses Under a Specific Instructor
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
// Delete a Course
router.delete("/deleteCourse", deleteCourse)
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/createCategory", auth, isAdmin, createCategory)//done
router.get("/showAllCategories", showAllCategories) //done
router.post("/getCategoryPageDetails", categoryPageDetails)

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, createRating) // running fine but it can be done completely after payment but there is problem in payment
router.get("/getAverageRating", getAverageRating)//done
router.get("/getReviews", getAllRating )//done
router.post("/create-discussion", auth,isStudent,createDiscussion);
router.get("/get-discussion", getDiscussionDetails);
module.exports = router