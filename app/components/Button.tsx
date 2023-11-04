import React from "react";
interface Props {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}
const Button = ({ text, onClick, disabled = false }: Props) => {
  return (
    <button
      className="rounded-md w-32 text-xl  bg-blue-600 hover:bg-blue-700  font-medium text-white my-2 p-2"
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
