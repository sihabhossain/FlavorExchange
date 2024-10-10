"use client";

import React, { useState } from "react"; // Import useState
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react"; // Importing Loader2 icon
import {
  useFollowUser,
  useGetAllUsers,
  useUnfollowUser,
} from "@/hooks/user.hook";
import { IUser } from "@/types";
import { useUser } from "@/contexts/user.provider";

const UserList = () => {
  const { data } = useGetAllUsers();
  const { user } = useUser();
  const currentUserId = user?._id;
  const users = data?.data;

  const { mutate: followUser } = useFollowUser(currentUserId || "");
  const { mutate: unfollowUser, isPending: isUnfollowPending } =
    useUnfollowUser(currentUserId || "");

  // Create a state to manage loading states for each user
  const [loadingUsers, setLoadingUsers] = useState<{ [key: string]: boolean }>(
    {}
  );

  const handleFollowUser = (following: string) => {
    const data = {
      followingId: following,
    };

    // Set the specific user to loading
    setLoadingUsers((prev) => ({ ...prev, [following]: true }));

    followUser(data, {
      onSuccess: () => {
        // Reset the loading state for the user after success
        setLoadingUsers((prev) => ({ ...prev, [following]: false }));
      },
      onError: () => {
        // Reset the loading state in case of error
        setLoadingUsers((prev) => ({ ...prev, [following]: false }));
      },
    });
  };

  const handleUnfollowUser = (following: string) => {
    const data = {
      followingId: following,
    };

    unfollowUser(data);
  };

  return (
    <aside className="fixed top-20 right-0 h-full w-[350px] mx-4 flex flex-col items-center py-6">
      {/* Users Section */}
      <div className="bg-white rounded-lg shadow-md p-4 w-full">
        <h2 className="text-xl font-bold mb-4">Users</h2>
        {users
          ?.filter((user: IUser) => user._id !== currentUserId) // Exclude current user's profile
          .map((user: IUser) => {
            const isFollowing = user.followers?.includes(currentUserId); // Check if current user is following this user

            return (
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
                  <h2 className="text-lg font-semibold text-gray-800">
                    {user.name}
                  </h2>
                  <p className="text-sm text-gray-500">{user.bio}</p>
                </div>
                <div className="space-y-2">
                  {isFollowing ? (
                    <Button
                      onClick={() => handleUnfollowUser(user._id)}
                      className={`flex items-center justify-center text-white py-2 px-4 rounded w-24 transition-all duration-200 bg-red-500 hover:bg-red-600`}
                      disabled={isUnfollowPending} // Disable button while pending
                    >
                      {isUnfollowPending ? (
                        <Loader2 className="animate-spin w-4 h-4 mr-2" />
                      ) : (
                        "Unfollow"
                      )}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleFollowUser(user._id)}
                      className={`flex items-center justify-center text-white py-2 px-4 rounded w-24 transition-all duration-200 `}
                      disabled={loadingUsers[user._id]} // Disable button if this user is loading
                    >
                      {loadingUsers[user._id] ? ( // Check the loading state for this user
                        <Loader2 className="animate-spin w-4 h-4 mr-2" />
                      ) : (
                        "Follow"
                      )}
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </aside>
  );
};

export default UserList;
