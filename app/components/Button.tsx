import React from "react";
interface Props {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}
const Button = ({ text, onClick, disabled = false }: Props) => {
  return (
    <button
      className="rounded-md bg-indigo-500 font-medium text-white my-2 p-2"
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
