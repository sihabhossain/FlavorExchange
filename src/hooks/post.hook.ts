import { CreateRecipePost } from "@/services/posts";
import { IRecipe } from "@/types";
import { useMutation } from "@tanstack/react-query";
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
