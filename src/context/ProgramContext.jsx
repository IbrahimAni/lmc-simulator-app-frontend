import React, { createContext, useState, useContext } from "react";
import {getPrograms, saveProgram, updateProgram, deleteProgram } from "../services/ProgramService"; // Import correctly

const ProgramContext = createContext();

export const useProgramContext = () => {
  return useContext(ProgramContext);
};

export const ProgramProvider = ({ children }) => {
  const [programs, setPrograms] = useState([]);
  const [currentProgram, setCurrentProgram] = useState(null);
  const [selectedProgramDetails, setSelectedProgramDetails] = useState([]);

  const fetchPrograms = async () => {
    const programs = await getPrograms();
    setPrograms(programs);
  };

  const saveCurrentProgram = async () => {
    const program = await saveProgram(currentProgram);
    setPrograms([...programs, program]);
  };

  const updateCurrentProgram = async () => {
    const program = await updateProgram(currentProgram);
    setPrograms(programs.map((p) => (p.id === program.id ? program : p)));
  };

  const removeCurrentProgram = async () => {
    await deleteProgram(currentProgram.id);
    setPrograms(programs.filter((p) => p.id !== currentProgram.id));
    setCurrentProgram(null);
  };

  return (
    <ProgramContext.Provider
      value={{
        programs,
        fetchPrograms,
        currentProgram,
        setCurrentProgram,
        saveCurrentProgram,
        updateCurrentProgram,
        removeCurrentProgram,
        selectedProgramDetails,
        setSelectedProgramDetails
      }}
    >
      {children}
    </ProgramContext.Provider>
  );  
};
