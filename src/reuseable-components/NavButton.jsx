// src/components/NavButton.js
import React from "react";

const NavButton = ({ iconClass, text, dataQa, action, isRunning }) => {
  return (
    <button
      className={`flex items-center ${
        isRunning
          ? "bg-green-500 hover:bg-green-600"
          : "bg-orange-500 hover:bg-orange-600"
      } text-white font-semibold py-1 px-2 md:py-2 md:px-4 rounded text-sm md:text-base`}
      data-qa={dataQa}
      onClick={action}
    >
      <i className={`${iconClass} mr-1 md:mr-2`}></i>
      {text}
    </button>
  );
};

export default NavButton;
