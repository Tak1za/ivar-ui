import { useQuery } from '@tanstack/react-query';
import { UserService } from './user.service';

export const useSendFriendRequest = (userA?: string | null, userB?: string | null) => {
  const userService = new UserService();
  return useQuery({
    queryKey: ['user', userA, userB],
    queryFn: () => userService.sendFriendRequest(userA, userB),
    enabled: false
  });
};
