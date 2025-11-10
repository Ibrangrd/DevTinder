const express = require("express");
const userRouter = express.Router();
const userAuth = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const USER_SAFE_DATA = "firstName lastName age gender photoUrl about skills";
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInId = req.user._id;
    const allConnectionRequest = await ConnectionRequest.find({
      toUserId: loggedInId,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);
    if (allConnectionRequest.length===0) {
      return res.json({ message: "No pending request" });
    }
    res.json({
      message: "Data fetching successfully ",
      data: allConnectionRequest,
    });
  } catch (err) {
    res.status(404).send("ERROR " + err);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInId = req.user._id;

   const allConnection = await ConnectionRequest.find({
    $or:[{
        fromUserId:loggedInId,
        status:"accepted"
        },
        {
        toUserId:loggedInId,
        status:"accepted"
        }
    ]
   }).populate("fromUserId",USER_SAFE_DATA)
   .populate("toUserId",USER_SAFE_DATA);

const data = allConnection.map((row=>{
    if(row.fromUserId._id.toString()===loggedInId.toString()) return row.toUserId;
    return row.fromUserId;
}))  

res.json({data});

  } catch (err) {
    res.status(404).json({message:"Something went wrong "+err});
  }
});

userRouter.get("/feed" , userAuth, async(req,res)=>{
try{    
const loggedInId = req.user._id;

const page = parseInt(req.query.page)||1;
let limit = parseInt(req.query.limit)||10;
limit = limit>20 ?20 :limit;
const skip = (page-1)*limit;

const allconnection = await ConnectionRequest.find({
    $or:[
        {fromUserId:loggedInId},
        {toUserId:loggedInId},
    ]
}).select("fromUserId toUserId");

const hideFromFeed = new Set();
allconnection.forEach((row)=>{
    hideFromFeed.add(row.fromUserId.toString());
    hideFromFeed.add(row.toUserId.toString());
});

const users = await User.find({
$and:[
    {_id:{$nin:Array.from(hideFromFeed)}},
    {_id:{$ne:loggedInId}},
]
}).select(USER_SAFE_DATA)
.skip(skip)
.limit(limit);


res.json({users});
}
catch(err){
    res.status(404).json({message: "Something went wrong", error: err.message })
}
});

module.exports = userRouter;
