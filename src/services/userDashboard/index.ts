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

export const UpdateMyProfile = async (updatedInfo: ProfileFormData) => {
  try {
    const { data } = await axiosInstance.post("/profile", updatedInfo, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
