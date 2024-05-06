const { Jobpost } = require("../models/PostJobSchema");
const passport = require("passport");

let userIdBc;
const abc = (req, res) => {
  userIdBc = req.user ? req.user.id : null;
  res.send(req.user);
  console.log(userIdBc);
};

//protected route func
function CheckisAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    userIdBc = req.user.id;

    return next();
  } else {
    return res.status(401).json({ messgage: "user is not authenticated" });
  }
}
//redirectToHome
const redirectToHome = (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
    });
    // res.json(true);
  }
};

const postJob = async (req, res) => {
  try {
    const {
      Benefits,
      Shift,
      Education,
      CompanyName,
      TitleJob,
      Address,
      minSalary,
      maxSalary,
      JobType,
      SkillRequired,
      Responsibilities,
      JobDetail,
      SkillRequiredInDetail,
    } = req.body;
    const Added = () => await;
    Jobpost.create({
      Benefits,
      Shift,
      Education,
      CompanyName,
      TitleJob,
      Address,
      minSalary,
      maxSalary,
      JobType,
      SkillRequired,
      Responsibilities,
      JobDetail,
      SkillRequiredInDetail,
      userId: userIdBc,
    });
    if (Added) {
      res.status(200).json({ Message: "data is added ", Added });
      console.log(userIdBc);
    }
  } catch (error) {
    res.status(400).json("data is not added ");
    console.log(error);
  }
};
const PostedJob = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("this is from postedJob", userId);
    const jobs = await Jobpost.find({ userId });
    if (jobs) {
      res.status(200).json(jobs);
    } else {
      res.status(500).json({ message: "Not Found The Data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Not Found The Data", error });
  }
};
const GetJob = async (req, res) => {
  try {
    const data = await Jobpost.find();
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(400).json("data is not found");
    }
  } catch (error) {
    res.status(400).json("error ");
  }
};

module.exports = {
  postJob,
  GetJob,
  abc,
  CheckisAuthenticated,
  PostedJob,
  redirectToHome,
};
