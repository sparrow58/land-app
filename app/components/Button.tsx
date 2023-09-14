import React from "react";
interface Props {
  text: string;
  onClick: () => void;
}
const Button = ({ text, onClick }: Props) => {
  return (
    <button
      className="rounded-md bg-indigo-500 font-medium text-white my-2 p-2"
      type="button"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
