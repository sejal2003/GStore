const mongoose = require('mongoose');
const validator = require("validator");

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required :true,
        validate(value){
            if(value.length<5){
                throw new Error("too small name")
            }
        }
    },
    location:{
        type:String,
        required :true
    },
    email :{
        type:String,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid Email")
            }
        }
    },
    password :{
        type:String,
        required :true,
        validate(value){
            if(value.length<5){
                throw new Error("too small password")
            }
        }

    },
    date:{
        type: Date,
        default :Date.now
    }
});

const Users = new mongoose.model('user', UserSchema);
module.exports = Users;