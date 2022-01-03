const express = require("express"); // we import the library

const app = express(); //  we start the App

const mongoose = require("mongoose");

const dotenv = require("dotenv"); // we import dotenv

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");

dotenv.config(); // we can use the file  .env

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connected"))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use("/api/users", userRoute); // always use plurals for end points
app.use("/api/auth", authRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is Starting");
});
