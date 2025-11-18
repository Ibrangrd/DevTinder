const mongoose  = require("mongoose");

const messageScheme = new mongoose.Schema({
  senderId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"User"
  },
  text:{
    type:String,
    required:true,
  }

}, {timestamps:true}
);

const chatScheme = new mongoose.Schema({
  participants:[
    {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    }
  ],
  messages:[messageScheme],
});

const Chat = mongoose.model("Chat" ,chatScheme);

module.exports  = {Chat};