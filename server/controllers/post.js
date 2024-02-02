const Jobpost = require("../models/PostJobSchema");
const postJob = async (req, res) => {
  try {
    const {
      TitleJob,
      Address,
      SalaryRange,
      JobType,
      SkillRequired,
      Responsibilities,
      JobDetail,
      SkillRequiredInDetail,
    } = req.body;
    const Added = () => await;
    Jobpost.create({
      TitleJob,
      Address,
      SalaryRange,
      JobType,
      SkillRequired,
      Responsibilities,
      JobDetail,
      SkillRequiredInDetail,
    });
    if (Added) {
      res.status(200).json({ Message: "data is added ", Added });
    }
  } catch (error) {
    res.status(400).json("data is added ");
    console.log(error);
  }
};

module.exports = { postJob };
