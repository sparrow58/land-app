"use client";
import React from "react";
import { ToastContainer } from "react-toastify";

const MainToastContainer = () => {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      // autoClose={false}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
};

export default MainToastContainer;
