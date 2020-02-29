import React from "react";

interface ButtonProps {
  onClick: (value: number) => any;
  text: string;
  value: number;
}

export const Button: React.FC<ButtonProps> = ({ onClick, text, value }) => {
  return (
    <button
      className="transition duration-100 ease-in-out bg-indigo-500 hover:bg-indigo-700 text-white font-bold text-left py-2 md:py-4 px-4 md:px-8 my-1 md:my-2 rounded w-full"
      onClick={() => onClick(value)}
    >
      {text}
    </button>
  );
};
