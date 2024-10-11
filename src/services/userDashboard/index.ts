/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import axiosInstance from "@/lib/AxiosInstance";
import { ProfileFormData } from "@/types";

export const GetMyRecipes = async (_id: string) => {
  try {
    const { data } = await axiosInstance.get(`/recipe/my-recipe/${_id}`);
    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const UpdateMyProfile = async (
  _id: string,
  updatedInfo: ProfileFormData
) => {
  try {
    const { data } = await axiosInstance.put(
      `/users/update/${_id}`,
      updatedInfo,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const BlockUser = async (_id: string) => {
  try {
    const { data } = await axiosInstance.put(`/users/block/${_id}`);
    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const DeleteUser = async (_id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/users/delete/${_id}`);
    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
