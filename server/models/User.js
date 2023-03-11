import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    login:{
        type:String,
        required : true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    fullname:{
        type:String,
        required : true,
    },
    group:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default: "Student"
    },
    avatarUrl: String

},{timestamps:true});

export default mongoose.model('User',UserSchema);
