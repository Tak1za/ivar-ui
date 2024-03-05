import { useQuery } from "@tanstack/react-query";
import { UserService } from "./user.service";

export const useCreateUser = (userId: string, username: string) => {
  const userService = new UserService();
  return useQuery({
    queryKey: ["user", userId, username],
    queryFn: () => userService.createUser(userId, username),
    enabled: !!userId && !!username,
  });
};
