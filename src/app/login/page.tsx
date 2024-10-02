"use client";

import React, { useState } from "react";
import { User, Lock, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-lg p-10 shadow-xl">
        <h2 className="text-center text-3xl font-bold text-gray-700">
          {isLogin ? "Login to Your Account" : "Create a New Account"}
        </h2>

        {isLogin ? (
          <form className="space-y-6">
            <div className="flex items-center rounded-md p-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <Input
                type="email"
                placeholder="Email"
                className="ml-3 w-full text-gray-700 focus:outline-green-500 "
              />
            </div>

            <div className="flex items-center rounded-md p-3">
              <Lock className="h-5 w-5 text-gray-400" />
              <Input
                type="password"
                placeholder="Password"
                className="ml-3 w-full text-gray-700 focus:outline-green-500 "
              />
            </div>

            <Button
              type="submit"
              className=" flex w-full items-center justify-center rounded-md  py-3  text-white transition duration-300 focus:outline-none focus:ring-4 focus:ring-gray-300"
            >
              Login
            </Button>
          </form>
        ) : (
          <form className="space-y-6">
            <div className="flex items-center rounded-md p-3">
              <User className="h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Name"
                className="ml-3 w-full text-gray-700 focus:outline-green-500 "
              />
            </div>

            <div className="flex items-center rounded-md p-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <Input
                type="email"
                placeholder="Email"
                className="ml-3 w-full text-gray-700 focus:outline-green-500"
              />
            </div>

            <div className="flex items-center rounded-md p-3">
              <Lock className="h-5 w-5 text-gray-400" />
              <Input
                type="password"
                placeholder="Password"
                className="ml-3 w-full text-gray-700 focus:outline-green-500"
              />
            </div>

            <div className="flex items-center rounded-md p-3">
              <Phone className="h-5 w-5 text-gray-400" />
              <Input
                type="tel"
                placeholder="Phone"
                className="ml-3 w-full text-gray-700 focus:outline-green-500"
              />
            </div>

            <div className="flex items-center rounded-md p-3">
              <MapPin className="h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Address"
                className="ml-3 w-full text-gray-700 focus:outline-green-500"
              />
            </div>

            <Button
              type="submit"
              className="flex w-full items-center justify-center rounded-md  py-3 font-semibold text-white transition duration-300 focus:outline-green-500 "
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
