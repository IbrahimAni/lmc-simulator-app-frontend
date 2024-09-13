import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Simulator } from "./pages";
// import { ProgramProvider } from "./context/ProgramContext";

const App = () => {
  return (
    <>
      {/* <ProgramProvider> */}
        <Router>
          <Routes>
            <Route path="/" element={<Simulator />} />
          </Routes>
        </Router>
      {/* </ProgramProvider> */}
    </>
  );
};

export default App;
