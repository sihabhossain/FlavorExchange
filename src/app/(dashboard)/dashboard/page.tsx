"use client";

import WelcomeMessage from "@/components/dashboard/Welcome";
import { useUser } from "@/contexts/user.provider";
import { useGetSingleUser } from "@/hooks/user.hook";
import React from "react";

const page = () => {
  const { user: localUser } = useUser();

  const { data } = useGetSingleUser(localUser?._id || "");

  const user = data?.data;

  return (
    <WelcomeMessage avatarUrl={user?.profilePhoto} userName={user?.name} />
  );
};

export default page;
