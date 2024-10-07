import { GetAllUsers, GetSingleUser } from "@/services/users";
import { useQuery } from "@tanstack/react-query";

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["GET_USERS"],
    queryFn: () => GetAllUsers(),
  });
};

export const useGetSingleUser = (_id: string) => {
  return useQuery({
    queryKey: ["GET_USER"],
    queryFn: () => GetSingleUser(_id),
  });
};
