// const { generateAIResponse } = require("../service/aiService");

// async function interviewSessionAgent(topic) {

//     const prompt = `
// You are a senior technical interviewer.

// Generate interview questions for ${topic}.

// STRICT RULES:
// - Return ONLY valid JSON
// - No markdown
// - No explanation

// Format:

// {
//   "basic": ["Q1", "Q2", ... 10 questions],
//   "medium": ["Q1", ... 10 questions],
//   "hard": ["Q1", ... 10 questions]
// }
// `;

//     const result = await generateAIResponse(prompt);

//     let data;

//     try {
//         data = JSON.parse(result);
//     } catch (err) {
//         throw new Error("AI returned invalid JSON. Try again.");
//     }

//     return data;
// }

// module.exports = interviewSessionAgent;