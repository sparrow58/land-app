import React from "react";
import { text } from "stream/consumers";
interface Props {
  text: string;
}
const SubmitButton = ({ text }: Props) => {
  return (
    <button
      className="rounded-md bg-indigo-500 font-medium text-white my-2 p-2"
      type="submit"
    >
      {text}
    </button>
  );
};

export default SubmitButton;
