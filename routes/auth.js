const router = require("express").Router(); // we import and start the Router Express

const User = require("../models/User");

const CryptoJS = require("crypto-js");

const jwt = require("jsonwebtoken");
//! USER REGISTER

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//! USER LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      // if there is no user (!) send an error 401 (&&)
      return res.status(401).json("wrong credentials");
    }
    //! We can use console.log to debug errors in the code
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    const accessToken = jwt.sign(
      {
        is: user._Id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...other } = user._doc;

    if (originalPassword !== req.body.password) {
      return res.status(401).json("wrong credentials 2");
    } else {
      return res.status(200).json({ ...other, accessToken });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
