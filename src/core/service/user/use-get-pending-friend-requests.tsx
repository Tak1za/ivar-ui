import { useQuery } from '@tanstack/react-query';
import { UserService } from './user.service';

export const useGetPendingFriendRequests = (userA?: string | null) => {
  const userService = new UserService();
  return useQuery({
    queryKey: ['user', userA],
    queryFn: () => userService.getPendingFriendRequests(userA),
    enabled: false
  });
};
