import React, { useState } from 'react';
import { useProgContext } from "../context/ProgContext";

const OutputSection = () => {
  const { outputs } = useProgContext();

  return (
    <div className="bg-gray-100 p-4 rounded shadow-md font-mono" data-qa="output-section">
      <h2 className="text-lg font-semibold mb-2" data-qa="output-section-title">Output</h2>
      {outputs.length > 0 ? (
        <div className="flex flex-wrap justify-center space-x-2">
          {outputs.map((output, index) => (
            <div
              key={index}
              className="border-2 border-orange-500 text-orange-500 text-sm font-mono p-2 rounded flex items-center justify-center w-12 h-12 mb-2"
              data-qa={`output-value-${index}`}
            >
              {output}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-400 text-center mt-4" data-qa="no-output-placeholder">
          No outputs yet.
        </div>
      )}
    </div>
  );
};

export default OutputSection;
