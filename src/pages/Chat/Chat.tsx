import Loader from '@/components/local/Loader/Loader';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Message } from '@/core/models/message.interface';
import { useChatInfo } from '@/core/service/chat/use-get-chat-info';
import { useIsLoggedIn } from '@/hooks/use-is-logged-in';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import moment from 'moment';

export default function Chat() {
  const user = useIsLoggedIn();
  const params = useParams();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [currentValue, setCurrentValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [socketUrl, setSocketUrl] = useState<string>('');

  const { mutate: getChatInfo, data: chatInfo, status } = useChatInfo();

  const { readyState, lastJsonMessage, sendJsonMessage } = useWebSocket(socketUrl, {
    share: true
  });

  const handleChangeSocketUrl = useCallback(
    (userId: string) => setSocketUrl(`${import.meta.env.VITE_SERVICE_WS_URL}/ws/${userId}`),
    []
  );

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      console.log('opened');
    }
  }, [readyState]);

  useEffect(() => {
    if (lastJsonMessage) {
      const parsedJson = JSON.parse(JSON.stringify(lastJsonMessage));
      setMessages((prev) => [parsedJson, ...prev]);
    }
  }, [lastJsonMessage]);

  useEffect(() => {
    if (user && user.id) {
      handleChangeSocketUrl(user.id);
    }
  }, [user, user?.id, handleChangeSocketUrl]);

  useEffect(() => {
    if (user && user.id && params && params.userId) {
      getChatInfo({ users: [user.id, params.userId] });
    }
  }, [user, user?.id, params, params?.userId]);

  useEffect(() => {
    textareaRef.current!.style!.height = '0px';
    const scrollHeight = textareaRef?.current?.scrollHeight;
    textareaRef.current!.style.height = scrollHeight + 'px';
  }, [currentValue]);

  const handleSendMessage = () => {
    if (currentValue) {
      const sender = user?.id;
      const recipient = params?.userId;
      if (sender && recipient) {
        const jsonMsg: Message = {
          sender: sender,
          recipient: recipient,
          content: currentValue
        };
        sendJsonMessage(jsonMsg);
        setMessages((prev) => [jsonMsg, ...prev]);
        setCurrentValue('');
      }
    }
  };

  useEffect(() => {
    if (chatInfo) {
      setMessages(chatInfo.data.messages);
    }
  }, [chatInfo]);

  const getSenderUsername = (sender: string) => {
    if (chatInfo) {
      return chatInfo.data.users.find((user) => user.id === sender)?.username;
    }
  };

  const getMessageTimestamp = (timestamp?: string) => {
    if (!timestamp) {
      return '';
    }

    return moment(timestamp).format('DD/MM/YYYY h:mm A');
  };

  return (
    <React.Fragment>
      {status === 'pending' ? (
        <Loader />
      ) : (
        <React.Fragment>
          <div className='flex flex-grow overflow-y-auto px-7 pt-7 pb-0 flex-col-reverse gap-2'>
            {messages.map((message) => (
              <div className='p-2 flex flex-row items-start gap-2'>
                <Avatar>
                  <AvatarImage src='https://utfs.io/f/b798a2bc-3424-463c-af28-81509ed61caa-o1drm6.png' />
                </Avatar>
                <div className='flex flex-col items-start'>
                  <div className='flex flex-row gap-2 items-center'>
                    <div className='text-red-500 text-sm'>{getSenderUsername(message.sender)}</div>
                    <div className='text-muted-foreground text-xs'>
                      {getMessageTimestamp(message.timestamp)}
                    </div>
                  </div>
                  <div>{message.content}</div>
                </div>
              </div>
            ))}
          </div>
          <div className='flex justify-stretch flex-col p-7'>
            <textarea
              ref={textareaRef}
              className='rounded-md bg-primary-foreground p-3 pl-5 resize-none overflow-hidden max-h-[500px] overflow-y-auto'
              placeholder='Message'
              onChange={(e) => setCurrentValue(e.target.value)}
              value={currentValue}
              onKeyDown={(e) => {
                const keyCode = e.key;
                if (keyCode === 'Enter') {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
