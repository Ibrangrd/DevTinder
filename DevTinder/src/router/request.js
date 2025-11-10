const express = require("express");
const requestRouter = express.Router();
const userAuth = require("../middlewares/auth");
const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const { status, toUserId } = req.params;
    const validStatus  =  ["interested" , "ignored"];
    if (!validStatus.includes(status)) {
      return res.status(400).json({message:"Invalid status type "+ status});
    }
    const validtoUser = await User.findById({ _id: toUserId });
    if (!validtoUser) {
      return res.status(400).json({message:"User not found"});
    }
    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or:[
       { fromUserId, toUserId},
       {fromUserId:toUserId,toUserId:fromUserId},
      ],
    });
    if(existingConnectionRequest){
      return res.status(400).json({message:"Already have a connection request"});
    }

    const newConnectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status
    }) ;
    const data = await newConnectionRequest.save();
      res.json({
      message:
      req.user.firstName+ " is "+status +" in " +validtoUser.firstName})
  } catch(err) {
    res.status(400).send("ERROR " + err);
  }
});

requestRouter.post("/request/review/:status/:requestId" , userAuth, async(req,res)=>{
try{ 
const loggedInId = req.user._id;
const {status,requestId} = req.params;

const validStatus = ["accepted","rejected"];
if(!validStatus.includes(status)){
  return res.status(400).json({message:"Invalid status!!!!"});
}
const updateConnectionRequest = await ConnectionRequest.findOne({
_id:requestId,
toUserId:loggedInId,
status:"interested"
}).populate("fromUserId","firstName lastName age gender photoUrl about skills")

if(!updateConnectionRequest){
  return res.status(400).json({message:"Connection not found!!!!"});
}
updateConnectionRequest.status=status;
const data = await updateConnectionRequest.save();
res.json({message:"Connection request send successfully"});
}
catch(err){
  res.status(404).send("ERROR "+err);
}

});

module.exports=requestRouter;
