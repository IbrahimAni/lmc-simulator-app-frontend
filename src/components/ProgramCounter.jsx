// src/components/ProgramCounter.js
import React, { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useProgContext } from "../context/ProgContext";
import "react-circular-progressbar/dist/styles.css";

const ProgramCounter = () => {
  const { programCounter, maxValue } = useProgContext();
  return (
    <div
      className="flex flex-col items-center bg-gray-100 p-4 rounded shadow-md w-full"
      data-qa="program-counter"
    >
      <h2
        className="text-lg font-semibold mb-2 font-mono"
        data-qa="program-counter-title"
      >
        Program Counter
      </h2>
      <div className="relative flex justify-center items-center w-40 h-40">
        <CircularProgressbar value={programCounter} maxValue={maxValue} minValue={0} text={`${programCounter}`} styles={buildStyles({pathColor: `#f97316`, textColor: '#f97316',})} />;
      </div>
    </div>
  );
};

export default ProgramCounter;
