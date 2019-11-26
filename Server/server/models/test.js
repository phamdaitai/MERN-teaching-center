var {mongoose} = require('../db/mongoose');
let autoIncrement=require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);
let testSchema =new mongoose.Schema({
    courseID:{
       type:String,
       trim:true,
       required: true
    },
    studentID:{
        type:String,
        trim:true,
        required: true
    },
    name:{
        type:String,
        trim:true,
        required: true
    },
    result:{
        type:Number,
        required: true
    }
})
testSchema.plugin(autoIncrement.plugin,'Test')
const Test=mongoose.model('Test',testSchema)
module.exports = {Test}
