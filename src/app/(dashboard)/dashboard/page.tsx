"use client";

import WelcomeMessage from "@/components/dashboard/Welcome";
import { useUser } from "@/contexts/user.provider";
import React from "react";

const page = () => {
  const { user } = useUser();

  return (
    <WelcomeMessage avatarUrl={user?.profilePhoto} userName={user?.name} />
  );
};

export default page;
