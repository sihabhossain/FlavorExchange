import {
  BlockUser,
  DeleteUser,
  GetMyRecipes,
  UpdateMyProfile,
} from "@/services/userDashboard";
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

export const useUpdateMyProfile = (_id: string) => {
  return useMutation<any, Error, ProfileFormData>({
    mutationKey: ["UPDATE_PROFILE"],
    mutationFn: async (updatedInfo) => await UpdateMyProfile(_id, updatedInfo),

    onSuccess: () => {
      toast.success("Profile updated successfully");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });
};

export const useBlockUser = () => {
  return useMutation({
    mutationKey: ["BLOCK_USER"],
    mutationFn: async (_id: string) => await BlockUser(_id),

    onSuccess: () => {
      toast.success("User blocked successfully");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });
};

export const useDeleteUser = () => {
  return useMutation({
    mutationKey: ["DELETE_USER"],
    mutationFn: async (_id: string) => await DeleteUser(_id),

    onSuccess: () => {
      toast.success("User deleted successfully");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });
};
