import { useEffect } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useCreateUser } from '@/core/service/user/use-create-user';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';

export default function DashboardLayout() {
  const { isLoaded, signOut } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  const { isLoading, isError } = useCreateUser(user?.id ?? '', user?.username ?? '');

  useEffect(() => {
    if (!user) {
      navigate('/sign-in');
    }
  }, [navigate, user]);

  useEffect(() => {
    if (isError && !isLoading) {
      signOut();
    }
  }, [isError, isLoading]);

  if (!isLoaded || isLoading) {
    return (
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-row gap-2 place-items-center'>
            <Icons.spinner className='animate-spin h-10'></Icons.spinner>
            <p>Hold on while we log you in...</p>
          </div>
          <p className='text-sm text-muted-foreground -ml-3 font-bold'>
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
          <div className='flex-grow'></div>
          <div className='bg-secondary h-16 flex flex-shrink items-center px-3'>
            <div className='flex flex-row items-center gap-2'>
              <Popover>
                <PopoverTrigger>
                  <Avatar>
                    <AvatarImage src='https://github.com/shadcn.png' />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className='w-fit rounded-lg'>
                  <Button
                    variant='destructive'
                    size='sm'
                    onClick={() => {
                      signOut();
                      navigate('/sign-in', { replace: true });
                    }}
                  >
                    Sign Out
                  </Button>
                </PopoverContent>
              </Popover>
              <div className='flex flex-col'>
                <div>{user?.username}</div>
                <div className='text-xs text-muted-foreground'>Online</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}
