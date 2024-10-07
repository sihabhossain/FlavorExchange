"use server";

import axiosInstance from "@/lib/AxiosInstance";

export const GetAllUsers = async () => {
  try {
    const { data } = await axiosInstance.get("/users");
    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const GetSingleUser = async (_id: string) => {
  try {
    const { data } = await axiosInstance.get(`/users/${_id}`);
    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
