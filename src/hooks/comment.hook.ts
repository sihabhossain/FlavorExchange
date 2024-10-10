import { DeleteComment, EditComment, PostComment } from "@/services/comments";
import { IComment } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePostComment = () => {
  return useMutation<void, Error, { _id: string; postData: IComment }>({
    mutationKey: ["CREATE_COMMENT"],
    mutationFn: async ({ _id, postData }) => {
      await PostComment(_id, postData);
    },
    onSuccess: () => {
      toast.success("Comment created successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });
};

export const useEditComment = () => {
  return useMutation<
    void,
    Error,
    {
      _id: string;
      commentId: string;
      postData: { updatedComment: string; userId: string };
    }
  >({
    mutationKey: ["EDIT_COMMENT"],
    mutationFn: async ({ _id, commentId, postData }) => {
      await EditComment(_id, commentId, postData);
    },
    onSuccess: () => {
      toast.success("Comment edited successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });
};

export const useDeleteComment = () => {
  return useMutation<
    void,
    Error,
    { recipeId: string; commentId: string; userId: string }
  >({
    mutationKey: ["DELETE_COMMENT"],
    mutationFn: async ({ recipeId, commentId, userId }) => {
      await DeleteComment(recipeId, commentId, userId);
    },
    onSuccess: () => {
      toast.success("Comment deleted successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });
};
