const express = require("express");
const multer = require("multer");

const router = express.Router();
const passport = require("passport");
const ConvertToWord = require("../controllers/Converter");
const {
  postJob,
  GetJob,
  abc,
  CheckisAuthenticated,
  PostedJob,
  redirectToHome,
} = require("../controllers/post");
const { GetImage, UserImage } = require("../controllers/UserImage");
const {
  getDataIndex,
  GetSearch,
} = require("../controllers/uploadIndexToElastic");
// const { isAuthenticated, isganduOn } = require("../controllers/googleAuth");
//Routes

router.post("/api/job/postjob", CheckisAuthenticated, postJob);
router.get("/getJob", GetJob);
router.get(
  "/postedJob",

  PostedJob
);
// CheckisAuthenticated,
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
//authenticated user can use this route
router.get("/isAuth", redirectToHome);
router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return console.log("notloggedOut");
    } else {
      res.redirect("/");
      console.log("logged out");
    }
  });
});
router.get("/getUser", (req, res) => {
  if (req.user) {
    res.status(200).json({
      user: req.user,
    });
  } else {
    res.json("lund");
  }
});

router.get(
  "/auth/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    // successRedirect: "http://localhost:5173",
  }),
  (req, res) => {
    console.log(req.user.id);
    res.redirect("http://localhost:5173");
  }
);
// router.get("/api/ganduIsOn?", isganduOn);
// router.get("/api/protected", isAuthenticated, (req, res) => {
//   res.send("king kohli bhai u are in protected route");
// });

router.post("/abc", abc);

router.post("/uploads", UserImage);
router.get("/abcd", async (req, res) => {
  const googleId = await req.user.id;
  res.send(googleId);
  console.log(req.user.id);
});

router.get("/get-image", GetImage);
module.exports = router;
router.post("/convertword", ConvertToWord);

//elastic

router.get("/lavde", getDataIndex);
router.get("/search", GetSearch);
