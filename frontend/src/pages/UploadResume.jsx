import { useState, useRef, useEffect } from "react";
import API from "../services/api";
import jsPDF from "jspdf";

function UploadResume() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);

  const [roadmap, setRoadmap] = useState(null);
  const [roadmapLoading, setRoadmapLoading] = useState(false);

  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages, typing]);

  /* ================= UPLOAD ================= */
  const handleUpload = async () => {
    try {
      if (!file) return alert("Select a file");

      setLoading(true);

      const formData = new FormData();
      formData.append("resume", file);

      const res = await API.post("/api/upload-resume", formData);

      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= CHAT ================= */
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = input;

    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setTyping(true);

    try {
      const res = await API.post("/api/chat", {
        message: userMsg,
      });

      setMessages((prev) => [
        ...prev,
        { role: "bot", text: res.data.reply || "No response" },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Error connecting AI" },
      ]);
    } finally {
      setTyping(false);
    }
  };

  /* ================= ROADMAP ================= */
  const handleRoadmap = async () => {
    if (!result) return alert("Upload resume first");

    try {
      setRoadmapLoading(true);

      const res = await API.post("/api/roadmap", {
        userInput: result?.resumeReview || "Backend Developer",
      });

      setRoadmap(res.data.roadmap || "");
    } catch (err) {
      console.error(err);
      alert("Roadmap failed");
    } finally {
      setRoadmapLoading(false);
    }
  };

  /* ================= PDF ================= */
  const downloadRoadmap = () => {
    if (!roadmap) return alert("No roadmap to download");

    const doc = new jsPDF();

    doc.setFontSize(12);
    doc.text("AI Career Roadmap", 10, 10);

    const lines = doc.splitTextToSize(roadmap, 180);
    doc.text(lines, 10, 20);

    doc.save("roadmap.pdf");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f0f10",
        color: "#fff",
        padding: "20px",
        fontFamily: "Arial",
        overflowX: "hidden",
      }}
    >
      {/* HEADER */}
      <h1 style={{ textAlign: "center", color: "#a855f7" }}>
        AI Career Assistant 🤖
      </h1>

      {/* ================= RESUME ================= */}
      <div
        style={{
          marginTop: "20px",
          background: "#1a1a1d",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
        <h2>📄 Resume Analyzer</h2>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ color: "#fff" }}
        />

        <button
          onClick={handleUpload}
          style={{
            marginLeft: "10px",
            padding: "10px 20px",
            background: "#a855f7",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Upload Resume
        </button>
      </div>

      {loading && <p>Analyzing Resume...</p>}

      {/* ================= RESULTS ================= */}
      {result && (
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              flex: 1,
              minWidth: "300px",
              background: "#1a1a1d",
              padding: "15px",
              borderRadius: "10px",
            }}
          >
            <h3>Resume Review</h3>
            <pre style={{ whiteSpace: "pre-wrap", color: "#ddd" }}>
              {result.resumeReview}
            </pre>
          </div>

          <div
            style={{
              flex: 1,
              minWidth: "300px",
              background: "#1a1a1d",
              padding: "15px",
              borderRadius: "10px",
            }}
          >
            <h3>ATS Review</h3>
            <pre style={{ whiteSpace: "pre-wrap", color: "#ddd" }}>
              {result.atsReview}
            </pre>
          </div>
        </div>
      )}

      {/* ================= ROADMAP ================= */}
      {result && (
        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <button
            onClick={handleRoadmap}
            style={{
              padding: "12px 25px",
              background: "#a855f7",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            🚀 Generate Roadmap
          </button>

          {roadmapLoading && <p>Generating roadmap...</p>}
        </div>
      )}

      {/* ================= ROADMAP ================= */}
      {roadmap && (
        <div
          style={{
            marginTop: "20px",
            background: "#1a1a1d",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <h2 style={{ color: "#a855f7", textAlign: "center" }}>
            📚 Learning Roadmap
          </h2>

          <pre style={{ whiteSpace: "pre-wrap", color: "#ddd" }}>
            {roadmap}
          </pre>

          <div style={{ textAlign: "center", marginTop: "15px" }}>
            <button
              onClick={downloadRoadmap}
              style={{
                padding: "10px 20px",
                background: "#a855f7",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Download PDF
            </button>
          </div>
        </div>
      )}

      {/* ================= CHAT ================= */}
      <div style={{ marginTop: "40px" }}>
        <h2>💬 Career Chat Assistant</h2>

        <div
          ref={chatRef}
          style={{
            background: "#1a1a1d",
            height: "300px",
            overflowY: "auto",
            padding: "10px",
            borderRadius: "12px",
          }}
        >
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                textAlign: m.role === "user" ? "right" : "left",
                margin: "10px 0",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  padding: "10px",
                  borderRadius: "10px",
                  background: m.role === "user" ? "#a855f7" : "#2a2a2e",
                  color: "#fff",
                  maxWidth: "75%",
                  wordBreak: "break-word",
                }}
              >
                {m.text}
              </span>
            </div>
          ))}

          {typing && <p style={{ color: "#aaa" }}>AI is typing...</p>}
        </div>

        <div style={{ display: "flex", marginTop: "10px" }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask career questions..."
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px",
              border: "none",
            }}
          />

          <button
            onClick={sendMessage}
            style={{
              marginLeft: "10px",
              padding: "10px 15px",
              background: "#a855f7",
              color: "white",
              border: "none",
              borderRadius: "8px",
            }}
          >
            Send
          </button>
        </div>
      </div>

      {/* ================= FOOTER (BRANDING ADDED) ================= */}
      <div
        style={{
          marginTop: "50px",
          textAlign: "center",
          color: "#777",
          fontSize: "14px",
        }}
      >
        
        <p>
          Developed by{" "}
          <span style={{ color: "#a855f7", fontWeight: "bold" }}>
            Pavan Kiransai
          </span>{" "}
          🚀
        </p>
      </div>
    </div>
  );
}

export default UploadResume;