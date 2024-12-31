import React from "react";

const ResponseDisplay = ({ response }) => {
  return (
    <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg border-t-4 border-purple-500">
      <h3 className="text-2xl font-semibold text-purple-600">Your Answer:</h3>
      <p className="mt-2 text-gray-700">
        {response || "Your answer will appear here."}
      </p>
    </div>
  );
};

export default ResponseDisplay;
