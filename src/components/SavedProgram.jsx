import React, { useState } from 'react';
import { useProgContext } from '../context/ProgContext';

const SavedProgram = () => {
  const { allProgramList, setSelectedProgramId } = useProgContext();
  const [selectedProgram, setSelectedProgram] = useState('');

  const handleChange = (event) => {
    const programId = event.target.value;
    setSelectedProgram(event.target.value);
    setSelectedProgramId(programId);    
  };

  return (
    <div className="bg-gray-100 p-4 rounded shadow-md text-sm font-mono" data-qa="saved-program-container">
      <h2 className="text-lg font-semibold mb-2" data-qa="saved-program-title">Select Saved Program</h2>
      <select
        className="border p-2 rounded w-full bg-white border-orange-500 focus:border-orange-500 focus:ring focus:ring-orange-500"
        value={selectedProgram}
        onChange={handleChange}
        data-qa="saved-program-dropdown"
      >
        <option value="" disabled>Select a program</option>
        {allProgramList.map((program) => (
          <option key={program._id} value={program._id} data-qa={`program-option-${program.id}`}>
            {program.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SavedProgram;
