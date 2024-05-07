const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name:{
        type:String,
        reuqired:true,
        trim:true
    },
    description:{
        type:String,
        reuqired:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date
    },
    status:{
        type:String,
        enum:["Planning", "Ongoing", "Completed", "Paused"],
        default:"Planning"
    },
    links:[{
        url:String,
        description:String
    }],
    image:[String]
})

module.exports = mongoose.model("Project",projectSchema);