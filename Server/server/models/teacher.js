var mongoose=require('mongoose');
var Teacher=mongoose.model('Teacher',{
    username:{
        type:String,
        trim:true,
        required:true,
        minLength:8
    },
    password:{
        type:String,
        required: true,
        trim:true,
        minLength: 8
    },
    name:{
        type:String,
        required:true,
        trim:false,
    },
    address:{
        type:String,
        required:true,
        trim:false
    },
    phoneNumber:{
        type:String,
        required:true,
        trim:false
    },
    email:{
        type:String,
        required:true,
        trim:false,
        minLength:9
    },
    permission:{
        required:false
    }
})
module.exports={Teacher};