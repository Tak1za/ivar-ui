import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout.tsx";
import RootLayout from "./layouts/RootLayout.tsx";
import DashboardPage from "./pages/Dashboard/Dashboard.tsx";
import InvoicesPage from "./pages/Invoices/Invoices.tsx";
import SignInPage from "./pages/SignIn/SignIn.tsx";
import SignUpPage from "./pages/SignUp/SignUp.tsx";
import IndexPage from "./pages/Index/Index.tsx";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <IndexPage /> },
      { path: "/sign-in", element: <SignInPage /> },
      { path: "/sign-up", element: <SignUpPage /> },
      {
        element: <DashboardLayout />,
        path: "dashboard",
        children: [
          { path: "/dashboard", element: <DashboardPage /> },
          { path: "/dashboard/invoices", element: <InvoicesPage /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
