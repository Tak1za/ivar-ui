import { useQuery } from '@tanstack/react-query';
import { UserService } from './user.service';

export const useGetFriends = (userA?: string | null) => {
  const userService = new UserService();
  return useQuery({
    queryKey: ['friends', userA],
    queryFn: () => userService.getFriends(userA),
    enabled: !!userA
  });
};
