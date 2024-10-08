"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/user.provider";
import { useGetSingleUser } from "@/hooks/user.hook";
import { useUpdateMyProfile } from "@/hooks/user.dashboard";

const ProfilePage = () => {
  const { user: localUser } = useUser();
  const { data } = useGetSingleUser(localUser?._id || "");
  const user = data?.data;

  const { mutate: updateProfile } = useUpdateMyProfile();

  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Update state when user data is available
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const formData = new FormData(); // Create a new FormData object
    formData.append("name", name); // Append the name to the FormData
    formData.append("email", email); // Append the email to the FormData

    // Check if profilePhoto is selected and append it
    if (profilePhoto) {
      formData.append("profilePhoto", profilePhoto); // Append the profile photo
    }

    updateProfile(formData);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePhoto(file);
    }
  };

  const handlePremiumSubscription = () => {
    // Handle premium subscription logic here
  };

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
            src={user?.profilePhoto || "/default-profile.png"} // Default profile image if user photo is not available
            alt="Profile"
            className="mr-4 h-24 w-24 rounded-full border-4 border-green-600"
          />
          <form onSubmit={handleProfileUpdate} className="flex-1">
            <div className="mb-2">
              <label className="block text-green-300">Name:</label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="focus:outline-none bg-gray-700 text-white placeholder-gray-400"
                placeholder="Enter your name"
              />
            </div>

            <div className="mb-2">
              <label className="block text-green-300">Email:</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="focus:outline-none bg-gray-700 text-white placeholder-gray-400"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-4">
              <label className="block text-green-300">Profile Photo:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2 text-white"
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
            <p>Followers: {user?.followersCount || 0}</p>
            <p>Following: {user?.followingCount || 0}</p>
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
