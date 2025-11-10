const mongoose = require("mongoose");

const connectionRequestsSchema = new mongoose.Schema(
{
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{
    type:String,    
    enum:{
    values:["interested","ignored","accepted","rejected"],
    message:`{VALUE} is incorrect status type`
    }
    }
} ,
{timestamps:true},
);

connectionRequestsSchema.pre("save" , function(next){
    const connection = this;
    if(connection.fromUserId.equals(connection.toUserId))
    throw new Error("You can not send request to Yoourself");
    next();
});

connectionRequestsSchema.index({fromUserId:1, toUserId:1});


module.exports = mongoose.model("ConnectionRequest",connectionRequestsSchema)
;