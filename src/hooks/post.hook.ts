import {
  CreateRecipePost,
  DeleteRecipe,
  GetAllPosts,
  GetSinglePost,
  UpdateRecipe,
} from "@/services/posts";
import { IRecipe, TUpdateRecipe } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateRecipePost = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, IRecipe>({
    mutationKey: ["CREATE_POST"],
    mutationFn: async (postData) => CreateRecipePost(postData),

    onSuccess: () => {
      toast.success("Post created successfully");
      // Refetch all posts
      queryClient.refetchQueries({ queryKey: ["GET_ALL_POSTS"] });
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });
};

export const useUpdateRecipe = (_id: string) => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, TUpdateRecipe>({
    mutationKey: ["UPDATE_RECIPE"],
    mutationFn: async (updatedData) => UpdateRecipe(_id, updatedData),

    onSuccess: () => {
      toast.success("Recipe updated successfully");
      // Refetch the relevant posts
      queryClient.refetchQueries({ queryKey: ["GET_ALL_POSTS"] });
      queryClient.refetchQueries({ queryKey: ["GET_SINGLE_POSTS", _id] }); // If necessary
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });
};

export const useDeleteRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["DELETE_RECIPE"],
    mutationFn: async (_id: string) => DeleteRecipe(_id),

    onSuccess: () => {
      toast.success("Recipe deleted successfully");
      // Refetch all posts
      queryClient.refetchQueries({ queryKey: ["GET_ALL_POSTS"] });
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
  });
};

export const useGetSinglePost = (id: string) => {
  return useQuery({
    queryKey: ["GET_SINGLE_POSTS", id], // Ensure the query key is unique for each post
    queryFn: () => GetSinglePost(id),
  });
};
