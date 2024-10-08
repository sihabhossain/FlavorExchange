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
import { useGetAllUsers } from "@/hooks/user.hook";
import { IUser } from "@/types";
import { useUser } from "@/contexts/user.provider";
import { useBlockUser, useDeleteUser } from "@/hooks/user.dashboard";
import { CreateUserModal } from "../modals/CreateUserModal";

export function UserTable() {
  const { data } = useGetAllUsers();
  const { user } = useUser();
  const currentUserId = user?._id;
  const users = data?.data || [];

  // Block user API
  const { mutate: blockUser } = useBlockUser();
  // Delete user API
  const { mutate: deleteUser } = useDeleteUser();

  const handleBlockUnblock = (id: string) => {
    // Logic for blocking or unblocking a user
    blockUser(id);
  };

  const handleDeleteUser = (id: string) => {
    // Logic for deleting a user
    deleteUser(id);
  };

  // Filter out the current user from the list
  const filteredUsers = users.filter(
    (user: IUser) => user._id !== currentUserId
  );

  return (
    <div>
      {/* Create User Button */}
      <div className="mb-4">
        <CreateUserModal />
      </div>

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
              <TableHead>Premium</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user: IUser) => (
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

                <TableCell>
                  <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-2">
                    {user.isBlocked ? (
                      <span className="text-red-600 font-medium">Blocked</span> // Show "Blocked" text if the user is blocked
                    ) : (
                      <Button
                        variant={
                          user.status === "ACTIVE" ? "destructive" : "default"
                        }
                        onClick={() => handleBlockUnblock(user._id)}
                        className="w-full md:w-auto"
                      >
                        {user.status === "ACTIVE" ? "Block" : "Unblock"}
                      </Button>
                    )}
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
        {filteredUsers.map((user: IUser) => (
          <div
            key={user._id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 dark:bg-gray-800"
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
              </p>
            </div>
            <div className="mt-4 flex space-x-2">
              {user.isBlocked ? (
                <span className="text-red-600 font-medium">Blocked</span> // Show "Blocked" text if the user is blocked
              ) : (
                <Button
                  variant={user.status === "ACTIVE" ? "destructive" : "default"}
                  onClick={() => handleBlockUnblock(user._id)}
                  className="w-full"
                >
                  {user.status === "ACTIVE" ? "Block" : "Unblock"}
                </Button>
              )}
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
