// src/components/LogInformation.js
import React, { useState } from 'react';
import { useProgContext } from '../context/ProgContext';

const LogInformation = () => {
  const { logInformations } = useProgContext();

  const [logs, setLogs] = useState([
    { mnemonic: 'LDA', opcode: '500', mailbox: '05', instruction: 'LDA 05', accumulator: '0', programCounter: '01', flags: 'Z', comments: 'Load the value at address 05 into the accumulator' },
    { mnemonic: 'ADD', opcode: '100', mailbox: '10', instruction: 'ADD 10', accumulator: '5', programCounter: '02', flags: '', comments: 'Add the value at address 10 to the accumulator' },
    { mnemonic: 'SUB', opcode: '200', mailbox: '15', instruction: 'SUB 15', accumulator: '10', programCounter: '03', flags: '', comments: 'Subtract the value at address 15 from the accumulator' },
    { mnemonic: 'STA', opcode: '300', mailbox: '20', instruction: 'STA 20', accumulator: '15', programCounter: '04', flags: '', comments: 'Store the value of the accumulator at address 20' },
    { mnemonic: 'BRA', opcode: '600', mailbox: '25', instruction: 'BRA 25', accumulator: '20', programCounter: '05', flags: '', comments: 'Branch to address 25 unconditionally' },
    { mnemonic: 'BRZ', opcode: '700', mailbox: '30', instruction: 'BRZ 30', accumulator: '25', programCounter: '06', flags: 'Z', comments: 'Branch to address 30 if the accumulator is zero' },
    { mnemonic: 'BRP', opcode: '800', mailbox: '35', instruction: 'BRP 35', accumulator: '30', programCounter: '07', flags: '', comments: 'Branch to address 35 if the accumulator is positive' },
    { mnemonic: 'INP', opcode: '901', mailbox: '00', instruction: 'INP', accumulator: '35', programCounter: '08', flags: '', comments: 'Input a value and store it in the accumulator' },
    { mnemonic: 'OUT', opcode: '902', mailbox: '00', instruction: 'OUT', accumulator: '40', programCounter: '09', flags: '', comments: 'Output the value of the accumulator' },
    { mnemonic: 'HLT', opcode: '000', mailbox: '00', instruction: 'HLT', accumulator: '45', programCounter: '10', flags: '', comments: 'Halt the program' },
    // Add more entries as needed
  ]);

  return (
    <div className="bg-gray-100 p-4 rounded shadow-md" data-qa="log-information-container">
      <h2 className="text-lg font-semibold mb-2 font-mono" data-qa="log-information-title">Log Information</h2>
      <div className="border p-2 rounded font-mono overflow-x-auto max-h-full" data-qa="log-details">
        {logInformations && logInformations.length > 0 ? (
          <div className="table-container overflow-y-auto max-h-80">
            <table className="min-w-full divide-y divide-gray-200" data-qa="log-table">
              <thead className="bg-gray-50 sticky top-0" data-qa="log-table-header">
                <tr>
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-orange-500 uppercase tracking-wider" data-qa="log-header-mnemonic">Mnemonic</th>
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-orange-500 uppercase tracking-wider" data-qa="log-header-opcode">Opcode</th>
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-orange-500 uppercase tracking-wider" data-qa="log-header-mailbox">Mailbox</th>
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-orange-500 uppercase tracking-wider" data-qa="log-header-instruction">Instruction</th>
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-orange-500 uppercase tracking-wider" data-qa="log-header-accumulator">Accumulator</th>
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-orange-500 uppercase tracking-wider" data-qa="log-header-programCounter">Program Counter</th>
                  {/* <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-orange-500 uppercase tracking-wider" data-qa="log-header-flags">Flags</th> */}
                  <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-orange-500 uppercase tracking-wider" data-qa="log-header-comments">Comments</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200" data-qa="log-table-body">
                {logInformations.map((log, index) => (
                  <tr key={index} data-qa={`log-entry-${index}`}>
                    <td className="px-4 py-2 text-xs" data-qa={`log-mnemonic-${index}`}>{log.mnemonic}</td>
                    <td className="px-4 py-2 text-xs" data-qa={`log-opcode-${index}`}>{log.opcode}</td>
                    <td className="px-4 py-2 text-xs" data-qa={`log-mailbox-${index}`}>{log.mailbox}</td>
                    <td className="px-4 py-2 text-xs" data-qa={`log-instruction-${index}`}>{log.instruction}</td>
                    <td className="px-4 py-2 text-xs" data-qa={`log-accumulator-${index}`}>{log.accumulator}</td>
                    <td className="px-4 py-2 text-xs" data-qa={`log-programCounter-${index}`}>{log.programCounter}</td>
                    {/* <td className="px-4 py-2 text-xs" data-qa={`log-flags-${index}`}>{log.flags}</td> */}
                    <td className="px-4 py-2 text-xs" data-qa={`log-comments-${index}`}>{log.comments}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className='text-xs' data-qa="log-empty-message">No log details available yet. Enter Assembly Language Code and Click `Load` to display log details</p>
        )}
      </div>
    </div>
  );
};

export default LogInformation;
