// Import required modules
const Course = require("../models/Course");
const Category= require("../models/Category");
const User = require('../models/User');
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const {uploadImageToCloudinary}=require("../utils/ImageUploder");
const CourseProgress=require("../models/CourseProgress");
const {convertSecondsToDuration}=require("../utils/secondToDuration");

// Create course handler
// exports.createCourse = async (req, res) => {
//     try {
//         // Fetch data
//         const { courseName, courseDescription, price, tag, whatYouWillLearn, category} = req.body;

//         // Get thumbnail
//         const thumbnail = req.files.thumbnailImage;

//         // Validation
//         //add || !tag  , we were unable to add tag functionality do it 
//         if (!courseName || !courseDescription || !price || !whatYouWillLearn || !thumbnail ||!category) 
//           // if (!courseName || !courseDescription || !price || !whatYouWillLearn )
//             {
//             return res.status(400).json({
//                 success: false,
//                 message: "All fields are required",
//             });
//         }

//         // Get instructor
//         const instructorID= req.user.id; // Assuming user ID is stored in req.user
//         const instructorDetails = await User.findById(instructorID);
//         console.log('Instructor details:', instructorDetails);

//         if (!instructorDetails) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Instructor details not found",
//             });
//         }

//         // Check if given tag is valid or not
//         // const tagDetails = await Tags.findById(tag);
//         // if (!tagDetails) {
//         //     return res.status(404).json({
//         //         success: false,
//         //         message: "Tag not found",
//         //     });
//         // }

//         // Upload image to cloudinary
//         const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

//         // Create an entry for new course
//         const newCourse = await Course.create({
//             courseName,
//             courseDescription,
//             price,
//            // tag: tagDetails._id,
//             whatYouWillLearn,
//             instructor: instructorDetails._id,
//             thumbnail: thumbnailImage.secure_url, // Fix typo here
//         });

//         // Add new course to the instructor's list of courses
//         await Category.findByIdAndUpdate(category,
//             {
//                 $push: {
//                     course: newCourse._id
//                 }
//             })

//         await User.findByIdAndUpdate(instructorID, {
//             $push: {
//                 courses: newCourse._id
//             }})
            

//         // Send success response
//         return res.status(200).json({
//             success: true,
//             message: "Course created successfully",
//             data: newCourse,
//         });

//     } catch (error) {
//         // Handle error
//         console.error("Error creating course:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Internal server error",
//         });
//     }
// };


exports.createCourse = async (req,res) => {
  try {
      const{courseName, courseDescription, whatWillYouLearn, price, category,tags,status, instructions} = req.body;

      const thumbnail = req.files.thumbnailImage;
      console.log("Thumbnail in course creation is", thumbnail)
      if(!courseName || !courseDescription || !whatWillYouLearn || !price || !category || !thumbnail || !status || !instructions) {
          return res.status(400).json({
              success:false,
              message:'All fields are required',
          });
      }

      const instructorId = req.user.id;

      const categoryDetails = await Category.findById(category);
      if(!categoryDetails) {
          return res.status(404).json({
              success:false,
              message:'Category Details not found',
          });
      }

      const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);

      const newCourse = await Course.create({
          courseName,
          description:courseDescription,
          whatWillYouLearn,
          price,
          thumbnail:thumbnailImage.secure_url,
          category,
          instructor:instructorId,
          tags,
          status,
          instructions
      })

      await Category.findByIdAndUpdate(category,
          {
              $push: {
                courses: newCourse._id
              }
          })

      await User.findByIdAndUpdate(instructorId, {
          $push: {
              courses: newCourse._id
          }})
          
      return res.status(200).json({
          success:true,
          message:'Course created successfully',
          newCourse
      })    
  } catch (error) {
      console.error(error);
      return res.status(500).json({
          success:false,
          message:'Failed to create Course',
          error: error.message,
      })
  }
}
//show alll course handler 
exports.showAllCourse=async (req,res)=>{
    
    try{
     //fetch data from body
     const allTags=await Course.find({},{ 
        courseName:true,
        price:true,
        instructor:true,
        RatingAndReviews:true,
        studentEnrolled:true,
        instructor: instructorDetails._id,
        thumbnail: true,})
        .populate("instructor")
        .exec();
      
      //return response
      return res.status(200).json({
        success:true,
        message:"data of all courses fetched",
      })
    }
    
    catch(error){
        return res.status(500).json({
            success:false,
            message:'cannot fetch course list',
            error:error.message,
        })

    }
}

exports.getCourseDetails = async (req, res) => {
    const { courseId } = req.body;

    try {
        const courseDetails = await Course.findById(courseId)
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails",
                },
            })
            .populate("category")
            .populate("RatingAndReviews")
            .populate({
                path: "courseContent",
                populate: "subSection",
            })
            .exec();

        // Validation
        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }


        return res.status(200).json({
            success: true,
            message: "Course details fetched successfully",
            data: courseDetails,
        });
    } catch (error) {
        
        console.error("Error fetching course details:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
}

exports.editCourse = async (req, res) => {
    try {
      const { courseId } = req.body
      const updates = req.body
      const course = await Course.findById(courseId)
  
      if (!course) {
        return res.status(404).json({ error: "Course not found" })
      }
  
      // If Thumbnail Image is found, update it
      if (req.files) {
        console.log("thumbnail update")
        const thumbnail = req.files.thumbnailImage
        const thumbnailImage = await uploadImageToCloudinary(
          thumbnail,
          process.env.FOLDER_NAME
        )
        course.thumbnail = thumbnailImage.secure_url
      }
  
      // Update only the fields that are present in the request body
      for (const key in updates) {
        if (updates.hasOwnProperty(key)) {
          course[key] = updates[key]
          // if (key === "tag" || key === "instructions") {
          //   course[key] = JSON.parse(updates[key])
          // } else {
          //   course[key] = updates[key]
          // }
        }
      }
  
      await course.save()
  
      const updatedCourse = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails", 
          },
        })
        .populate("category")
        .populate("RatingAndReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      res.json({
        success: true,
        message: "Course updated successfully",
        data: updatedCourse,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

  exports.getFullCourseDetails = async (req, res) => {
    try {
      const { courseId } = req.body
     
      const userId = req.user.id
   
      const courseDetails = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate("RatingAndReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
   

      let courseProgressCount = await CourseProgress.findOne({
        courseID: courseId,
        userId: userId,
      })
  
      
      if (!courseDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find course with id: ${courseId}`,
        })
      }
  
      // if (courseDetails.status === "Draft") {
      //   return res.status(403).json({
      //     success: false,
      //     message: `Accessing a draft course is forbidden`,
      //   });
      // }
  
      let totalDurationInSeconds = 0
      courseDetails.courseContent.forEach((content) => {
        content.subSection.forEach((subSection) => {
          const timeDurationInSeconds = parseInt(subSection.timeDuration)
          totalDurationInSeconds += timeDurationInSeconds
        })
      })
  
      const totalDuration = convertSecondsToDuration(totalDurationInSeconds);
  
      return res.status(200).json({
        success: true,
        data: {
          courseDetails,
          totalDuration,
          completedVideos: courseProgressCount?.completedVideos
            ? courseProgressCount?.completedVideos
            : [],
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }
  
  // Get a list of Course for a given Instructor
  exports.getInstructorCourses = async (req, res) => {
    try {
      // Get the instructor ID from the authenticated user or request body
      const instructorId = req.user.id
  
      // Find all courses belonging to the instructor
      const instructorCourses = await Course.find({
        instructor: instructorId,
      }).sort({ createdAt: -1 }).populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()
  
      // Return the instructor's courses
      res.status(200).json({
        success: true,
        data: instructorCourses,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Failed to retrieve instructor courses",
        error: error.message,
      })
    }
  }
  // Delete the Course
  exports.deleteCourse = async (req, res) => {
    try {
      const { courseId } = req.body
  
      // Find the course
      const course = await Course.findById(courseId)
      if (!course) {
        return res.status(404).json({ message: "Course not found" })
      }
  
      // Unenroll students from the course
      const studentsEnrolled = course.studentEnrolled
      for (const studentId of studentsEnrolled) {
        await User.findByIdAndUpdate(studentId, {
          $pull: { courses: courseId },
        })
      }
  
      // Delete sections and sub-sections
      const courseSections = course.courseContent
      for (const sectionId of courseSections) {
        // Delete sub-sections of the section
        const section = await Section.findById(sectionId)
        if (section) {
          const subSections = section.subSection
          for (const subSectionId of subSections) {
            await SubSection.findByIdAndDelete(subSectionId)
          }
        }
  
        // Delete the section
        await Section.findByIdAndDelete(sectionId)
      }
      

      // Delete the course
      await Course.findByIdAndDelete(courseId)
  
      return res.status(200).json({
        success: true,
        message: "Course deleted successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      })
    }
  }