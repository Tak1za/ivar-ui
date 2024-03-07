import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useGetPendingFriendRequests } from '@/core/service/user/use-get-pending-friend-requests';
import { useSendFriendRequest } from '@/core/service/user/use-send-friend-request';
import { useIsLoggedIn } from '@/hooks/use-is-logged-in';
import React from 'react';
import { ChangeEvent, useEffect, useState } from 'react';

type Filter = 'all' | 'pending' | 'add-friend';

export default function FriendsPage() {
  const user = useIsLoggedIn();
  const [friendToAdd, setFriendToAdd] = useState('');

  const { refetch: sendFriendRequest, isSuccess } = useSendFriendRequest(
    user?.username,
    friendToAdd
  );
  const { refetch: getPendingFriendRequests, data: pendingFriendRequests } =
    useGetPendingFriendRequests(user?.username);

  const [selectedFilter, setSelectedFilter] = useState<Filter>('all');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFriendToAdd(e.target.value);
  };

  const handleSendFriendRequest = () => {
    if (friendToAdd) {
      sendFriendRequest();
    }
  };

  useEffect(() => {
    if (selectedFilter === 'pending') {
      getPendingFriendRequests();
    }
  }, [selectedFilter]);

  return (
    <div className='flex flex-col h-full justify-start'>
      <div className='flex h-14 items-center shadow-topbar justify-between gap-2'>
        <ToggleGroup
          type='single'
          className='flex flex-row justify-between w-full mx-2'
          onValueChange={(val) => setSelectedFilter(val as Filter)}
        >
          <div className='flex flex-grow gap-2'>
            <ToggleGroupItem
              value='all'
              className={`text-md rounded-sm ${selectedFilter === 'all' ? 'bg-secondary' : 'bg-transparent'}`}
            >
              All
            </ToggleGroupItem>
            <ToggleGroupItem
              value='pending'
              className={`text-md rounded-sm ${selectedFilter === 'pending' ? 'bg-secondary' : 'bg-transparent'}`}
            >
              Pending
            </ToggleGroupItem>
          </div>
          <ToggleGroupItem value='add-friend' variant='outline'>
            Add Friend
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className='flex flex-grow overflow-y-auto my-4 mr-1 pr-1 pl-2 flex-col'>
        {selectedFilter === 'add-friend' && (
          <React.Fragment>
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
          </React.Fragment>
        )}
        {selectedFilter === 'pending' && (
          <React.Fragment>
            <div className='text-sm text-muted-foreground'>
              PENDING
              {pendingFriendRequests?.data?.length !== 0
                ? ` - ${pendingFriendRequests?.data?.length}`
                : ''}
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
