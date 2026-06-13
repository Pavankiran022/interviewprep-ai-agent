const { generateAIResponse } = require("../service/aiService");

async function interviewAgent(userQuestion) {

    const prompt = `
You are an expert interview coach.

Answer the user's query clearly and professionally.

User Question:
${userQuestion}
`;

    const result = await generateAIResponse(prompt);

    return result;
}

module.exports = interviewAgent;