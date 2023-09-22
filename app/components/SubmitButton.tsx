import React from "react";
import { text } from "stream/consumers";
interface Props {
  text: string;
  disabled?: boolean;
}
const SubmitButton = ({ text, disabled = false }: Props) => {
  return (
    <button
      disabled={disabled}
      className="rounded-md w-32 text-xl bg-indigo-500  font-medium text-white my-2 p-2"
      type="submit"
    >
      {text}
    </button>
  );
};

export default SubmitButton;
