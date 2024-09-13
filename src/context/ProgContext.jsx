import { useState, useContext, createContext, useEffect } from "react";
import {
  getPrograms,
  getProgramById,
  loadProgram,
  executeProgramApi,
  resumeProgramApi,
  clearMemoryApi,
} from "../services/ProgramService";

const ProgContext = createContext();

export const useProgContext = () => {
  return useContext(ProgContext);
};

export const ProgProvider = ({ children }) => {
  const [allProgramList, setAllProgramList] = useState([]);
  const [selectedProgramId, setSelectedProgramId] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [loadedProgram, setLoadedProgram] = useState([]);
  const [logInformations, setLogInformations] = useState([]);
  const [outputs, setOutputs] = useState([]);
  const [accumulator, setAccumulator] = useState(0);
  const [error, setError] = useState(null);
  const [programCounter, setProgramCounter] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [operation, setOperation] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  // this useEffect will run only once when the component is mounted
  useEffect(() => {
    const fetchAllPrograms = async () => {
      const programs = await getPrograms();
      setAllProgramList(programs);
    };

    fetchAllPrograms();
  }, []);

  // this useEffect will run only when selectedProgramId changes
  useEffect(() => {
    const fetchSelectedProgram = async () => {
      if (selectedProgramId) {
        const program = await getProgramById(selectedProgramId);
        setSelectedProgram(program);
      }
    };

    fetchSelectedProgram();
  }, [selectedProgramId]);

  //Load a program
  const loadSelectedProgram = async (program) => {
    try {
      // Clear the memory before loading a new program
      await clearMemoryApi();

      const loadedProgram = await loadProgram(program);
      setLoadedProgram(loadedProgram.memory);
      setLogInformations(loadedProgram.logInformation);
      console.log(loadedProgram);
      // console.log(loadedProgram.memory);
    } catch (error) {
      console.error("Error loading program:", error);
    }
  };

  // Function to execute the program
  const executeProgram = async (program) => {
    setError(null);
    try {
      if (!loadedProgram || Object.keys(loadedProgram).length === 0) {
        setError("Load program before executing");
        console.log("Load program before executing");
        return;
      }
      // Execute the program
      const executedProgram = await executeProgramApi(program);
      console.log(executedProgram);
      setOutputs(executedProgram.output);
      setAccumulator(executedProgram.accumulator);
      setLoadedProgram(executedProgram.memory);
      console.log(executedProgram.memory);
      console.log(loadedProgram);
      setLogInformations(executedProgram.logInformation);
      setOperation(executedProgram.operation);
      // setLoadedProgram((prevProgram) => [...prevProgram, ...executedProgram.memory]);
      // setLogInformations((prevLogs) => [...prevLogs, ...executedProgram.logInformation]);
      setProgramCounter(executedProgram.programCounter);
      setMaxValue(executedProgram.logInformation.length);
    } catch (error) {
      console.error("Error executing program:", error);
    }
  };

  const resumeProgram = async (input) => {
    try {
      const resumedProgram = await resumeProgramApi(input);
      console.log('Resumed Program:', resumedProgram);

      setLoadedProgram(resumedProgram.memory);
      setLogInformations(resumedProgram.logInformation);
      setOutputs(resumedProgram.output);
      setAccumulator(resumedProgram.accumulator);
      setProgramCounter(resumedProgram.programCounter);
      setOperation(resumedProgram.operation);
    } catch (error) {
      console.error("Error resuming program:", error);
    }
  };

  const resetMemory = async () => {
    setLoadedProgram(null);
    setLogInformations([]);
    setOutputs([]);
    setAccumulator(0);
    setProgramCounter(0);

    await clearMemoryApi();
  }

  return (
    <ProgContext.Provider
      value={{
        // fetchAllPrograms, //func to feact all programs
        allProgramList, // all programs details
        // fetchProgramById, // func to fetch program by id
        selectedProgram, // current program details
        setSelectedProgramId,
        loadSelectedProgram, // func to load a program
        loadedProgram, // loaded program details
        logInformations, // log information
        error, // error message
        outputs, // output
        executeProgram, // func to execute the program
        resumeProgram, // func to resume the program
        resetMemory, // func to reset the memory
        accumulator, // accumulator value
        programCounter, // program counter
        maxValue, // max value
        operation, // operation
        isRunning, 
        setIsRunning,
      }}
    >
      {children}
    </ProgContext.Provider>
  );
};
