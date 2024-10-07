import {
  CreateRecipePost,
  GetAllPosts,
  GetSinglePost,
  UpdateRecipe,
} from "@/services/posts";
import { IRecipe, TUpdateRecipe } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateRecipePost = () => {
  return useMutation<any, Error, IRecipe>({
    mutationKey: ["CREATE_POST"],
    mutationFn: async (postData) => CreateRecipePost(postData),

    onSuccess: () => {
      toast.success("Post created successfully");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });
};

export const useUpdateRecipe = (_id: string) => {
  return useMutation<any, Error, TUpdateRecipe>({
    mutationKey: ["UPDATE_RECIPE"],
    mutationFn: async (updatedData) => UpdateRecipe(_id, updatedData),

    onSuccess: () => {
      toast.success("Recipe updated successfully");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });
};

export const useGetAllPosts = () => {
  return useQuery({
    queryKey: ["GET_ALL_POSTS"],
    queryFn: () => GetAllPosts(),
  });
};

export const useGetSinglePost = (id: string) => {
  return useQuery({
    queryKey: ["GET_SINGLE_POSTS"],
    queryFn: () => GetSinglePost(id),
  });
};
