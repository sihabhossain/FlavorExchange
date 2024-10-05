import { LoginUser, RegisterUser } from "@/services/auth";
import { UserData } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUserRegistration = () => {
  return useMutation<any, Error, UserData>({
    mutationKey: ["USER_REGISTRATION"],
    mutationFn: (userData) => RegisterUser(userData),
    onSuccess: () => {
      toast.success("User registration successful.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUserLogin = () => {
  return useMutation<any, Error, UserData>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: (userData) => LoginUser(userData),
    onSuccess: () => {
      toast.success("User login successful.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
