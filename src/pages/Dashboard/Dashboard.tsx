import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@clerk/clerk-react";

export default function DashboardPage() {
  const { user } = useUser();

  return (
    <div className="flex flex-row h-full w-full">
      <div className="h-full w-16 bg-secondary"></div>
      <div className="h-full w-56 bg-primary-foreground">
        <div className="flex flex-col justify-between h-full">
          <div className="bg-blue-400 flex-grow">testing</div>
          <div className="bg-slate-500 h-16 flex flex-shrink items-center px-3">
            <div className="flex flex-row items-center">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
              </Avatar>
              <div>{user?.username}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
