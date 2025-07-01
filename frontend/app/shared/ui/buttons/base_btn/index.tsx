import React from "react";

type BtnType = {
  text: string;
  handler: () => void;
};

export const BaseBtn: React.FC<BtnType> = ({ text, handler }) => {
  return (
    <button
      onClick={handler}
      className="bg-white cursor-pointer text-dark font-semibold py-1 px-2 rounded-lg shadow transition duration-300"
    >
      {text}
    </button>
  );
};
