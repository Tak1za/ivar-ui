import { CreateServerRequest } from '@/core/models/create-server.interface';

export class ServerService {
  createServer = async ({ name, ownerId }: CreateServerRequest) => {
    return await fetch(`${import.meta.env.VITE_SERVICE_URL}/api/v1/servers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, ownerId })
    }).then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
    });
  };
}
