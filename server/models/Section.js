const mongoose=require("mongoose");

const sectionSchema=new mongoose.Schema({
  sectionName:{
        type:String,
    },
    // courseContent: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "Section",
    //     },
    // ],
    subSection:
        [{type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"SubSection",
    }
        ]
       


});

module.exports=mongoose.model("Section",sectionSchema);