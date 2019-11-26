var {mongoose} = require('../db/mongoose');
let autoIncrement=require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);
let homeworkSchema =new mongoose.Schema({
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
    homeworkName:{
        type:String,
        required:true,
        trim:true,
    },
    homeworkContent:{
        type:String,
        required:true,
        trim:true,
    },
    deadline:{
        type:String,
        required:true,
        trim:true,
    }

})
homeworkSchema.plugin(autoIncrement.plugin,'Homework')
const Homework=mongoose.model('Homework',homeworkSchema)
module.exports = {Homework}
