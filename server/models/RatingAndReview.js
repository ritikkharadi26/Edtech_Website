const mongoose=require("mongoose");

const ratingandreviewSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    rating:{
        type:Number,
        required:true,
      
    },
    review:{
        type:String,
        required:true,
        
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        req:true,
        index:true,
    }
})

module.exports = mongoose.model("RatingAndReview", ratingandreviewSchema);
