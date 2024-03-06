import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout.tsx';
import RootLayout from './layouts/RootLayout.tsx';
import SignInPage from './pages/SignIn/SignIn.tsx';
import SignUpPage from './pages/SignUp/SignUp.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FriendsPage from './pages/Friends/Friends.tsx';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <DashboardLayout />,
        children: [{ path: 'friends', element: <FriendsPage /> }]
      },
      { path: '/sign-in', element: <SignInPage /> },
      { path: '/sign-up', element: <SignUpPage /> }
    ]
  }
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
