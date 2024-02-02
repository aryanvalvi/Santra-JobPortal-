const express = require("express");
const router = express.Router();
const { postJob } = require("../controllers/post");
//Routes
router.post("/api/job/postjob", postJob);

module.exports = router;
