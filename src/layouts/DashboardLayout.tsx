import { useCallback, useEffect, useState } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useCreateUser } from '@/core/service/user/use-create-user';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Icons } from '@/components/ui/icons';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from '@/components/ui/alert-dialog';
import useWebSocket, { ReadyState } from 'react-use-websocket';

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoaded, signOut } = useAuth();
  const { user } = useUser();
  const { mutate: createUser, isPending, isError } = useCreateUser();
  const [socketUrl, setSocketUrl] = useState<string>('');

  const { readyState } = useWebSocket(socketUrl, {
    share: true,
    shouldReconnect: () => true
  });

  const handleChangeSocketUrl = useCallback(
    (userId: string) => setSocketUrl(`${import.meta.env.VITE_SERVICE_WS_URL}/ws/${userId}`),
    []
  );

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      console.log('opened');
      // sendJsonMessage({ sender: 'user1', recipient: 'user2', content: 'testing' });
    }
  }, [readyState]);

  useEffect(() => {
    if (user && user.username) {
      createUser({ id: user.id, username: user.username });
      handleChangeSocketUrl(user.id);
    }
  }, [user, user?.username, createUser, handleChangeSocketUrl]);

  useEffect(() => {
    if (isError && !isPending) {
      signOut();
    }
  }, [isError, isPending, signOut]);

  if (!isLoaded || isPending) {
    return (
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-row gap-2 place-items-center'>
            <Icons.spinner className='animate-spin h-10'></Icons.spinner>
            <p>Hold on while we log you in...</p>
          </div>
          <p className='text-sm text-muted-foreground -ml-4 font-bold'>
            FACT: Good things happen to those who wait
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='h-full w-16 bg-secondary'></div>
      <div className='h-full w-56 bg-primary-foreground'>
        <div className='flex flex-col justify-between h-full'>
          <div className='flex-grow p-2 flex flex-col'>
            <div
              className={`flex flex-row gap-2 items-center py-2 px-4 rounded-md hover:bg-secondary hover:cursor-pointer ${location.pathname === '/friends' ? 'bg-secondary' : ''}`}
              onClick={() => navigate('/friends')}
            >
              <Icons.friends />
              <p>Friends</p>
            </div>
            <div className='text-xs text-muted-foreground mt-2 uppercase'>Direct Messages</div>
          </div>
          <div className='bg-secondary h-16 flex flex-shrink items-center px-3 justify-between'>
            <div className='flex flex-row items-center gap-2'>
              <Avatar>
                <AvatarImage src='https://utfs.io/f/b798a2bc-3424-463c-af28-81509ed61caa-o1drm6.png' />
              </Avatar>
              <div className='flex flex-col'>
                <div>{user?.username}</div>
                <div className='text-xs text-muted-foreground'>Online</div>
              </div>
            </div>
            <div className='w-7 h-7'>
              <AlertDialog>
                <AlertDialogTrigger>
                  <Icons.logout />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will log you out of your account and you will need to log back in to
                      access your data.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => signOut()}>Logout</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col w-full h-full'>
        <Outlet />
      </div>
    </>
  );
}
