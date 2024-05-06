const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const route = require("./Routes/route");
const passport = require("passport");
const session = require("express-session");
const passportConfig = require("./Passport/passport");
const bodyParser = require("body-parser");
//expres session
app.use(
  session({
    secret: "abc",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
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
