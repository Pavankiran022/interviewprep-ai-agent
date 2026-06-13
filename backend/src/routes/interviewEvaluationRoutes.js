// const express = require("express");

// const router = express.Router();

// const interviewEvaluationAgent = require("../agents/interviewEvaluationAgent");

// router.post("/", async (req, res) => {

//     try {

//         const { question, answer } = req.body;

//         const result = await interviewEvaluationAgent(
//             question,
//             answer
//         );

//         res.json({
//             success: true,
//             result
//         });

//     } catch (error) {

//         res.status(500).json({
//             success: false,
//             error: error.message
//         });

//     }

// });

// module.exports = router;