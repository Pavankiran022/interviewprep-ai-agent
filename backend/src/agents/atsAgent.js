const { generateAIResponse } = require("../service/aiService");

async function atsAgent(resumeText) {

    const prompt = `
You are an ATS Resume Scanner.

Analyze the resume and provide:

1. ATS Score out of 100
2. Missing Keywords
3. ATS Problems
4. ATS Improvement Suggestions

Resume:

${resumeText}
`;

    const result = await generateAIResponse(prompt);

    return result;
}

module.exports = atsAgent;