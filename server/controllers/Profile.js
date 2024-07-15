const User = require("../models/User");
const Profile = require("../models/Profile");
const cron = require('node-cron');
const { convertSecondsToDuration } = require("../utils/secondToDuration");
const { uploadImageToCloudinary } = require("../utils/ImageUploder");
const  CourseProgress=require("../models/CourseProgress");
const Course = require("../models/Course");
//update profile handler 

exports.updateProfile = async (req, res) => {
  try {
    // Get data from request body
    const {
      dateofBirth = "",
      about = "",
      gender,
      contactNumber,
      firstName = "",
      lastName = ""
    } = req.body;

    // Get user ID from request
    const userId = req.user.id;

    // Validation
    if (!gender || !contactNumber) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Find user details
    const userDetails = await User.findById(userId);
    const profileId = userDetails.additionalDetails;

    // Update Profile model
    const updatedProfile = await Profile.findByIdAndUpdate(
      profileId,
      { dateofBirth, gender, about, contactNumber },
      { new: true }
    );

    // Update User model
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName },
      { new: true }
    ).populate("additionalDetails").exec();

    console.log("updatedUserDetails ", updatedUser);

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      updatedUserDetails: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in updating profile",
      error: error.message,
    });
  }
};


//delete profile handler
exports.deleteAccount = async (req, res) => {
    try {
        // get user id from request
        const userId = req.user.id;

        // delete profile
        await Profile.findOneAndDelete({ user: userId });

        // delete user
        await User.findByIdAndDelete(userId);

        return res.status(200).json({
            success: true,
            message: "Account deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in deleting account",
            error: error.message,
        });
    }
};
// Schedule the task to run every day at midnight
cron.schedule('0 0 * * *', async () => {
    try {
        console.log('Running account deletion task...');

        // Retrieve users to delete (example: delete users created more than 30 days ago)
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        const usersToDelete = await User.find({ createdAt: { $lte: thirtyDaysAgo } });

        // Delete each user's account
        for (const user of usersToDelete) {
            await exports.deleteAccount(user._id);
        }

        console.log('Account deletion task completed successfully.');
    } catch (error) {
        console.error('Error running account deletion task:', error);
    }
});


exports.instructorDashboard=async(req,res)=>{

  try{
     const courseDetails=await Course.find({instructor:req.user.id});
     const courseData=courseDetails.map((course)=>{
      const totalStudentsEnrolled=course.studentEnrolled.length;
      const totalAmountGenerated=totalStudentsEnrolled*course.price;
      const courseStats={
        _id:course._id,
        courseName:course.courseName,
        courseDescription:course.courseDescription,
        totalAmountGenerated,
        totalStudentsEnrolled,
      }

      return courseStats;
     })
     
     res.status(200).json({courses:courseData});
  }

  catch{
    console.error(error);
    res.status(500).json({message:"internal server error"})
  }
};
exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id
    let userDetails = await User.findOne({
      _id: userId,
    })
    .populate({
      path: "courses",
      populate: {
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      },
    })
    .exec();
    


    userDetails = userDetails.toObject()
    // console.log("user details",userDetails);
    // console.log("user details.course",userDetails.courses);
    // console.log("user details.course.coursecontent",userDetails.courses[0].courseContent);
    // console.log("user details.course.coursecontent.subsection",userDetails.courses[0].courseContent[0].subSection);

  var SubsectionLength = 0
  for (var i = 0; i < userDetails.courses.length; i++) {
  let totalDurationInSeconds = 0
  SubsectionLength = 0
  for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
    totalDurationInSeconds += userDetails.courses[i].courseContent[j].
    subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
    userDetails.courses[i].totalDuration = convertSecondsToDuration(
    totalDurationInSeconds
    )
    SubsectionLength +=
    userDetails.courses[i].courseContent[j].subSection.length
  }
  
  let courseProgressCount = await CourseProgress.findOne({
    courseID: userDetails.courses[i]._id,
    userId: userId,
  })
  courseProgressCount = courseProgressCount?.completedVideos.length
  if (SubsectionLength === 0) {
    userDetails.courses[i].progressPercentage = 100
  } else {
    // To make it up to 2 decimal point
    const multiplier = Math.pow(10, 2)
    userDetails.courses[i].progressPercentage =
    Math.round(
      (courseProgressCount / SubsectionLength) * 100 * multiplier
    ) / multiplier
  }
  }

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      })
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
};

exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture
    const userId = req.user.id
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    )
    console.log(image)
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    )
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
};


// exports.getEnrolledCourses = async (req, res) => {
//   try {
//       const userId = req.user.id;

//       // Fetch user details including enrolled courses
//       const userDetails = await User.findOne({ _id: userId })
//           .populate({
//               path: "courses",
//               populate: {
//                   path: "courseContent",
//                   populate: {
//                       path: "subSection",
//                   },
//               },
//           })
//           .exec();

//       if (!userDetails) {
//           return res.status(400).json({
//               success: false,
//               message: `Could not find user with id: ${userId}`,
//           });
//       }

//       // Process enrolled courses and calculate progress
//       const enrolledCourses = userDetails.courses.map(course => {
//           const totalDurationInSeconds = course.courseContent.reduce((acc, content) => {
//               return acc + (content.subSection || []).reduce((subAcc, subSection) => subAcc + parseInt(subSection.timeDuration || 0), 0);
//           }, 0);

//           const subSectionCount = course.courseContent.reduce((acc, content) => {
//               return acc + (content.subSection || []).length;
//           }, 0);

//           const completedVideos = (course.courseProgress || {}).completedVideos || [];
//           const progressPercentage = subSectionCount === 0 ? 100 : Math.round((completedVideos.length / subSectionCount) * 100);

//           return {
//               ...course.toObject(),
//               totalDuration: convertSecondsToDuration(totalDurationInSeconds),
//               progressPercentage,
//           };
//       });

//       return res.status(200).json({
//           success: true,
//           data: enrolledCourses,
//       });
//   } catch (error) {
//       return res.status(500).json({
//           success: false,
//           message: error.message,
//       });
//   }
// };
