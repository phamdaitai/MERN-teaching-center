var {mongoose} = require('../db/mongoose');
let autoIncrement=require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);
let documentSchema =new mongoose.Schema({
    courseID:{
        type:String,
        required:true,
        trim:true,
    },
    teacherID:{
        type:String,
        required:true,
        trim:true,
    },
   documentName:{
       type:String,
       required:true,
       trim:true,
   },
    documentContent:{
        type:String,
        required:true,
        trim:true,
    }

})
documentSchema.plugin(autoIncrement.plugin,'Document')
const Document=mongoose.model('Document',documentSchema)
module.exports = {Document}
