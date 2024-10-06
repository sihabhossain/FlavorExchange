"use server";

import axiosInstance from "@/lib/AxiosInstance";

export const UpvotePost = async (_id: string) => {
  try {
    const { data } = await axiosInstance.post(`/recipe/${_id}/upvote`);
    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const DownVotePost = async (_id: string) => {
  try {
    const { data } = await axiosInstance.post(`/recipe/${_id}/downvote`);
    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
