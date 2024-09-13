// src/services/ProgramService.js
import axios from 'axios';

const API_URL = 'https://lmc-simulator.nw.r.appspot.com/api/programs';
// const API_URL = 'http://localhost:3001/api/programs';

export const getPrograms = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

export const getProgramById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const loadProgram = async (program) => {
  const response = await axios.post(`${API_URL}/load`, program);
  return response.data;
};

export const executeProgramApi = async (program) => {
  const response = await axios.post(`${API_URL}/execute`, program);
  return response.data;
};

export const resumeProgramApi = async (input) => {
  const response = await axios.post(`${API_URL}/execute/resume`, input);
  return response.data;
};

export const clearMemoryApi = async () => {
  const response = await axios.post(`${API_URL}/clear`);
  return response.data;
};

// -----------------------------------------------------

export const saveProgram = async (program) => {
  const response = await axios.post(`${API_URL}`, program);
  return response.data;
};

export const updateProgram = async (program) => {
  const response = await axios.put(`${API_URL}/${program.id}`, program);
  return response.data;
};

export const deleteProgram = async (id) => {
  await axios.delete(`${API_URL}/programs/${id}`);
};
