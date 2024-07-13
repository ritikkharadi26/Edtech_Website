const mongoose=require("mongoose");

const courseSchema=new mongoose.Schema({
        courseName:{
            type:String,
        },

        description:{
             type:String,},

        instructor:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },

        whatYouWillLearn:{
            type:String,},

            courseContent:[{
                type:mongoose.Schema.Types.ObjectId, 
                ref: "Section",
            }],

        RatingAndReviews:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReview"}],
            
        price:{
            type:String,
        },

        thumbnail:{
            type:String,
        },
        category:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Category"
        },
        createdAt: {
            type:Date,
            default:Date.now
        },
        tags:{
            type:String,
        },
        instructions: {
            type: String,
        },
        status: {
            type: String,
            enum: ["Draft", "Published"],
        },

        studentEnrolled:[{
           type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        }
]
        }


);

module.exports=mongoose.model("Course",courseSchema);