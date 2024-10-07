import { GetMyRecipes } from "@/services/userDashboard";
import { useQuery } from "@tanstack/react-query";

export const useGetMyRecipes = (_id: string) => {
  return useQuery({
    queryKey: ["GET_MY_RECIPE"],
    queryFn: () => GetMyRecipes(_id),
  });
};
