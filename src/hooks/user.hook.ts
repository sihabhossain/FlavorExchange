import { CreateUser, GetAllUsers, GetSingleUser } from "@/services/users";
import { IUser, UserData } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["GET_USERS"],
    queryFn: () => GetAllUsers(),

    refetchInterval: 1000,
    refetchIntervalInBackground: true,
  });
};

export const useGetSingleUser = (_id: string) => {
  return useQuery({
    queryKey: ["GET_USER"],
    queryFn: () => GetSingleUser(_id),

    refetchInterval: 500,
    refetchIntervalInBackground: true,
  });
};

export const useCreateUser = () => {
  return useMutation<any, Error, UserData>({
    mutationKey: ["CREATE_USER"],
    mutationFn: async (postData) => await CreateUser(postData),

    onSuccess: () => {
      toast.success("User created successfully");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });
};
