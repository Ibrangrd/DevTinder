const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
firstName:{
    type:String,
    required:true,
    minLength:2,
    maxLength:50,
},
lastName:{
    type:String,
},
email:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    lowercase:true,
    validate(value){
    if(!validator.isEmail(value)){
        throw new Error("Invalid Email Address" + value);
    }
    }
},
password:{
    type:String,
    required:true,
    validate(value){
        if(!validator.isStrongPassword(value)){
            throw new Error("Enter a Strong password"+value);
        }
    }
},
age:{
    type:Number,
    min:15,
},
gender:{
    type:String,
    validate(value){
        if(!["male","female","other"].includes(value)){
        throw new Error("Gender data is not Valid");
        }
    },
},
photoUrl:{
    type:String,
    default:"https://st.depositphotos.com/1052233/2815/v/450/depositphotos_28158459-stock-illustration-male-default-profile-picture.jpg",
    validate(value){
        if(!validator.isURL(value)){
            throw new Error("Enter a valid Url");
        }
    }
},
about:{
type:String,
default:"Hey! I'm using DevTinder",
},
skills:{
    type:[String],
}
},
{
    timestamps:true,
})
userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({_id:user._id},"IbranChill$241",{expiresIn:"7d"});
    return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this;
    const passwordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(passwordInputByUser,passwordHash);
    return isPasswordCorrect;
}
// const User = mongoose.model("User",userSchema);
// module.exports = User;
module.exports = mongoose.model("User",userSchema);

