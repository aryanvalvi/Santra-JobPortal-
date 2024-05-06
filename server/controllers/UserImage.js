const { ImagePost } = require("../models/PostJobSchema");

// controllers/UserImage.js

const multer = require("multer");
const path = require("path");

// Define storage for uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/santra/public/images");
  },
  filename: function (req, file, cb) {
    // const googleId = req.user.googleId;
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Initialize upload middleware
const upload = multer({ storage: storage }).single("image");

// Handle image upload
const UserImage = async (req, res) => {
  const googleId = req.user.id;
  // res.send(googleId);
  upload(req, res, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "No file selected" });
    }
    try {
      if (googleId) {
        res.status(200).json({ message: "File uploaded successfully" });
        const imageName = req.file.filename;
        console.log(imageName);
        await ImagePost.deleteMany({ UserId: googleId });
        await ImagePost.create({
          UserId: googleId,
          userName: req.user.displayName,
          ImageName: imageName,
        });
        console.log(googleId);

        // res.json({ status: "ok" });
      } else {
        console.log("req.user is not there");
      }
    } catch (error) {
      console.log("error while uploding image to the database", error);
      res.json({ status: "not ok" });
    }
  });
};
const GetImage = async (req, res) => {
  console.log(req.user.id);
  const googleId = req.user.id;
  try {
    const image = await ImagePost.find({ UserId: googleId });
    console.log(image.map((e) => e.ImageName));
    if (image) {
      res.status(200).json(image.map((e) => e.ImageName));
    }
  } catch (error) {
    console.log("error while retriving the Image");
    throw error;
  }
};

module.exports = { GetImage, UserImage };
