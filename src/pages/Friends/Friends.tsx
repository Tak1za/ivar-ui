import { Button } from '@/components/ui/button';
import { useIsLoggedIn } from '@/hooks/use-is-logged-in';

export default function FriendsPage() {
  useIsLoggedIn();

  return (
    <div className='flex flex-col h-full justify-start'>
      <div className='flex h-14 items-center shadow-topbar justify-between gap-2'>
        <div className='flex flex-grow'></div>
        <Button className='mr-2' size='sm' variant='secondary'>
          Add Friend
        </Button>
      </div>
      <div className='flex flex-grow overflow-y-auto my-2 mr-1 pr-1'>
        <div></div>
      </div>
    </div>
  );
}
