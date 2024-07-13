const mongoose=require("mongoose");

const subsectionSchema=new mongoose.Schema({
   title:{
        type:String,
    },
    timeDuration:{
        type:String,

    },
  description:{
      
        type:String,
    },
    videoUrl:{
        type:String,
    },
    discussions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Discussion",
    }],
})

module.exports=mongoose.model("SubSection",subsectionSchema);