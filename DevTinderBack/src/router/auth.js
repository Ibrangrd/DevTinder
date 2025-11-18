const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const validationSignUpData = require("../utils/validation");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  validationSignUpData(req);
  const {
    firstName,
    lastName,
    password,
    email,
    age,
    gender,
    photoUrl,
    about,
    skills,
  } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  // console.log(passwordHash);
  const user = new User({
    firstName,
    lastName,
    email,
    password: passwordHash,
    age,
    gender,
    photoUrl,
    about,
    skills,
  });

  // const user = new User(req.body);
  try {
    await user.save();
    const token = await user.getJWT();
    // console.log(token);
    // res.cookie("token",token);
    res.cookie("token", token, {
      httpOnly: true,
      // secure: true, // important in deployed (https)
      // sameSite: "none", // important for cross domain
      secure: process.env.NODE_ENV === "production", // true only online
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    res.send(user);
  } catch (err) {
    res.status(400).send("Error while saving the data:-" + err.message);
  }
});
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).send("User is Not Found");
    }
    const isPasswordCorrect = await user.validatePassword(password);
    if (!isPasswordCorrect) {
      res.status(404).send("Password is Wrong");
    }
    if (isPasswordCorrect) {
      const token = await user.getJWT();
      // console.log(token);
      // res.cookie("token", token);
      res.cookie("token", token, {
        httpOnly: true,
        // secure: true, // important in deployed (https)
        // sameSite: "none", // important for cross domain
        secure: process.env.NODE_ENV === "production", // true only online
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      });
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("ERROR " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout Successful!");
});

module.exports = authRouter;
