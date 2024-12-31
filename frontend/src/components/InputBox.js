import React, { useState } from "react";

const InputBox = ({ onSubmit }) => {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (question.trim()) {
      setLoading(true); // Set loading to true when submitting
      await onSubmit(question);
      setLoading(false); // Set loading back to false after the response
      setQuestion("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl flex items-center space-x-4"
    >
      <input
        type="text"
        placeholder="Ask your question here..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="flex-grow p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-200"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 transition duration-200 flex items-center justify-center"
        disabled={loading} // Disable the button while loading
      >
        {loading ? (
          <svg
            className="w-5 h-5 text-white animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4zm2 5.291A7.962 7.962 0 014 12h8v8a8 8 0 01-6-2.709z"
            ></path>
          </svg>
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
};

export default InputBox;
