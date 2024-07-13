const Category = require("../models/Category");
const Course=require("../models/Course");
function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}
// Create category handler function 
exports.createCategory = async (req, res) => {
    try {
        // Fetch data from request body
        const { name, description } = req.body;

        // Validation
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Create entry in the database
        const categoryDetails = await Category.create({
            name: name,
            description: description,
        });

        console.log(categoryDetails);
        
        // Return response
        return res.status(200).json({
            success: true,
            message: "Category created successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Show all categories handler
exports.showAllCategories = async (req, res) => {
    try {
        // Fetch data from database
        const allCategories = await Category.find({}, { name: true, description: true });
      
        // Return response
        return res.status(200).json({
            success: true,
            message: "All categories returned successfully",
            categories: allCategories,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.categoryPageDetails = async (req, res) => {
  try {
    // Extract categoryId from the request body
    const { categoryId } = req.body;
    console.log("PRINTING CATEGORY ID: ", categoryId);

    // Step 1: Get courses for the specified category
    const selectedCourses = await Category.findById(categoryId)
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: {
          path: "RatingAndReviews",
        },
      })
      .exec();

    // Step 2: Handle the case when the category is not found
    if (!selectedCourses) {
      console.log("Category not found.");
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    // Step 3: Handle the case when there are no courses in the selected category
    if (selectedCourses.courses.length === 0) {
      console.log("No courses found for the selected category.");
      return res.status(404).json({
        success: false,
        message: "No courses found for the selected category.",
      });
    }

    // Step 4: Get courses for other categories excluding the selected one
    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
      courses: { $not: { $size: 0 } },
    });
    console.log("categoriesExceptSelected", categoriesExceptSelected);

    let differentCourses = [];

    if (categoriesExceptSelected.length > 0) {
      const randomCategoryId = categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]._id;

      differentCourses = await Category.findById(randomCategoryId)
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: {
            path: "RatingAndReviews",
          },
        })
        .exec();
      differentCourses = differentCourses.courses; // Extract courses array
    }

    // Step 7: Fetch top-selling courses across all categories
    const mostSellingCourses = await Course.find({ status: 'Published' })
      .sort({ "studentEnrolled.length": -1 })
      .exec();

    // Step 8: Fetch newest courses across all categories
    const newestCourses = await Course.find({ status: 'Published' })
      .sort({ createdAt: -1 })
      .limit(10) // Adjust the limit as needed
      .exec();

    // Step 9: Respond with the fetched data
    res.status(200).json({
      selectedCourses: selectedCourses.courses,
      differentCourses: differentCourses,
      mostSellingCourses: mostSellingCourses,
      newestCourses: newestCourses,
      name: selectedCourses.name,
      description: selectedCourses.description,
      success: true,
    });
  } catch (error) {
    // Step 10: Handle any errors that occur
    console.log("Error fetching category page details:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
