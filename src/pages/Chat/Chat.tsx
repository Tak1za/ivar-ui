import { Message } from '@/core/models/message.interface';
import { useIsLoggedIn } from '@/hooks/use-is-logged-in';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import useWebSocket, { ReadyState } from 'react-use-websocket';

export default function Chat() {
  const user = useIsLoggedIn();
  const params = useParams();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [currentValue, setCurrentValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const [socketUrl, setSocketUrl] = useState<string>('');

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
      setMessages((prev) => [...prev, parsedJson]);
    }
  }, [lastJsonMessage]);

  useEffect(() => {
    if (user && user.id) {
      handleChangeSocketUrl(user.id);
    }
  }, [user, user?.id, handleChangeSocketUrl]);

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
        setMessages((prev) => [...prev, jsonMsg]);
        setCurrentValue('');
      }
    }
  };

  return (
    <React.Fragment>
      <div className='flex flex-grow overflow-y-auto px-7 pt-7 pb-0 flex-col-reverse gap-2'>
        {messages.map((message) =>
          message.sender === user?.id ? (
            <div className='w-full flex flex-row-reverse'>
              <div className='break-words p-2 rounded-md bg-secondary'>{message.content}</div>
            </div>
          ) : (
            <div className='w-full flex flex-row'>
              <div className='break-words flex p-2 rounded-md bg-secondary'>{message.content}</div>
            </div>
          )
        )}
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
  );
}
