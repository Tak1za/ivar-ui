import { ChatInfoRequest } from '@/core/models/chat-info-request.interface';
import { ChatInfo } from '@/core/models/chat-info.interface';

export class ChatService {
  getChatInfo = async (req: ChatInfoRequest): Promise<{ data: ChatInfo } | void> => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVICE_URL}/api/v1/chats/info`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(req)
      });

      return res.json();
    } catch (e) {
      return console.error(e);
    }
  };
}
