export const VALID_MNEMONICS = [
  "INP",
  "STA",
  "LDA",
  "OUT",
  "ADD",
  "SUB",
  "HLT",
  "DAT",
];

export const VALID_CODE_MEANINGS = {
  INP: "Input a value and store it in the accumulator",
  STA: "Store the value in the accumulator into the given address",
  LDA: "Load the value from the given address into the accumulator",
  OUT: "Output the value from the accumulator",
  ADD: "Add the value at the given address to the accumulator",
  SUB: "Subtract the value at the given address from the accumulator",
  HLT: "Halt the program",
  DAT: "Data value, can be used to define variables",
};
