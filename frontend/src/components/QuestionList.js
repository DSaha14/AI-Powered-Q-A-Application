import React from "react";

const QuestionList = ({ history }) => {
  return (
    <div className="w-80 bg-white shadow-lg p-4 border-l border-gray-400">
      <h3 className="text-lg font-semibold text-purple-600 mb-4">
        Previous Questions
      </h3>
      <ul className="space-y-3">
        {history.map((item, index) => (
          <li
            key={index}
            className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-200"
          >
            <strong className="text-purple-500">Q:</strong> {item.question}
            <br />
            <strong className="text-gray-700">A:</strong> {item.answer}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;
