const express = require("express");
const cors = require("cors");

const resumeRoutes = require("./routes/resumeRoutes");

const uploadResumeRoutes = require("./routes/uploadResumeRoutes");

const askRoute = require("./routes/askRoutes");

const roadmapRoutes = require("./routes/roadmapRoutes");

const chatRoutes = require("./routes/chatRoutes");

//const skillGapRoutes = require("./routes/skillGapRoutes");

//const uploadResumeRoute = require("./routes/uploadResumeRoutes");

//const interviewEvaluationRoutes = require("./routes/interviewEvaluationRoutes");

//const interviewSessionRoutes = require("./routes/interviewSessionRoutes");

//const interviewAnswerRoutes = require("./routes/interviewAnswerRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/resume", resumeRoutes);

app.use("/api/upload-resume", uploadResumeRoutes);

app.use("/ask", askRoute);

app.use("/api/roadmap", roadmapRoutes);

app.use("/api/chat", chatRoutes);

//app.use("/api/skill-gap", skillGapRoutes);

//app.use("/api/upload-resume", uploadResumeRoute);

//app.use("/api/interview-evaluate", interviewEvaluationRoutes);

//app.use("/api/interview-session", interviewSessionRoutes);

//app.use("/api/interview-answer", interviewAnswerRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "InterviewPrep AI Agent Running"
    });
});

module.exports = app;