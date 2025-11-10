const express = require("express");
const profileRouter = express.Router();
const userAuth = require("../middlewares/auth")
const User = require("../models/user")

profileRouter.get("/profile/view",userAuth , (req,res) =>{
   try{
   // const {token} = req.cookies;
   // if(!token) res.send("Token is invalid");
   // const deCodeData = await jwt.verify(token,"IbranChill$241");
   // console.log(deCodeData);
   // const {_id} = deCodeData; 
   // const user = await User.findById(_id);
   // if(!user){
   //    res.send("User Not Found");
   // }
   const user = req.user;
   res.send(user);
   }catch(err){
      res.status(404).send("ERROR "+ err.message);
   }
});
profileRouter.put("/profile/edit", userAuth, async(req,res) => {
const data = req.body; 
const userId = req.user._id;
try{
   const Allow_Update = [
      "photoUrl",
      "about",
      "skills",
      "firstName",
      "lastName",
      "age",
      "gender",
   ];
   const isupdateAllow = Object.keys(data).every((k)=>
      Allow_Update.includes(k)
);
   if(!isupdateAllow){
      return res.status(404).json({message:"Update not Allowed"});
   }
   if(data?.skills && data?.skills?.length>10)
   {
      return res.status(404).send("Skills more than 10 are not Allowed");
   }
   const updatedData = await User.findByIdAndUpdate(userId,data, { new: true, runValidators: true } );
   res.send(updatedData);
}
catch(err){
   res.status(400).send("Can't Able to Update "+err);
}


});
module.exports = profileRouter;
