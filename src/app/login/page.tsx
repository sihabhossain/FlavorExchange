"use client";

import React, { useState } from "react";
import { User, Lock, Mail, Phone, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserLogin, useUserRegistration } from "@/hooks/auth.hook";
import { toast } from "sonner";

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobileNumber: "",
    profilePhoto: "",
  });

  // mutations
  const { mutate: resgisterUser, isPending: registerPending } =
    useUserRegistration();
  const { mutate: loginUser, isPending: loginPending } = useUserLogin();

  const toggleForm = () => setIsLogin(!isLogin);

  // Handle input change for both forms
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle login form submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;

    // Perform simple validation (for example purposes)
    if (!email || !password) {
      alert("Please fill in all the fields.");
      return;
    }

    loginUser(formData);
  };

  // Handle signup form submission
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, password, mobileNumber, profilePhoto } = formData;

    // Perform simple validation (for example purposes)
    if (!name || !email || !password || !mobileNumber || !profilePhoto) {
      toast("Please fill in all the fields.");
      return;
    }

    resgisterUser(formData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-lg p-10 shadow-xl">
        <h2 className="text-center text-3xl font-bold text-gray-700">
          {isLogin ? "Login to Your Account" : "Create a New Account"}
        </h2>

        {isLogin ? (
          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="flex items-center rounded-md p-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="ml-3 w-full text-gray-700 focus:outline-green-500 "
              />
            </div>

            <div className="flex items-center rounded-md p-3">
              <Lock className="h-5 w-5 text-gray-400" />
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="ml-3 w-full text-gray-700 focus:outline-green-500 "
              />
            </div>

            <Button
              type="submit"
              className="flex w-full items-center justify-center rounded-md py-3 text-white transition duration-300 focus:outline-none focus:ring-4 focus:ring-gray-300"
            >
              Login
            </Button>
          </form>
        ) : (
          <form className="space-y-6" onSubmit={handleSignUp}>
            <div className="flex items-center rounded-md p-3">
              <User className="h-5 w-5 text-gray-400" />
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="ml-3 w-full text-gray-700 focus:outline-green-500 "
              />
            </div>

            <div className="flex items-center rounded-md p-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="ml-3 w-full text-gray-700 focus:outline-green-500"
              />
            </div>

            <div className="flex items-center rounded-md p-3">
              <Lock className="h-5 w-5 text-gray-400" />
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="ml-3 w-full text-gray-700 focus:outline-green-500"
              />
            </div>

            <div className="flex items-center rounded-md p-3">
              <Phone className="h-5 w-5 text-gray-400" />
              <Input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="Phone"
                className="ml-3 w-full text-gray-700 focus:outline-green-500"
              />
            </div>

            <div className="flex items-center rounded-md p-3">
              <Link className="h-5 w-5 text-gray-400" />
              <Input
                type="url"
                name="profilePhoto"
                value={formData.profilePhoto}
                onChange={handleChange}
                placeholder="Profile URL"
                className="ml-3 w-full text-gray-700 focus:outline-green-500"
              />
            </div>

            <Button
              type="submit"
              className="flex w-full items-center justify-center rounded-md py-3 font-semibold text-white transition duration-300 focus:outline-green-500"
            >
              Sign Up
            </Button>
          </form>
        )}

        <p className="text-center text-gray-500">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="cursor-pointer font-semibold text-green-500 hover:underline"
            onClick={toggleForm}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;