const express = require("express");

const router = express.Router();

const resumeController = require("../controllers/resumeController");

router.post(
    "/analyze-resume",
    resumeController.analyzeResume
);

module.exports = router;