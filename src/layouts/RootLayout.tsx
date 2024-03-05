import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  ClerkProvider,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import { ThemeProvider } from "@/components/theme-provider";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export default function RootLayout() {
  const navigate = useNavigate();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ClerkProvider
        navigate={navigate}
        publishableKey={PUBLISHABLE_KEY}
        appearance={{
          baseTheme: dark,
          elements: {
            rootBox:
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          },
        }}
      >
        <header className="p-2">
          <div className="flex flex-row justify-between">
            <p>Clerk + React + React Router App</p>
            <SignedIn>
              <SignOutButton
                signOutCallback={() => navigate("/sign-in", { replace: true })}
              >
                <Link to="">Sign Out</Link>
              </SignOutButton>
            </SignedIn>
            <SignedOut>
              <div className="flex flex-row gap-2">
                <Link to="/sign-in">Sign In</Link>
                <Link to="/sign-up">Sign Up</Link>
              </div>
            </SignedOut>
          </div>
        </header>
        <main className="p-2">
          <Outlet />
        </main>
      </ClerkProvider>
    </ThemeProvider>
  );
}
