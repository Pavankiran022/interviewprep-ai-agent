const analyzeResume = (resume) => {

    const knownSkills = [
        "Node.js",
        "Express",
        "MongoDB",
        "MySQL",
        "JavaScript",
        "Python",
        "Docker",
        "Redis",
        "AWS",
        "React",
        "HTML",
        "CSS",
        "Git"
    ];

    const foundSkills = knownSkills.filter(skill =>
        resume?.toLowerCase().includes(skill.toLowerCase())
    );

    return foundSkills;
};

module.exports = {
    analyzeResume
};