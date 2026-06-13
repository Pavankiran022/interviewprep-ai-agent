const express = require("express");

const router = express.Router();

const { analyzeResume } = require("../agents/resumeAgent");

router.post("/analyze", async (req, res) => {

    const { resumeText } = req.body;

    const result = await analyzeResume(resumeText);

    res.json(result);

});

module.exports = router;