import React from "react";

interface Props {
  progress: number;
}
const ProgressBar = ({ progress }: Props) => {
  const percentage = progress && progress * 100;

  return (
    <div className="w-full bg-gray-200 rounded-t-full dark:bg-gray-700">
      <div
        className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-t-full"
        style={{
          width: `${percentage}%`,
        }}
      >
        {percentage}%
      </div>
    </div>
  );
};

export default ProgressBar;
