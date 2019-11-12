const mongoose =require('mongoose');
let {User}=require('./user')
let Student=mongoose.model('Student',{
    accountId:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },

    name:{
        type:String,
        required:true,
        trim:true,
    },
    address:{
        type:String,
        required:true,
        trim:true
    },
    phoneNumber:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        minLength:9
    },
    class:{
        type:String,
        require:true,
        trim:true
    },
    permission:{
        type:String,
        required:false
    }
})
module.exports={Student}
