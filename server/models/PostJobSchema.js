const mongoose = require("mongoose");

const Schma1 = new mongoose.Schema(
  {
    TitleJob: {
      type: String,
      require: true,
      maxlenght: 50,
    },
    Education: {
      type: String,
      require: true,
      maxlenght: 50,
    },
    Shift: {
      type: String,
      require: true,
      maxlenght: 50,
    },
    Benefits: {
      type: String,
      require: true,
      maxlenght: 50,
    },
    CompanyName: {
      type: String,
      require: true,
      maxlenght: 50,
    },
    Address: {
      type: String,
      require: true,
      maxlength: 255,
    },
    minSalary: {
      type: String,
      require: true,
    },
    maxSalary: {
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
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Schema2 = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  UserId: {
    type: String,
    required: true,
  },
  ImageName: {
    type: String,
    required: true,
  },
});

const Jobpost = mongoose.model("JobPostOp", Schma1);
const ImagePost = mongoose.model("ImagePost", Schema2);
module.exports = { Jobpost, ImagePost };
