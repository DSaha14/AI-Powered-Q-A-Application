import React, { useState, useEffect } from "react";
import InputBox from "./components/InputBox";
import QuestionList from "./components/QuestionList";
import ResponseDisplay from "./components/ResponseDisplay";


const App = () => {
  const [response, setResponse] = useState("");
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  const BACKEND_URL = "http://127.0.0.1:8000"; // Change this if your backend runs on a different host/port

  const fetchHistory = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/history`);
      if (!res.ok) {
        throw new Error("Failed to fetch history");
      }
      const data = await res.json();
      setHistory(data);
    } catch (err) {
      setError("Unable to fetch history. Please try again later.");
      console.error(err);
    }
  };

  const handleSubmit = async (question) => {
    try {
      if (!question.trim()) {
        setError("Question cannot be empty!");
        return;
      }

      const res = await fetch(`${BACKEND_URL}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch response from server");
      }

      const data = await res.json();
      setResponse(data.answer);
      setError(""); // Clear any previous errors
      fetchHistory(); // Refresh history after getting a new response
    } catch (err) {
      setError("Unable to get a response. Please try again later.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 via-white to-purple-50 flex">
      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-start p-14 space-y-6 w-full">
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 drop-shadow-lg mt-6">
          AI Question-Answer System
        </h1>
        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 drop-shadow-lg mt-6">
          Explore more with your {""}
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500"> Chat Buddy!!!</span>
        </h2>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 font-semibold text-center">
            {error}
          </div>
        )}

        {/* Chat Section */}
        <div className="w-full flex-grow flex flex-col items-center justify-center space-y-6">
          <InputBox onSubmit={handleSubmit} />
          <ResponseDisplay response={response} />
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-1/3 bg-white shadow-lg p-2 max-h-screen overflow-y-auto"><QuestionList history={history} /></div>
    </div>
  );
};

export default App;
