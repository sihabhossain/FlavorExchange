"use client";

import React from "react";
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <motion.div
        className="bg-gray-800 p-8 rounded-lg shadow-lg text-white"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center">
          <XCircle className="h-24 w-24 text-red-500 mb-4" />
          <h1 className="text-3xl font-bold mb-2">Payment Canceled</h1>
          <p className="text-lg text-gray-300 mb-4">
            We are sorry to hear that your payment was canceled.
          </p>
          <p className="text-gray-400 mb-4">
            If this was a mistake, please try again or contact support if you
            need assistance.
          </p>
          <Link
            href={"/dashboard/profile"}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            Return to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default page;
