export class UserService {
  createUser = async (id: string, username: string) => {
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

  sendFriendRequest = async (userA?: string | null, userB?: string | null) => {
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

  getPendingFriendRequests = async (userA?: string | null) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVICE_URL}/api/v1/friends/${userA}`, {
        method: 'GET'
      });
      return res.json();
    } catch (e) {
      return console.error(e);
    }
  };
}
