import React, { useState, useEffect, useRef } from "react";
import "./Editor.css"; // Import the CSS file
import { VALID_CODE_MEANINGS, VALID_MNEMONICS } from "../data/valid_mnemonics";
import {
  handleInputChange,
  handleKeyDown,
  handleGlobalKeyDown,
  initialRows,
} from "../functions/editorUtils";
import { useProgContext } from "../context/ProgContext";

const Editor = () => {
  const { selectedProgram, loadSelectedProgram } = useProgContext();
  const [rows, setRows] = useState(initialRows);
  const [showError, setShowError] = useState(false);
  const [showCodes, setShowCodes] = useState(false);
  const [invalidCodes, setInvalidCodes] = useState([]);
  const tableRef = useRef(null);

  // console.log(selectedProgram);

  useEffect(() => {
    const globalKeyDownHandler = (event) =>
      handleGlobalKeyDown(event, tableRef, setRows);

    document.addEventListener("keydown", globalKeyDownHandler);
    return () => {
      document.removeEventListener("keydown", globalKeyDownHandler);
    };
  }, []);

  useEffect(() => {
    if (selectedProgram && selectedProgram.instructions) {
      const loadedRows = selectedProgram.instructions.map((instruction) => [
        instruction.label || "",
        instruction.mnemonic || "",
        instruction.value || "",
      ]);
      setRows(loadedRows);
    }
  }, [selectedProgram]);

  const handleClearClick = () => {
    setRows(initialRows);
  };

  const validateCode = (parsedCode) => {
    const invalidCodes = parsedCode
      .map((line, index) => ({
        ...line,
        line: index + 1,
      }))
      .filter((line) => line.mnemonic && !VALID_MNEMONICS.includes(line.mnemonic));

    setInvalidCodes(invalidCodes);
    return invalidCodes.length === 0;
  };

  const handleLoadProgram = () => {
    const payload = {
      name: selectedProgram ? selectedProgram.name : "Default Program Name",
      instructions: rows.map(([label, mnemonic, value]) => ({
        label,
        mnemonic,
        value,
      })),
    };

    if (!validateCode(payload.instructions)) {
      setShowError(true);
      return;
    }

    loadSelectedProgram(payload);
    console.log(payload);
  };

  const closeError = () => {
    setShowError(false);
  };

  const viewCodes = () => {
    setShowCodes(true);
  };

  const closeCodes = () => {
    setShowCodes(false);
  };

  return (
    <div
      className="relative bg-gray-100 p-4 rounded shadow-md h-full flex flex-col"
      data-qa="code-editor-container"
    >
      {showError && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10 font-mono">
          <div className="bg-white p-4 rounded shadow-md text-left max-w-full max-h-full overflow-auto text-sm">
            <h2 className="font-bold mb-4">LMC Assembly Code Error</h2>
            <p className="mb-4">
              The following LMC Assembly codes are incorrect:
            </p>
            <ul className="mb-4">
              {invalidCodes.map((code, index) => (
                <li key={index} className="text-sm font-mono">
                  Line {code.line}: {code.mnemonic}
                </li>
              ))}
            </ul>
            <div className="flex space-x-2">
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-mono py-1 px-2 rounded"
                onClick={closeError}
              >
                Close
              </button>
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white font-mono py-1 px-2 rounded"
                onClick={viewCodes}
              >
                View Codes
              </button>
            </div>
          </div>
        </div>
      )}
      {showCodes && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10 font-mono">
          <div className="bg-white p-4 rounded shadow-md text-left max-w-full max-h-full overflow-auto font-mono text-sm">
            <h2 className="font-bold mb-4">LMC Assembly Codes</h2>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Mnemonic</th>
                  <th className="py-2 px-4 border-b">Meaning</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(VALID_CODE_MEANINGS).map(
                  ([mnemonic, meaning], index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b text-sm font-mono">
                        {mnemonic}
                      </td>
                      <td className="py-2 px-4 border-b text-sm font-mono">
                        {meaning}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
            <div className="flex space-x-2 mt-2">
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-mono py-1 px-2 rounded"
                onClick={closeCodes}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-between items-center mb-2">
        <h2
          className="text-lg font-semibold font-mono flex-grow"
          data-qa="code-editor-title"
        >
          Assembly Language Code
        </h2>
        <div className="flex space-x-2">
          <button
            className="flex items-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-1 px-3 rounded text-xs"
            data-qa="load-button"
            onClick={handleLoadProgram}
          >
            <i className="bx bx-upload mr-1"></i>
            Load
          </button>
          <button
            className="flex items-center bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded text-xs"
            data-qa="clear-button"
            onClick={handleClearClick}
          >
            <i className="bx bx-trash mr-1"></i>
            Clear
          </button>
        </div>
      </div>
      <div
        className="editor-container flex-grow h-full bg-white overflow-auto"
        data-qa="editor-container"
      >
        <div className="line-numbers" data-qa="line-numbers">
          {rows.map((_, index) => (
            <div key={index}>{index + 1}</div>
          ))}
        </div>
        <div ref={tableRef}>
          <table className="code-editor">
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, colIndex) => (
                    <td key={colIndex} className={`col-${colIndex + 1}`}>
                      <input
                        id={`cell-${rowIndex}-${colIndex}`}
                        value={cell}
                        onChange={(e) =>
                          handleInputChange(
                            rows,
                            rowIndex,
                            colIndex,
                            e,
                            setRows
                          )
                        }
                        onKeyDown={(e) =>
                          handleKeyDown(
                            rows,
                            rowIndex,
                            colIndex,
                            e,
                            setRows,
                            tableRef
                          )
                        }
                        className="cell-input"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Editor;
 