const Discussion = require("../models/Discussion");
const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const Course = require("../models/Course");
const mongoose = require("mongoose");

exports.createDiscussion = async (req, res) => {
    try {
        // Get user id
        const userId = req.user.id;
        // Fetch data from req body
        const { message, subsectionId } = req.body;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(subsectionId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid subsection ID format',
            });
        }

        // Find the subsection
        const subsection = await SubSection.findById(subsectionId);
        if (!subsection) {
            return res.status(404).json({
                success: false,
                message: 'Subsection not found',
            });
        }

        // Find the section containing the subsection
        const section = await Section.findOne({ subSection: subsectionId });
        if (!section) {
            return res.status(404).json({
                success: false,
                message: 'Section not found for the given subsection',
            });
        }

        // Find the course containing the section
        const course = await Course.findOne({ courseContent: section._id });
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found for the given section',
            });
        }

        // Create discussion
        const discussion = await Discussion.create({
            user: userId,
            subsection: subsectionId,
            message,
        });

        // Update subsection with this discussion
        subsection.discussions.push(discussion._id);
        await subsection.save();
        const populatedDiscussion = await discussion.populate('user', 'message').execPopulate();
        // Return response
        return res.status(200).json({
            success: true,
            message: "Discussion created successfully",
            discussion:populatedDiscussion.message,
        });
    } catch (error) {
        console.error("Error in createDiscussion:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};



exports.getDiscussionDetails = async (req, res) => {
    try {
        const { subsectionId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(subsectionId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid subsection ID format',
            });
        }

        const discussions = await Discussion.find({ subsection: subsectionId }).populate("message") .populate({
            path: 'user',
            select: 'firstName lastName email'
          });
                                                                                
       
        console.log("discussion",discussions);
        return res.status(200).json({
            success: true,
            discussions,
        });
    } catch (error) {
        console.error("Error fetching discussions by subsection ID:", error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
