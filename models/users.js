import mongoose, { Schema } from "mongoose";

// Schema => Collections 
const UserSchema = new Schema({
    username: {
        type: String,
        unique:true,
        required: true,
        
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    phonenumber: {
        type: Number,
        required: true
    },
}); 

export const userModel = mongoose.model("users", UserSchema);