var {mongoose} = require('../db/mongoose');
let autoIncrement=require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);
let lectureSchema =new mongoose.Schema({
    courseID:{
        type:String,
        trim: true,
        required:true
    },
    teacherID:{
        type:String,
        trim: true,
        required:true
    },
    lectureName:{
        type:String,
        required:true,
        trim:true,
    },
    lectureContent:{
        type:String,
        required:true,
        trim:true,
    },
    link:{
        type:String,
        required:true,
        trim:true,
    }

})
lectureSchema.plugin(autoIncrement.plugin,'Lecture')
const Lecture=mongoose.model('Lecture',lectureSchema)
module.exports = {Lecture}
