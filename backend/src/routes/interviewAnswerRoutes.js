// const express = require("express");
// const router = express.Router();

// const sessions = require("../data/interviewSessions");
// const { generateAIResponse } = require("../service/aiService");

// router.post("/", async (req, res) => {

//     try {

//         const { sessionId, answer } = req.body;

//         const session = sessions[sessionId];

//         if (!session) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Session not found"
//             });
//         }

//         const currentQuestion =
//             session.questions[session.currentIndex];

//         // 1. AI Evaluation
//         const prompt = `
// You are an expert interview evaluator.

// Return ONLY valid JSON. No explanation. No markdown.

// Format:
// {
//   "score": number,
//   "feedback": "string"
// }

// Question: ${currentQuestion}
// Answer: ${answer}
// `;

//         const result = await generateAIResponse(prompt);

//         let evaluation;

// try {
//     evaluation = JSON.parse(result);
// } catch (err) {

//     console.log("RAW AI RESPONSE:", result);

//     const cleaned = result
//         .replace(/```json/g, "")
//         .replace(/```/g, "")
//         .trim();

//     evaluation = JSON.parse(cleaned);
// }

//         // 2. Save result
//         session.answers.push({
//             question: currentQuestion,
//             answer,
//             ...evaluation
//         });

//         session.currentIndex++;

//         // 3. Next question
//         const nextQuestion =
//             session.questions[session.currentIndex];

//         // 4. End condition
//         if (!nextQuestion) {
//             return res.json({
//                 success: true,
//                 message: "Interview completed",
//                 session
//             });
//         }

//         res.json({
//             success: true,
//             score: evaluation.score,
//             feedback: evaluation.feedback,
//             nextQuestion,
//             currentIndex: session.currentIndex + 1
//         });

//     } catch (error) {

//         res.status(500).json({
//             success: false,
//             error: error.message
//         });

//     }
// });

// module.exports = router;