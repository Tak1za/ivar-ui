import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout.tsx';
import RootLayout from './layouts/RootLayout.tsx';
import SignInPage from './pages/SignIn/SignIn.tsx';
import SignUpPage from './pages/SignUp/SignUp.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import FriendsPage from './pages/Friends/Friends.tsx';
import Chat from './pages/Chat/Chat.tsx';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <DashboardLayout />,
        children: [
          {
            path: 'friends',
            element: <FriendsPage />
          },
          {
            path: 'chat/:username',
            element: <Chat />
          }
        ]
      },
      { path: '/sign-in', element: <SignInPage /> },
      { path: '/sign-up', element: <SignUpPage /> }
    ]
  }
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <RouterProvider router={router} />
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
