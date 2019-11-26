var {mongoose} = require('../db/mongoose');
let autoIncrement=require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);
let questionSchema =new mongoose.Schema({
    testID:{
        type:String,
        trim:true,
        required: true
    },
    optionA:{
        type:String,
        trim:true,
        required: true
    },
    optionB:{
        type:String,
        trim:true,
        required: true
    },
    optionC:{
        type:String,
        trim:true,
        required: true
    },
    optionD:{
        type:String,
        trim:true,
        required: true
    },
    answer:{
        type:String,
        trim:true,
        required: true
    }
})
questionSchema.plugin(autoIncrement.plugin,'Question')
const Question=mongoose.model('Question',questionSchema)
module.exports = {Question}
