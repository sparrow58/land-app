import React from "react";
interface Props {
  text: string;
  disabled?: boolean;
  fullWidth?: boolean;
}
const SubmitButton = ({ text, disabled = false, fullWidth = false }: Props) => {
  return (
    <button
      disabled={disabled}
      className={`btn w-32 text-xl bg-blue-600 hover:bg-blue-700  font-medium text-white my-2 p-2 disabled:opacity-50 ${
        fullWidth && "w-full"
      } `}
      type="submit"
    >
      {text}
    </button>
  );
};

export default SubmitButton;
