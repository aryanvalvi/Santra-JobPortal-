const mammoth = require("mammoth");
const fs = require("fs");
const ConvertToWord = (req, res) => {
  const { htmlContent } = req.body;

  mammoth
    .convertToHtml({ array: htmlContent })
    .then((result) => {
      const filePath = "./converted.docx";
      fs.writeFileSync(filePath, result.value);
      res.download(filePath, "converted.docx", () => {
        fs.unlinkSync(filePath);
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error in Word document conversion");
    });
};
module.exports = ConvertToWord;
