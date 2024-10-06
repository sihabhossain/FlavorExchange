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
