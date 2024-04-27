const passport = require("passport");
const googleLogin = passport.authenticate("google", {
  scope: ["profile", "email"],
});
const googleCallback = passport.authenticate("google", {
  // successRedirect: "http://localhost:5173",
  failureRedirect: "/",
});
const googleCallback2 = (req, res) => {
  const userdata = req.user;
  res.json("user data is", userdata);
  console.log(userdata);
  // res.redirect("http://localhost:5173/");
};

const getUser = (req, res) => {
  // console.log(req.user);
  res.json(req.user);
};
//check that gandu is still on?
const isganduOn = (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ authenticate: true, user: req.user });
  } else {
    res.status(401).json({ authenticate: false, user: null });
  }
};

//protected route func
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/lund le le");
  }
};

//protected route

module.exports = {
  googleLogin,
  googleCallback,
  googleCallback2,
  isAuthenticated,
  isganduOn,
  getUser,
};
