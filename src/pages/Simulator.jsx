import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import {
  AccumulatorSection,
  InputSection,
  LogInformation,
  OutputSection,
  ProgramCounter,
  RAMSection,
  SavedProgram,
  Welcome,
  Editor,
  Error,
} from "../components";

const Simulator = () => {
  const [showWelcome, setShowWelcome] = useState(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    return hasVisited ? false : true;
  });
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (showWelcome) {
      const timer = setTimeout(() => {
        setFadeOut(true);
        const hideTimer = setTimeout(() => {
          setShowWelcome(false);
          localStorage.setItem('hasVisited', 'true');
        }, 1000); // Duration of fade out

        return () => clearTimeout(hideTimer); // Cleanup the timer on component unmount
      }, 4000); // Show for 4 seconds before starting fade out

      return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }
  }, [showWelcome]);

  return (
    <Layout>
      {showWelcome ? (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-800 transition-opacity duration-1000 ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          <Welcome />
        </div>
      ) : (
        <>
          <div className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-1 flex flex-col space-y-4">
              <div className="h-96 overflow-auto">
                <Editor />
              </div>
              <SavedProgram />
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-4">
              <InputSection />
              <ProgramCounter />
              <AccumulatorSection />
              <OutputSection />
            </div>
          </div>
          <div className="container mx-auto p-4">
            <RAMSection />
          </div>
          <div className="container mx-auto p-4">
            <LogInformation />
          </div>
          <Error />
        </>
      )}
    </Layout>
  );
};

export default Simulator;