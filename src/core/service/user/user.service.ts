import { CreateUserRequest } from '@/core/models/create-user.interface';
import { FriendRequest } from '@/core/models/get-friend-request.interface';
import { SendFriendRequest } from '@/core/models/send-friend-request.interface';
import { updateFriendRequest } from '@/core/models/update-friend-request.interface';

export class UserService {
  createUser = async ({ id, username }: CreateUserRequest) => {
    try {
      return await fetch(`${import.meta.env.VITE_SERVICE_URL}/api/v1/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, username })
      });
    } catch (e) {
      return console.error(e);
    }
  };

  sendFriendRequest = async ({ userA, userB }: SendFriendRequest) => {
    try {
      return await fetch(`${import.meta.env.VITE_SERVICE_URL}/api/v1/friends`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userA: userA, userB: userB })
      });
    } catch (e) {
      return console.error(e);
    }
  };

  getPendingFriendRequests = async (
    userA?: string | null
  ): Promise<{ data: FriendRequest[] } | void> => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVICE_URL}/api/v1/friends/${userA}`, {
        method: 'GET'
      });
      return res.json();
    } catch (e) {
      return console.error(e);
    }
  };

  updateFriendRequest = async ({ id, accept }: updateFriendRequest) => {
    try {
      return await fetch(`${import.meta.env.VITE_SERVICE_URL}/api/v1/friends`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id, status: accept ? 1 : 2 })
      });
    } catch (e) {
      return console.error(e);
    }
  };
}
