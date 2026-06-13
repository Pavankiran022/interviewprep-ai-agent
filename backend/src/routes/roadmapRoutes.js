const express = require("express");
const roadmapAgent = require("../agents/roadmapAgent");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { userInput } = req.body;

    const result = await roadmapAgent(userInput);

    res.json({
      success: true,
      roadmap: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;