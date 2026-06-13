async function analyzeResume(resumeText) {

    return {
        score: 75,
        skills: [
            "Node.js",
            "MongoDB",
            "Express.js"
        ],
        missingSkills: [
            "Docker",
            "Azure"
        ],
        recommendation: "Focus on Docker, Azure and system design."
    };

}

module.exports = {
    analyzeResume
};