import React from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const ConfirmationDialog = ({ isOpen, onClose, onConfirm, message }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white w-96 p-6 rounded-lg shadow-md">
        <p className="text-lg font-semibold">{message}</p>
        <div className="mt-4 flex justify-end space-x-4">
          <button
            onClick={() => {
              onClose();
            }}
            className="px-4 py-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
