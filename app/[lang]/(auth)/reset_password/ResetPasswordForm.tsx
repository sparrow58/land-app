import React from "react";

const ResetPasswordForm = () => {
  return (
    <form>
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full px-3">
          <label
            className="block text-gray-800 text-sm font-medium mb-1"
            htmlFor="email"
          >
            Email <span className="text-red-600">*</span>
          </label>
          <input
            id="email"
            type="email"
            className="form-input w-full text-gray-800"
            placeholder="Enter your email address"
            required
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mt-6">
        <div className="w-full px-3">
          <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">
            Send reset link
          </button>
        </div>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
