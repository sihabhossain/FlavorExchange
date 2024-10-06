import { DownVotePost, UpvotePost } from "@/services/voting";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpvotePost = (_id: string) => {
  return useMutation({
    mutationKey: ["UPVOTE"],
    mutationFn: () => UpvotePost(_id),

    onSuccess: () => {
      toast.success("upvoted successfully");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });
};

export const UseDownVotePost = (_id: string) => {
  return useMutation({
    mutationKey: ["DOWNVOTE"],
    mutationFn: () => DownVotePost(_id),

    onSuccess: () => {
      toast.success("downvoted successfully");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });
};
