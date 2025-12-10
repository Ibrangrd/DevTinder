const validator  = require("validator");

const validationSignUpData = (req) =>{
const {firstName,email,password} = req.body;
if(firstName.length<2 || firstName.length>51){
    return "Name is not Valid";
}
    else if(!validator.isEmail(email)){
        return "Email is not valid!";
    }
    else if(!validator.isStrongPassword(password)){
        return "Password must be Strong!!";
    }
    else {
        return null;
    }
}

module.exports=validationSignUpData;