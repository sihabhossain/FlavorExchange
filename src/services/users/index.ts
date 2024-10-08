"use server";

import axiosInstance from "@/lib/AxiosInstance";
import { IUser, UserData } from "@/types";

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

export const CreateUser = async (postData: UserData) => {
  try {
    const { data } = await axiosInstance.post("/users/create-user", postData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
