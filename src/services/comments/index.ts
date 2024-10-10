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
  _id: string,
  commentId: string,
  postData: IComment
) => {
  try {
    const { data } = await axiosInstance.put(
      `/recipe/${_id}/comment/${commentId}`,
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

export const DeleteComment = async (
  _id: string,
  commentId: string,
  userId: string
) => {
  try {
    const { data } = await axiosInstance.delete(
      `/recipe/${_id}/comment/${commentId}`,
      {
        data: { userId }, // Send userId in the body
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
