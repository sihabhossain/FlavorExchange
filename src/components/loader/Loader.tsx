"use client";

import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center h-screen">
      <div className="loader w-16 h-16 border-8 border-t-8 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
