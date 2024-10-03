"use client";

import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";

const UserList = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      username: "@johndoe",
      imageUrl: "https://github.com/shadcn.png",
    },
    {
      id: 2,
      name: "Jane Smith",
      username: "@janesmith",
      imageUrl: "https://example.com/janesmith.png",
    },
    {
      id: 3,
      name: "Alice Johnson",
      username: "@alicejohnson",
      imageUrl: "https://example.com/alicejohnson.png",
    },
    {
      id: 4,
      name: "Bob Brown",
      username: "@bobbrown",
      imageUrl: "https://example.com/bobbrown.png",
    },
  ]);

  // Follow user function
  const handleFollow = (id) => {
    console.log(`Followed user with ID: ${id}`);
    // Here you would typically send a request to your API to follow the user
  };

  // Remove user function
  const handleRemove = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <aside className="fixed top-20 right-0 h-full w-[350px] mx-4 flex flex-col items-center py-6">
      {/* Users Section */}
      <div className="bg-white rounded-lg shadow-md p-4 w-full">
        <h2 className="text-xl font-bold mb-4">Users</h2>
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center bg-gray-100 rounded-lg shadow-md w-full px-4 py-3 mb-4 transition-all duration-200 ease-in-out hover:bg-gray-200"
          >
            <Avatar className="w-12 h-12 mr-4">
              <AvatarImage src={user.imageUrl} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col flex-grow mr-4">
              {/* Added margin right for spacing */}
              <h2 className="text-lg font-semibold text-gray-800">
                {user.name}
              </h2>
              <p className="text-sm text-gray-500">{user.username}</p>
            </div>
            <div className="space-y-2">
              {/* Added gap between buttons */}
              <Button
                onClick={() => handleFollow(user.id)}
                className="flex items-center justify-center text-white  py-2 px-4 rounded w-24 transition-all duration-200"
              >
                Follow
              </Button>
              <Button
                onClick={() => handleRemove(user.id)}
                className="flex items-center justify-center bg-red-700 hover:bg-red-800   py-2 px-4 rounded w-24 transition-all duration-200"
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default UserList;
