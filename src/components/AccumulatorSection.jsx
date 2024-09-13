import React, { useState, useEffect } from 'react';
import { useProgContext } from '../context/ProgContext';

const AccumulatorSection = () => {
  const { accumulator } = useProgContext();
  const [result, setResult] = useState(null);

  useEffect(() => {
    setResult(accumulator);
  }, [accumulator]);

  return (
    <div className="bg-gray-100 p-10 rounded shadow-md font-mono flex items-center justify-center" data-qa="accumulator-section">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2" data-qa="accumulator-title">Accumulator</h2>
        <div className="text-6xl font-extrabold text-orange-500" data-qa="accumulator-result">
          {result !== null ? result : <span className="text-gray-400">0</span>}
        </div>
      </div>
    </div>
  );
};

export default AccumulatorSection;
