"use server";

import axiosInstance from "@/lib/AxiosInstance";
import { IComment } from "@/types";

export const PostComment = async (_id: string, postData: IComment) => {
  try {
    const { data } = await axiosInstance.post(
      `/recipe/${_id}/comment`,
      postData,
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

export const EditComment = async (
  _id: string, // Recipe ID
  commentId: string, // Comment ID
  postData: { updatedComment: string; userId: string } // Body structure
) => {
  try {
    const { data } = await axiosInstance.put(
      `/recipe/${_id}/comment/${commentId}`, // Correct URL path
      postData, // Body data
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Failed to edit comment");
  }
};

export const DeleteComment = async (
  recipeId: string, // Recipe ID
  commentId: string, // Comment ID
  userId: string // User ID for authorization
) => {
  try {
    const { data } = await axiosInstance.delete(
      `/recipe/${recipeId}/comment/${commentId}`, // Correct URL
      {
        data: { userId }, // Sending userId in the body
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Failed to delete comment");
  }
};
