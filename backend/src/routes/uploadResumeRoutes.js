const express = require("express");
const multer = require("multer");
const { extractTextFromPDF } = require("../service/pdfService");
const resumeReviewAgent = require("../agents/resumeReviewAgent");
const atsAgent = require("../agents/atsAgent");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.any(), async (req, res) => {
  try {
    console.log(req.files);

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const file = req.files[0];

    const resumeText = await extractTextFromPDF(file.path);

    const analysis = await resumeReviewAgent(resumeText);

    const atsAnalysis = await atsAgent(resumeText);

    res.json({
      success: true,
      filename: file.filename,
      resumeReview: analysis,
      atsReview: atsAnalysis,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
