/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import axiosInstance from "@/lib/AxiosInstance";
import { IRating, IRecipe, TUpdateRecipe } from "@/types";

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

export const DeleteRecipe = async (_id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/recipe/${_id}`, {
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

export const RateRecipe = async (_id: string, postData: IRating) => {
  try {
    const { data } = await axiosInstance.post(`/recipe/${_id}/rate`, postData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
