const express = require("express");

const app = express();

app.use(express.json());

const resumeRoutes = require("./routers/resumeRouter");

app.use("/api", resumeRoutes);

app.get("/", (req, res) => {
    res.send("InterviewPrep AI Agent Running");
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});