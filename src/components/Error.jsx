import React, { useState } from "react";
import { FiX } from "react-icons/fi";

const Error = ({ message }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  return isOpen ? (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
      onClick={closeModal}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg relative w-11/12 md:w-1/3"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={closeModal}
        >
          <FiX size={24} />
        </button>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Error</h2>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  ) : null;
};

export default Error;
