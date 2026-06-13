const resumeAgent = require("./resumeAgent");
const skillGapAgent = require("./skillgapagent");
const interviewAgent = require("./interviewAgent");
const routerAgent = require("./routerAgent");
const roadmapAgent = require("./roadmapAgent");

async function orchestratorAgent(userInput) {
  const category = await routerAgent(userInput);

  console.log("AI Router Decision:", category);

  let result;

  switch (category) {
    case "resume":
      result = await resumeAgent.analyzeResume(userInput);
      break;

    case "skill-gap":
      result = await skillGapAgent.analyzeSkillGap([]);
      break;

    case "roadmap":
      result = await roadmapAgent(userInput);
      break;

    default:
      result = await interviewAgent(userInput);
      break;
  }

  return {
    type: category,
    reply: normalizeResult(result),
  };
}

/* 🔥 SAFE NORMALIZER */
function normalizeResult(data) {
  if (!data) return "No response from AI";

  if (typeof data === "string") return data;

  if (data.reply) return data.reply;

  if (data.result) return data.result;

  return JSON.stringify(data, null, 2);
}

module.exports = orchestratorAgent;