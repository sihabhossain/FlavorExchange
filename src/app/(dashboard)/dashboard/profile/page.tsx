"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Upload, User, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/user.provider";

const ProfilePage = () => {
  const { user } = useUser();

  const handleProfileUpdate = (e: any) => {
    e.preventDefault();
    // Handle profile update logic here
  };

  const toggleFollow = () => {
    // Logic for following/unfollowing
  };

  const handlePremiumSubscription = () => {};

  return (
    <div className="container mx-auto px-6 bg-gray-900 text-white">
      {/* Profile Section */}
      <section className="rounded-lg p-6 shadow-lg border border-gray-700 bg-gray-800">
        <motion.h2
          className="mb-4 text-2xl font-bold text-green-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Profile Information
        </motion.h2>
        <div className="flex items-center">
          <img
            src={user?.profilePhoto}
            alt="Profile"
            className="mr-4 h-24 w-24 rounded-full border-4 border-green-600"
          />
          <form onSubmit={handleProfileUpdate} className="flex-1">
            <div className="mb-2">
              <label className="block text-green-300">Name:</label>
              <Input
                type="text"
                value={user?.name}
                className="focus:outline-none bg-gray-700 text-white placeholder-gray-400"
                placeholder="Enter your name"
              />
            </div>

            <div className="mb-2">
              <label className="block text-green-300">Email:</label>
              <Input
                type="text"
                value={user?.email}
                className="focus:outline-none bg-gray-700 text-white placeholder-gray-400"
                placeholder="Enter your name"
              />
            </div>

            <Button
              type="submit"
              className="mt-4 bg-green-600 hover:bg-green-700 transition duration-200"
            >
              Update Profile
            </Button>
          </form>
        </div>
      </section>

      {/* Social Connectivity */}
      <section className="mt-8 rounded-lg p-6 shadow-lg border border-green-700 bg-gray-800">
        <motion.h2
          className="mb-4 text-2xl font-bold text-green-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Social Connectivity
        </motion.h2>
        <div className="flex items-center justify-between">
          <div className="text-green-300">
            <p>Followers: {user?.followersCount}</p>
            <p>Following: {user?.followingCount}</p>
          </div>
        </div>
      </section>

      {/* Premium Membership Subscription */}
      <section className="mt-8 rounded-lg p-6 shadow-lg border border-green-700 bg-gray-800">
        <motion.h2
          className="mb-4 text-2xl font-bold text-green-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Premium Membership
        </motion.h2>
        {user?.isPremium ? (
          <div className="flex items-center text-green-300">
            <CheckCircle className="mr-2 h-6 w-6 text-green-500" />
            <p>You are a premium member!</p>
          </div>
        ) : (
          <Button
            onClick={handlePremiumSubscription}
            className="mt-4 bg-green-600 hover:bg-green-700 transition duration-200"
          >
            Subscribe to Premium
          </Button>
        )}
      </section>
    </div>
  );
};

export default ProfilePage;
