const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const route = require("./Routes/route");

//middleare
app.use(express.json());

//databse connection
const db = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("database is connected");
    })
    .catch((err) => {
      console.log({ err: err });
    });
};

//Routes
app.use("/", route);

app.listen(5000, () => {
  db();
  console.log("server is running on port 5000");
});
