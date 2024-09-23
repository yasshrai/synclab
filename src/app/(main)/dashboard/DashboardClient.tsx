"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect } from "react";

export default function DashboardClient() {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        sessionStorage.removeItem("user");
        router.push("/login");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while checking auth
  }

  return (
    <div className="flex items-center space-x-4">
      <Popover>
        <PopoverTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage
              src={user?.photoURL || ""}
              alt={user?.displayName || "User"}
            />
            <AvatarFallback>{user?.displayName?.[0] || "U"}</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="w-60">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">{user?.displayName}</h4>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <Button onClick={handleLogout} variant="outline" className="text-white">
        Log out
      </Button>
    </div>
  );
}
