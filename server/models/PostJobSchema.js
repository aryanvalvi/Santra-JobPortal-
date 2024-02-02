const mongoose = require("mongoose");

const Schma1 = new mongoose.Schema({
  TitleJob: {
    type: String,
    require: true,
    maxlenght: 50,
  },
  Address: {
    type: String,
    require: true,
    maxlength: 255,
  },
  SalaryRange: {
    type: String,
    require: true,
  },
  JobType: {
    type: String,
    require: true,
  },
  SkillRequired: {
    type: String,
    require: true,
  },
  Responsibilities: {
    type: String,
    maxlenght: 1000,
    require: true,
  },
  JobDetail: {
    type: String,
    maxlenght: 1000,
    require: true,
  },
  SkillRequiredInDetail: {
    type: String,
    require: true,
  },
});

const Jobpost = mongoose.model("JobPost", Schma1);
module.exports = Jobpost;
