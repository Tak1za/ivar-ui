import { useIsLoggedIn } from '@/hooks/use-is-logged-in';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

export default function Chat() {
  const user = useIsLoggedIn();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [currentValue, setCurrentValue] = useState('');

  const [socketUrl, setSocketUrl] = useState<string>('');

  const { readyState, lastJsonMessage } = useWebSocket(socketUrl, {
    shouldReconnect: () => true
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
      console.log('received message: ', JSON.stringify(lastJsonMessage));
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

  return (
    <React.Fragment>
      <div className='flex-grow overflow-y-auto p-7'>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente ea libero, non ipsam iure
        velit incidunt quod ipsa, minus dolor mollitia omnis id quasi. Tempora magni nisi voluptate
        obcaecati saepe. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima iste, hic
        molestias repellendus velit pariatur possimus. Velit modi reiciendis, amet eius deserunt a
        at ad, facere pariatur rem ullam ex! Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Tempora maiores aliquam aut autem aspernatur eos eligendi! Delectus, minima quo natus
        molestias veritatis omnis, pariatur, inventore ea exercitationem ullam distinctio expedita.
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi sit fugit harum repellat,
        veritatis voluptate recusandae officiis, laudantium dolore possimus amet placeat error
        quisquam, vitae adipisci illo provident libero neque? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Error ut magni dolorum, fugiat adipisci sit alias facilis fugit distinctio
        dolore eaque delectus nihil, reprehenderit nesciunt eveniet accusantium repudiandae dolor
        veritatis. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium quo
        molestias aut blanditiis illo, quae quam, alias labore error tempore, porro aliquam cum
        magnam dolor vitae veniam quibusdam veritatis a.
      </div>
      <div className='flex justify-stretch flex-col p-7'>
        <textarea
          ref={textareaRef}
          className='rounded-md bg-primary-foreground p-3 pl-5 resize-none overflow-hidden max-h-[500px] overflow-y-auto'
          placeholder='Message'
          onChange={(e) => setCurrentValue(e.target.value)}
          onKeyDown={(e) => {
            const keyCode = e.key;
            if (keyCode === 'Enter') {
              e.preventDefault();
            }
          }}
        />
      </div>
    </React.Fragment>
  );
}
