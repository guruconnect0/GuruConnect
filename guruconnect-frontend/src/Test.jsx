import { useState } from "react";
import api from "./api";

function Test() {
  const [questions, setQuestions] = useState("");
  const [answers, setAnswers] = useState("");
  const [testId, setTestId] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const startTest = async () => {
    try {
      setError("");
      setLoading(true);

      const res = await api.post("/test/create", {
        field: "MERN Stack Developer",
        experience: "3 years"
      });

      setQuestions(res.data.questions);
      setTestId(res.data._id);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Failed to generate test"
      );
    } finally {
      setLoading(false);
    }
  };

  const submitTest = async () => {
    if (!testId) {
      setError("Test not initialized");
      return;
    }

    try {
      setError("");
      setLoading(true);

      const res = await api.post("/test/submit", {
        testId,
        mentorAnswers: answers
      });

      setResult(res.data.evaluation);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Failed to submit test"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Mentor Skill Test</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!questions && (
        <button onClick={startTest} disabled={loading}>
          {loading ? "Generating Test..." : "Start Test"}
        </button>
      )}

      {questions && (
        <>
          <pre
            style={{
              background: "#f4f4f4",
              padding: "10px",
              maxHeight: "300px",
              overflow: "auto"
            }}
          >
            {questions}
          </pre>

          <textarea
            rows="10"
            cols="60"
            placeholder="Write answers here..."
            value={answers}
            onChange={(e) => setAnswers(e.target.value)}
          />

          <br />
          <button
            onClick={submitTest}
            disabled={loading || !answers.trim()}
          >
            {loading ? "Submitting..." : "Submit Test"}
          </button>
        </>
      )}

      {result && (
        <>
          <h3>Result</h3>
          <pre>{result}</pre>
        </>
      )}
    </div>
  );
}

export default Test;
