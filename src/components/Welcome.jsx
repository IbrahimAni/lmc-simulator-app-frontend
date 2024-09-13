import React from "react";

const Welcome = () => {
  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center text-center p-4 font-mono">
      <h1
        className="text-9xl font-bold text-orange-500 mb-2"
        data-qa="header-title"
      >
        LMC Simulator
      </h1>
      <p className="text-lg text-white" data-qa="header-subtitle">
        Build a Strong Foundation in Computer Architecture
      </p>
    </div>
  );
};

export default Welcome;
