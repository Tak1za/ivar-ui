import { Outlet, useNavigate } from 'react-router-dom';

export default function Settings() {
  const navigate = useNavigate();
  return (
    <div className='flex flex-row w-full'>
      <div className='basis-1/3 flex flex-col overflow-y-auto justify-start items-end px-2 py-20 bg-primary-foreground'>
        <div className='w-60'>
          <div className='uppercase text-xs text-muted-foreground font-bold'>User Settings</div>
          <div
            className={`flex flex-row gap-4 p-2 mt-2 w-full items-center rounded-md hover:bg-secondary hover:cursor-pointer ${location.pathname === `/settings/account` ? 'bg-secondary' : ''}`}
            onClick={() => navigate('account')}
          >
            My Account
          </div>
        </div>
      </div>
      <div className='basis-2/3 flex justify-start px-2 py-20'>
        <Outlet />
      </div>
    </div>
  );
}
