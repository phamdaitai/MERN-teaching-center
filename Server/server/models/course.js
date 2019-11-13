const mongoose=require('mongoose')

let Course= mongoose.model('Course',{
    name:{
        type:String,
        trim: true,
        required:true
    },
    nameOfTeacher:{
        type:String,
        trim:true,
        required: true
    },
    schedule:{
        type:String,
        trim:true,
        required: true
    },
    studyTime:{
        type:String,
        trim:true,
        required: true
    },
    tuition:{
        type:Number,
        required:true
    }
})