const express  = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config()
const connectDB  = require("./config/database")
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const userAuth = require("./middlewares/auth");
const User = require("./models/user");

app.use(cors({
  origin:"https://devtinder-frontend-fwwl.onrender.com",
  credentials:true,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  // exposedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./router/auth");
const profileRouter = require("./router/profile");
const requestRouter = require("./router/request");
const userRouter = require("./router/user");

app.use(authRouter);
app.use(profileRouter);
app.use(requestRouter);
app.use(userRouter);
// app.post("/sendConnections",userAuth,(req,res)=>{
//    const user = req.user;
//    console.log("Sending Connection Request");
//    res.send(user.firstName + " Send it "+user._id);

// })

// app.get("/user", async (req,res)=>{
// // const findData = await User.find({}); to get all the data
// // const id = req.body.id;
// // const findData = await User.find({firstName:name})
// const findData = await User.find({email:req.body.email});
// try{
//    if(findData.length === 0)
//    {
//       res.status(404).send("User Not Found")
//    }
//    else{   
//    res.send("Getting data successfully....");
//    console.log(findData); 
//    }
// }
// catch{
//    res.send("Something Went Wrong!!!");
// }

// })
// app.get("/feed", async (req,res)=>{
//    const findData = await User.find({});
//    try{
//       console.log(findData);
//       res.send("Fetching data Successfully");
//       // res.send(findData);
//    }
//    catch{
//       res.status(404).send("SomeThing Went Wrong");
//    }
// })

// app.delete("/user",async(req,res)=>{
// // const userId = req.body.userId;
// // const user = await User.findByIdAndDelete(userId);
// const name = req.body.firstName;
// const  user = await User.deleteOne({firstName:name})
// // console.log(user);
// try{
//    res.send("Data deleted seccessfully");
// }
// catch(err){
//    res.send("Something went Worng:"+err);
// }

// })

connectDB()
.then(()=>{
    console.log("DataBase connection Established....");
    app.listen(process.env.PORT,()=>{
    console.log("Server succesfully run")
});
})
.catch((err)=>{
console.log("DataBase is failed to Connect!!! "+err.message);
});


// app.use("/",(req,res)=>{
//     res.send("Hello from the server dewrt");
// });
// app.use("/home",(req,res)=>{
//     res.send("Hello from the Home page");
// });

// app.use("/contact",(req,res)=>{
//     res.send("Hello i am Md Ibran ");
// });

// app.get("/user/:userId/:firstname/:lastName",(req,res)=>{
//     // console.log(req.query);
//     console.log(req.params); 
//     res.send({firstName:"Md.", lastName:"Ibran"})
// })
// app.post("/user",(req,res)=>{
//     console.log("Add data successfully");
//     res.send("Added the data");
// })
// app.delete("/user",(req,res)=>{
//     res.send("Deleted the data");
// })


// app.use("/",(req,res,next)=>{
// console.log("Router handler 1");
// next();
// },(req,res,next)=>{
// console.log("Router Handler 2")
// next();
// },(req,res,next)=>{
// console.log("Router Handler 3")
// next();
// },(req,res,next)=>{
// console.log("Router Handler 4")
// next();
// },(req,res,next)=>{
// console.log("Router Handler 5")
// res.send("Hello Ibran");
// }
// )


// app.use("/",(req,res,next) => {
//     console.log("Router Handler 1");
//     res.send("Hello ");
//     next();
// },(req,res)=>{
//     console.log("Router Handler 2");
//     res.send(":Ibran: is a strong guy")
// }
// )
// app.use("/user",(req,res,next)=>{
//     const token = 345;
//     const isAuthorizedAdmin = token===335;
//     if(isAuthorizedAdmin) next();
//     else{
//         res.status(401).send("unAuthorizedAdmin");
//     }
// });
// app.use("/",(req,res)=>{
//     res.send("Your Data is ....");
// })
