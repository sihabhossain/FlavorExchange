import {
  CreateRecipePost,
  DeleteRecipe,
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
    mutationFn: async (postData) => await CreateRecipePost(postData),

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
    mutationFn: async (updatedData) => await UpdateRecipe(_id, updatedData),

    onSuccess: () => {
      toast.success("Recipe updated successfully");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });
};

export const useDeleteRecipe = () => {
  return useMutation({
    mutationKey: ["DELETE_RECIPE"],
    mutationFn: async (_id: string) => await DeleteRecipe(_id),

    onSuccess: () => {
      toast.success("Recipe deleted successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });
};

export const useUnpublishRecipe = () => {
  return useMutation({
    mutationKey: ["UNPUBLISH_RECIPE"],
    mutationFn: async (_id: string) => await DeleteRecipe(_id),

    onSuccess: () => {
      toast.success("Recipe unpublished successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });
};

export const useGetAllPosts = () => {
  return useQuery({
    queryKey: ["GET_ALL_POSTS"],
    queryFn: () => GetAllPosts(),
    refetchInterval: 1000,
    refetchIntervalInBackground: true,
  });
};

export const useGetSinglePost = (id: string) => {
  return useQuery({
    queryKey: ["GET_SINGLE_POSTS", id],
    queryFn: () => GetSinglePost(id),
    refetchInterval: 1000,
    refetchIntervalInBackground: true,
  });
};
