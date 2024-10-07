"use server";

import axiosInstance from "@/lib/AxiosInstance";
import { IRecipe, TUpdateRecipe } from "@/types";

export const CreateRecipePost = async (postData: IRecipe) => {
  try {
    const { data } = await axiosInstance.post("/recipe", postData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const UpdateRecipe = async (_id: string, updatedData: TUpdateRecipe) => {
  try {
    const { data } = await axiosInstance.put(`/recipe/${_id}`, updatedData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const GetAllPosts = async () => {
  try {
    const { data } = await axiosInstance.get("/recipe");
    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const GetSinglePost = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/recipe/${id}`);
    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
