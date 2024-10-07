"use client";

import React from "react";
import { motion } from "framer-motion";

const WelcomeMessage = ({
  userName,
  avatarUrl,
}: {
  userName: string | undefined;
  avatarUrl?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="lg:p-10 relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6 shadow-lg md:p-8"
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30 blur-xl" />

      <div className="relative z-10 flex flex-col items-center md:flex-row md:items-start">
        {/* Avatar Section */}
        {avatarUrl && (
          <div className="mb-4 flex-shrink-0 md:mb-0 md:mr-6">
            <img
              src={avatarUrl}
              alt="User Avatar"
              className="h-16 w-16 rounded-full border-4 border-white shadow-md"
            />
          </div>
        )}

        {/* Text Section */}
        <div className="text-center md:text-left">
          <h1 className="lg:text-4xl mb-2 text-2xl font-extrabold text-white md:text-3xl">
            Welcome{userName ? `, ${userName}` : ""}!
          </h1>
          <p className="lg:text-xl text-base text-white/90 md:text-lg">
            We are thrilled to have you here. Dive into your dashboard to manage
            your bookings and access personalized content crafted just for you.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomeMessage;
