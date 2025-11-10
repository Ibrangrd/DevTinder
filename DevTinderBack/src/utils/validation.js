const validator  = require("validator");

const validationSignUpData = (req) =>{
const {firstName,email,password} = req.body;
if(firstName.length<2 || firstName.length>51){
    throw new Error ("Name is not Valid");
}
    else if(!validator.isEmail(email)){
        throw new Error("Email is not valid!");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Password must be Strong!!");
    }
}

module.exports=validationSignUpData;