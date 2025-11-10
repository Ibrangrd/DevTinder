const mongoose = require("mongoose");

const connectDB = async()=>{
  await mongoose.connect(process.env.MongoDb_Secret);
};
module.exports= connectDB;