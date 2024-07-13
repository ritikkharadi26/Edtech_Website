const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/ImageUploder");

exports.createSubSection = async (req,res) =>{
  try {
      const {sectionId,title, timeDuration, description } = req.body;

      const video  = req.files.video;

      if(!sectionId || !title || !description || !video) {
          return res.status(400).json({
              success:false,
              message:'All fields are required',
          });
      }

      const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

      const newSubSection = await SubSection.create({
          title,
          timeDuration: `${uploadDetails.duration}`,
          description,
          videoUrl:uploadDetails.secure_url
      })

      const updatedSection = await Section.findByIdAndUpdate(sectionId, { $push: {subSection: newSubSection._id}},{new:true}).populate("subSection");

      return res.status(200).json({
          success:true,
          message:'SubSection created successfully',
          updatedSection
      })   
  } catch (error) {
      console.error(error);
      return res.status(500).json({
          success:false,
          message:'Failed to create SubSection',
          error: error.message,
      })
  }
}

exports.deleteSubSection = async (req, res) => {
    try {
        const { sectionId, subsectionId } = req.body;

        if (!sectionId || !subsectionId) {
            return res.status(400).json({
                success: false,
                message: "Both sectionId and subsectionId are required",
            });
        }

        // Remove subsection from Section document
        await Section.findByIdAndUpdate(
            sectionId,
            { $pull: { subsections: subsectionId } }
        );

        // Delete the SubSection document
        await SubSection.findByIdAndDelete(subsectionId);

        return res.status(200).json({
            success: true,
            message: "Subsection deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

// exports.updateSubSection = async (req, res) => {
//     try {
//         const { subsectionId, title, description, timeDuration, videoUrl } = req.body;
//         const video = req.files.video
//         // Validation
//         if (!subsectionId || !title || !description ||  !video) {
//             return res.status(400).json({
//                 success: false,
//                 message: "All fields are required",
//             });
//         }
//         const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

//         // Update SubSection document
//         const updatedSubsection = await SubSection.findByIdAndUpdate(
//             subsectionId,
//             {
//                 title,
//                 description,
//                 timeDuration,
//                 videoUrl,
//             },
//             { new: true }
//         );

//         return res.status(200).json({
//             success: true,
//             message: "Subsection updated successfully",
//             data: updatedSubsection,
//         });
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Internal server error",
//             error: error.message,
//         });
//     }
// };


exports.updateSubSection = async (req, res) => {
    try {
      const { sectionId,subSectionId, title, description } = req.body
      const subSection = await SubSection.findById(subSectionId)
  
      if (!subSection) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        })
      }
  
      if (title !== undefined) {
        subSection.title = title
      }
  
      if (description !== undefined) {
        subSection.description = description
      }
      if (req.files && req.files.video !== undefined) {
        const video = req.files.video
        const uploadDetails = await uploadImageToCloudinary(
          video,
          process.env.FOLDER_NAME
        )
        subSection.videoUrl = uploadDetails.secure_url
        subSection.timeDuration = `${uploadDetails.duration}`
      }
  
      await subSection.save()
  
      const updatedSection = await Section.findById(sectionId).populate("subSection")


      return res.json({
        success: true,
        data:updatedSection,
        message: "Section updated successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the section",
      })
    }
  }
