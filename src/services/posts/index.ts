"use server";

import axiosInstance from "@/lib/AxiosInstance";
import { IRecipe } from "@/types";

export const CreateRecipePost = async (postData: IRecipe) => {
  try {
    const { data } = await axiosInstance.post("/recipe", postData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
};
