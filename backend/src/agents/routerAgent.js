const { generateAIResponse } = require("../service/aiService");

async function routerAgent(userInput) {
  const prompt = `
You are an AI intent classifier for a CAREER ASSISTANT APP.

Your job is to classify user input into ONE category only.

Available categories:

1. resume → user uploads or asks about resume analysis, ATS, CV review
2. roadmap → user asks learning plan, career path, study plan
3. skill-gap → user asks "what should I learn", missing skills, improvement
4. interview → general career chat, interview questions, job guidance, doubts

RULES:
- Output ONLY one word
- Do NOT explain
- Do NOT add punctuation
- Always choose closest match

User Input:
"${userInput}"

Return category:
`;

  const response = await generateAIResponse(prompt);

  return response.trim().toLowerCase();
}

module.exports = routerAgent;