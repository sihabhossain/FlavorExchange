"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/contexts/user.provider";
import { useUpdateMyProfile } from "@/hooks/user.dashboard";

const Page = () => {
  const { user } = useUser();
  const { mutate: updateProfile } = useUpdateMyProfile(user?._id || "");

  useEffect(() => {
    if (user) {
      updateProfile({ isPremium: true });
    }
  }, [user, updateProfile]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <motion.div
        className="bg-gray-800 p-8 rounded-lg shadow-lg text-white"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center">
          <CheckCircle className="h-24 w-24 text-green-500 mb-4" />
          <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-lg text-gray-300 mb-4">
            Thank you for your payment. Your transaction has been completed.
          </p>
          <p className="text-gray-400 mb-4">
            You will receive a confirmation email shortly.
          </p>
          <Link
            href={"/dashboard/profile"}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            Go to Dashboard
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Page;
