const express=require('express')
const {Course}=require("../models/course")
const router=express.Router()
router.post('/courses',(req,res)=>{
    var course=new Course({
        name:req.body.name,
        teacherId:req.body.teacherId,
        schedule: req.body.schedule,
        studyTime: {
            lessonTime: req.body.studyTime.lessonTime,
            courseTime:req.body.studyTime.courseTime,
        },
        tuition:req.body.tuition,
        categories:req.body.categories,
        topic:req.body.topic,
        subject:req.body.subject
    });
    course.save().then((doc)=>{
        res.send(doc)
    }).catch((err)=> res.send(err))
})
module.exports=router
