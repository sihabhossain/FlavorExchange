"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const users = [
  {
    _id: "66f980712c492010e0de1658",
    name: "Sihab Hossain",
    role: "USER",
    email: "sihab@gmail.com",
    status: "ACTIVE",
    mobileNumber: "1234567890",
    profilePhoto:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    createdAt: "2024-09-29T16:29:37.122Z",
    isPremium: true, // New property
  },
  // Add more users here...
];

export function UserTable() {
  const [userData, setUserData] = useState(users);

  const handleBlockUnblock = (id: string) => {
    setUserData((prevData) =>
      prevData.map((user) =>
        user._id === id
          ? { ...user, status: user.status === "ACTIVE" ? "BLOCKED" : "ACTIVE" }
          : user
      )
    );
  };

  const handleDeleteUser = (id: string) => {
    setUserData((prevData) => prevData.filter((user) => user._id !== id));
  };

  return (
    <div>
      {/* Table for large screens */}
      <div className="hidden md:block overflow-x-auto">
        <Table className="min-w-full">
          <TableCaption>
            List of registered users with admin controls.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Profile</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Mobile</TableHead>
              <TableHead>Premium</TableHead> {/* New column */}
              <TableHead className="text-right">Registration Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userData.map((user) => (
              <TableRow key={user._id}>
                <TableCell>
                  <img
                    src={user.profilePhoto}
                    alt={`${user.name}'s profile`}
                    className="h-10 w-10 rounded-full"
                  />
                </TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>{user.mobileNumber}</TableCell>
                <TableCell>
                  {user.isPremium ? (
                    <span className="text-green-600">Yes</span>
                  ) : (
                    <span className="text-red-600">No</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-2">
                    <Button
                      variant={
                        user.status === "ACTIVE" ? "destructive" : "default"
                      }
                      onClick={() => handleBlockUnblock(user._id)}
                      className="w-full md:w-auto"
                    >
                      {user.status === "ACTIVE" ? "Block" : "Unblock"}
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteUser(user._id)}
                      className="w-full md:w-auto"
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Cards for mobile view */}
      <div className="md:hidden space-y-4">
        {userData.map((user) => (
          <div
            key={user._id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4  dark:bg-gray-800"
          >
            <div className="flex items-center space-x-4">
              <img
                src={user.profilePhoto}
                alt={`${user.name}'s profile`}
                className="h-12 w-12 rounded-full"
              />
              <div className="text-lg font-semibold">{user.name}</div>
            </div>
            <div className="mt-2">
              <p>
                Email: <span className="font-medium">{user.email}</span>
              </p>
              <p>
                Role: <span className="font-medium">{user.role}</span>
              </p>
              <p>
                Status: <span className="font-medium">{user.status}</span>
              </p>
              <p>
                Mobile: <span className="font-medium">{user.mobileNumber}</span>
              </p>
              <p>
                Premium:{" "}
                <span className="font-medium">
                  {user.isPremium ? "Yes" : "No"}
                </span>
              </p>{" "}
              {/* New line for Premium */}
              <p>
                Registration Date:{" "}
                <span className="font-medium">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </p>
            </div>
            <div className="mt-4 flex space-x-2">
              <Button
                variant={user.status === "ACTIVE" ? "destructive" : "default"}
                onClick={() => handleBlockUnblock(user._id)}
                className="w-full"
              >
                {user.status === "ACTIVE" ? "Block" : "Unblock"}
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDeleteUser(user._id)}
                className="w-full"
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
