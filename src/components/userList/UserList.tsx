"use client";

import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { useGetAllUsers } from "@/hooks/user.hook";
import { IUser } from "@/types";
import { useUser } from "@/contexts/user.provider";

const UserList = () => {
  const { data } = useGetAllUsers();
  const { user } = useUser();
  const currentUserId = user?._id;
  const users = data?.data;

  return (
    <aside className="fixed top-20 right-0 h-full w-[350px] mx-4 flex flex-col items-center py-6">
      {/* Users Section */}
      <div className="bg-white rounded-lg shadow-md p-4 w-full">
        <h2 className="text-xl font-bold mb-4">Users</h2>
        {users
          ?.filter((user: IUser) => user._id !== currentUserId) // Exclude current user's profile
          .map((user: IUser) => (
            <div
              key={user._id}
              className="flex items-center bg-gray-100 rounded-lg shadow-md w-full px-4 py-3 mb-4 transition-all duration-200 ease-in-out hover:bg-gray-200"
            >
              <Avatar className="w-12 h-12 mr-4">
                <AvatarImage
                  className="w-12 h-12 object-cover rounded-full"
                  src={user?.profilePhoto}
                  alt={user.name}
                />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col flex-grow mr-4">
                {/* Added margin right for spacing */}
                <h2 className="text-lg font-semibold text-gray-800">
                  {user.name}
                </h2>
                <p className="text-sm text-gray-500">{user.name}</p>
              </div>
              <div className="space-y-2">
                {/* Added gap between buttons */}
                <Button className="flex items-center justify-center text-white py-2 px-4 rounded w-24 transition-all duration-200">
                  Follow
                </Button>
              </div>
            </div>
          ))}
      </div>
    </aside>
  );
};

export default UserList;
