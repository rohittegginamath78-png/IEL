const mongoose = require("mongoose");
const InterviewExperience = require("./InterviewExperience");

const commentschema = new mongoose.Schema({
    interviewId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "InterviewExperience",
        required : true
    },
    userId :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    text:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default: Date.now
    }


})

module.exports = mongoose.model("Comment" ,commentschema)