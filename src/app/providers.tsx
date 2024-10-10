"use client";

import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserProvider from "@/contexts/user.provider";
import { SearchProvider } from "@/contexts/search.provider";

const queryClient = new QueryClient();

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <SearchProvider>{children}</SearchProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};
