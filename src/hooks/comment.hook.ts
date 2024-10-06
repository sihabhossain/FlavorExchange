import { PostComment } from "@/services/comments";
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
