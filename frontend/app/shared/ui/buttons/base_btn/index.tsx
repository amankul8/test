import React from "react";

type BtnType = {
  text: string;
  handler: () => void;
};

export const BaseBtn: React.FC<BtnType> = ({ text, handler }) => {
  return (
    <button
      onClick={handler}
      className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-300"
    >
      {text}
    </button>
  );
};
