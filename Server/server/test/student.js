var {mongoose} = require('../db/mongoose');
const bcript=require('bcrypt');
// let ObjectId=mongoose.Schema.Types.ObjectId;
let autoIncrement=require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);
let studentSchema =new mongoose.Schema({
    _id:{
        type:Number
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        index: {unique: true}
        },
    password: {
        type: String,
        required: [true, "Password is required"],
        validate: {
            validator: (value) => {
                let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

                if (value.toLowerCase() == value || !format.test(value) || !/\d/.test(value)) {
                    throw new Error("Password is invalid");
                }

            },
            message: 'Password is invalid'
        }
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minLength: 9
    },
    class: {
        type: String,
        require: true,
        trim: true
    },
    permission: {
        type: String,
        required: false
    }
})
studentSchema.plugin(autoIncrement.plugin,'Student')
studentSchema.pre('save',async function (next) {
    const user=this;
    if(user.isModified('password')){
        user.password=await bcript.hash(user.password,1);
        console.log(user.password);
    }
    next();
})
const Student=mongoose.model('Student',studentSchema)
module.exports = {Student}
