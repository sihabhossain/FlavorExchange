import { GetMyRecipes, UpdateMyProfile } from "@/services/userDashboard";
import { ProfileFormData } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetMyRecipes = (_id: string) => {
  return useQuery({
    queryKey: ["GET_MY_RECIPE"],
    queryFn: () => GetMyRecipes(_id),
    refetchInterval: 1000,
    refetchIntervalInBackground: true,
  });
};

export const useUpdateMyProfile = () => {
  return useMutation<any, Error, ProfileFormData>({
    mutationKey: ["UPDATE_PROFILE"],
    mutationFn: async (updatedInfo) => await UpdateMyProfile(updatedInfo),

    onSuccess: () => {
      toast.success("Profile updated successfully");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });
};
