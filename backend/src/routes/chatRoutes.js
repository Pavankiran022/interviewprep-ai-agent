const express = require("express");
const router = express.Router();
const orchestratorAgent = require("../agents/orchestratorAgent");

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    console.log("CHAT INPUT:", message);

    const response = await orchestratorAgent(message);

    res.json({
      success: true,
      reply: response.reply,   // 🔥 ALWAYS STRING
      type: response.type,
    });

  } catch (err) {
    console.error("CHAT ERROR:", err);

    res.status(500).json({
      success: false,
      reply: "Something went wrong in AI system",
    });
  }
});

module.exports = router;