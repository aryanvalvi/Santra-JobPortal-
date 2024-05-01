const express = require("express");
const multer = require("multer");

const router = express.Router();
const passport = require("passport");
const {
  postJob,
  GetJob,
  abc,
  CheckisAuthenticated,
  PostedJob,
  redirectToHome,
} = require("../controllers/post");
const { UserImgage, upload } = require("../controllers/UserImage");
// const { isAuthenticated, isganduOn } = require("../controllers/googleAuth");
//Routes

router.post("/api/job/postjob", CheckisAuthenticated, postJob);
router.get("/getJob", CheckisAuthenticated, GetJob);
router.get("/postedJob", CheckisAuthenticated, PostedJob);
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

router.post("/uploads", upload.single("file"), (req, res) => {
  res.json({ message: "file uploaded" });
  console.log(req.file);
});
module.exports = router;
