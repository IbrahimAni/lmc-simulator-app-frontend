import React, { useState } from "react";
import { useProgContext } from "../context/ProgContext";

const InputSection = () => {
  const { resumeProgram } = useProgContext();
  const [inputValue, setInputValue] = useState({ input: "" });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;

    if (value === "" || !isNaN(Number(value))) {
      setInputValue({ input: value });
      if (error) setError("");
    } else {
      setError("Please enter a valid number");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    if (!Number.isInteger(Number(inputValue.input))) {
      setError("Input must be an integer.");
      return;
    }

    const parsedValue = parseInt(inputValue.input);
    console.log(typeof parsedValue); 

    try {
      await resumeProgram({ input: parsedValue });
      console.log(`Submitted value: ${parsedValue}`); 
      setInputValue({ input: "" }); 
    } catch (err) {
      console.error("Error calling resumeProgram:", err); 
    }
  };

  return (
    <div
      className="bg-gray-100 p-4 rounded shadow-md font-mono"
      data-qa="input-section"
    >
      <h2 className="text-lg font-semibold mb-2" data-qa="input-section-title">
        Input
      </h2>
      <div className="flex flex-col space-y-4 text-sm">
        {error && (
          <div className="text-red-500" data-qa="error-message">
            {error}
          </div>
        )}
        <input
          type="text"
          className="border p-2 rounded"
          placeholder="Enter input here..."
          value={inputValue.input}
          onChange={handleInputChange}
          data-qa="input-field"
        />
        <button
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded"
          onClick={handleSubmit}
          data-qa="submit-button"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default InputSection;
