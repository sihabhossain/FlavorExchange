"use client";

import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserProvider from "@/contexts/user.provider";

const queryClient = new QueryClient();

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>{children}</UserProvider>
    </QueryClientProvider>
  );
};
