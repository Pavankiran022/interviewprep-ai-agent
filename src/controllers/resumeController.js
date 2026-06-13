const resumeService = require("../service/resumeService");

const analyzeResume = (req, res) => {

    try {

        const { resume } = req.body;

        if (!resume) {
            return res.status(400).json({
                success: false,
                message: "Resume is required"
            });
        }

        const skills = resumeService.analyzeResume(resume);

        return res.status(200).json({
            success: true,
            skills
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    analyzeResume
};