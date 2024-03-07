import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSendFriendRequest } from '@/core/service/user/use-send-friend-request';
import { useIsLoggedIn } from '@/hooks/use-is-logged-in';
import { ChangeEvent, useState } from 'react';

export default function FriendsPage() {
  const user = useIsLoggedIn();
  const [friendToAdd, setFriendToAdd] = useState('');

  const { refetch, isSuccess } = useSendFriendRequest(user?.username, friendToAdd);

  const [isAddFriendsClicked, setIsAddFriendsClicked] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFriendToAdd(e.target.value);
  };

  const handleSendFriendRequest = () => {
    if (friendToAdd) {
      refetch();
    }
  };

  return (
    <div className='flex flex-col h-full justify-start'>
      <div className='flex h-14 items-center shadow-topbar justify-between gap-2'>
        <div className='flex flex-grow'></div>
        <Button
          className='mr-2'
          size='sm'
          variant='secondary'
          onClick={() => setIsAddFriendsClicked(true)}
        >
          Add Friend
        </Button>
      </div>
      {isAddFriendsClicked && (
        <div className='flex flex-grow overflow-y-auto my-4 mr-1 pr-1 pl-2 flex-col'>
          <div className='text-md'>ADD FRIEND</div>
          <div className='text-sm text-muted-foreground mt-1'>
            You can add friends with their username
          </div>
          <div className='flex mt-4 gap-2 items-center'>
            <Input
              type='text'
              placeholder='Enter a username to add.'
              className={`flex-grow ${isSuccess && 'border-green-600'}`}
              value={friendToAdd}
              onChange={handleInputChange}
            />
            <Button size='sm' onClick={handleSendFriendRequest}>
              Send Request
            </Button>
          </div>
          {isSuccess && (
            <p className='text-green-600 ml-1 mt-1'>Your request was sent successfully</p>
          )}
        </div>
      )}
    </div>
  );
}
