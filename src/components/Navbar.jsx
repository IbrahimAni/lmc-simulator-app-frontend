import React, { useState } from "react";
import "boxicons/css/boxicons.min.css";
import { NavButton } from "../reuseable-components";
import { useProgContext } from "../context/ProgContext";

const Navbar = () => {
  const { executeProgram, loadedProgram, resetMemory, isRunning, setIsRunning } = useProgContext();

  // const [isRunning, setIsRunning] = useState(false);

  const handleRunProgram = async () => {
    setIsRunning(true);
    try {
      await executeProgram(loadedProgram);
    } catch (error) {
      console.error("Error executing program:", error);
    } finally {
      // setIsRunning(false);
    }
  };

  return (
    <header className="bg-gray-800 p-2 md:p-4 text-white" data-qa="logo">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div
          className="flex items-center mb-2 md:mb-0 font-mono"
          data-qa="header-left"
        >
          <div
            className="w-4 h-4 bg-orange-500 rounded-full mr-2"
            data-qa="logo"
          ></div>
          <h1 className="text-xl font-bold hidden md:block" data-qa="title">
            LMC Simulator
          </h1>
          <h1 className="text-xl font-bold block md:hidden" data-qa="title">
            LMC
          </h1>
        </div>
        <div
          className="flex flex-wrap items-center space-x-2 lg:space-x-4 font-mono"
          data-qa="header-right"
        >
          {/* <NavButton
            iconClass="bx bx-cloud-upload"
            text="Upload"
            dataQa="upload-button"
          /> */}
          <NavButton
            iconClass="bx bx-reset"
            text="Reset"
            dataQa="load-button"
            action={resetMemory}
            
          />
          <NavButton
            iconClass="bx bx-play"
            text="Run"
            dataQa="run-button"
            action={handleRunProgram}
            isRunning={isRunning}
          />
          <i
            className="bx bx-user text-xl md:text-2xl cursor-pointer"
            data-qa="user-icon"
            onClick={() => alert("User icon clicked!")}
          ></i>
          <i
            className="bx bx-cog text-xl md:text-2xl cursor-pointer"
            data-qa="settings-icon"
            onClick={() => alert("Settings icon clicked!")}
          ></i>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
