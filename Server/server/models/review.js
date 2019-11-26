var {mongoose} = require('../db/mongoose');
let autoIncrement=require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);
let reviewSchema =new mongoose.Schema({
    courseID:{
        type:String,
        trim: true,
        required:true
    },
    studentID:{
        type:String,
        trim: true,
        required:true
    },
    reviewTitle:{
        type:String,
        required:true,
        trim:true,
    },
    reviewContent:{
        type:String,
        required:true,
        trim:true,
    }

})
reviewSchema.plugin(autoIncrement.plugin,'Review')
const Review=mongoose.model('Review',reviewSchema)
module.exports = {Review}
