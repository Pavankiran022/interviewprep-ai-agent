require("dotenv").config();
const Groq = require("groq-sdk");

const client = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

async function generateAIResponse(prompt) {
    try {
        const response = await client.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [
                {
                    role: "system",
                    content: "You are an expert interview preparation AI assistant."
                },
                {
                    role: "user",
                    content: prompt
                }
            ]
        });

        // ✅ CRITICAL FIX (THIS IS THE BUG SOURCE)
        const text = response.choices[0].message.content;

        // 🚫 NEVER SPREAD OR WRAP THIS ANYWHERE ELSE
        return text;

    } catch (error) {
        console.error("GROQ ERROR:", error.message);
        return "AI service error: " + error.message;
    }
}

module.exports = { generateAIResponse };