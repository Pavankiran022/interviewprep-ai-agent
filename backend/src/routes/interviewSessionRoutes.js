// const express = require("express");
// const router = express.Router();

// const interviewSessionAgent = require("../agents/interviewSessionAgent");
// const sessions = require("../data/interviewSessions");

// router.post("/", async (req, res) => {

//     try {

//         const { topic } = req.body;

//         // 1. Get structured JSON from AI
//         const data = await interviewSessionAgent(topic);

//         // 2. Flatten all questions into one array
//         const questions = [
//             ...data.basic,
//             ...data.medium,
//             ...data.hard
//         ];

//         // 3. Create session
//         const sessionId = Date.now().toString();

//         sessions[sessionId] = {
//             topic,
//             raw: data,              // keep structured format
//             questions,             // full list
//             currentIndex: 0,
//             answers: [],
//             scores: []
//         };

//         // 4. Send first question
//         res.json({
//             success: true,
//             sessionId,
//             question: questions[0],
//             currentIndex: 1,
//             totalQuestions: questions.length
//         });

//     } catch (error) {

//         res.status(500).json({
//             success: false,
//             error: error.message
//         });

//     }
// });

// module.exports = router;