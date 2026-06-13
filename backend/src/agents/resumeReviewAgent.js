const { generateAIResponse } = require("../service/aiService");

async function resumeReviewAgent(resumeText) {

    const prompt = `
You are an expert Resume Reviewer.

Analyze this resume and provide:

1. Resume Score out of 100
2. Top Strengths
3. Missing Skills
4. Improvement Suggestions

Resume:

${resumeText}

Return the response in a professional format.
`;

    const result = await generateAIResponse(prompt);

    return result;
}

module.exports = resumeReviewAgent;