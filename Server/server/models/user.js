var mongoose = require('mongoose');
const md5=require('md5');
const bcript=require('bcrypt');
    // Schema = mongoose.Schema,
    // bcrypt = require('bcrypt'),
    // SALT_WORK_FACTOR = 10;
let ObjectId=mongoose.Schema.Types.ObjectId
const userSchema = new mongoose.Schema({
    _id:ObjectId,
    username: {type: String, required: [true,"Username is required"], index: {unique: true}},
    password: {
        type: String,
        required: [true,"Password is required"],
        validate:{
            validator:(value)=>{
                let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

                if(value.toLowerCase()==value||!format.test(value)||! /\d/.test(value)){
                    throw new Error("Password is invalid");
                }

            },
            message:'Password is invalid'
        }

    }
});
userSchema.pre('save',async function (next) {
    const user=this;
    if(user.isModified('password')){
        user.password=await bcript.hash(user.password,1);
        console.log(user.password);
    }
    // console.log('hello');
    next();
})
const User=mongoose.model('User',userSchema)

// UserSchema.pre('save', async function() {
//     await console.log("Hello");
//
// });
module.exports = {User};
