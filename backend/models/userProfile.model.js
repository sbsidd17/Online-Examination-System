import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    profile_image: {
        type: String
    },
    about: {
        type: String,
        minLenght: [5, "About should be greater than 5 charachers"],
        maxLenght: [300, "About should be less than 300 charachers"],
    },
    dob:{
        type:String
    },
    gender:{
        type:String
    }
    
})

const UserProfile = mongoose.model("UserProfile", profileSchema)
export default UserProfile;