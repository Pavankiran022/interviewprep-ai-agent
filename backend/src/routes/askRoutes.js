const express = require("express");
const router = express.Router();

const orchestrator = require("../agents/orchestratorAgent");

router.post("/", async (req, res) => {

    try {

        const userInput = req.body.question;

        const response = await orchestrator(userInput);

        res.json({
            success: true,
            input: userInput,
            response
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;