import { useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { Outlet, useNavigate } from "react-router-dom";
import { useCreateUser } from "@/core/service/user/use-create-user";

export default function DashboardLayout() {
  const { isLoaded, signOut } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  const { isLoading, isError } = useCreateUser(
    user?.id ?? "",
    user?.username ?? ""
  );

  useEffect(() => {
    if (!user) {
      navigate("/sign-in");
    }
  }, [navigate, user]);

  useEffect(() => {
    if (isError && !isLoading) {
      signOut();
    }
  }, [isError, isLoading]);

  if (!isLoaded || isLoading) return "Loading...";

  return <Outlet />;
}
