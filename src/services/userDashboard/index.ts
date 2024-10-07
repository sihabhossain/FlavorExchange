"use server";

import axiosInstance from "@/lib/AxiosInstance";

export const GetMyRecipes = async (_id: string) => {
  try {
    const { data } = await axiosInstance.get(`/recipe/my-recipe/${_id}`);
    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
