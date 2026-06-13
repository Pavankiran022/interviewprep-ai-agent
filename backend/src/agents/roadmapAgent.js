const { generateAIResponse } = require("../service/aiService");

async function roadmapAgent(userInput) {

    const prompt = `
You are an expert career mentor.

Create a detailed learning roadmap based on:

${userInput}

Include:
1. Weekly plan
2. Skills to learn
3. Projects to build
4. Interview preparation
5. Final outcome
`;

    return await generateAIResponse(prompt);
}

module.exports = roadmapAgent;