"use client";

import { useEffect } from "react";
import { auth } from "@/app/firebase/config";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export default function Dashboard() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    const userSession = sessionStorage.getItem("user");

    if (!user && !userSession) {
      router.push("/login");
    }

    if (user && !userSession) {
      sessionStorage.setItem("user", JSON.stringify(user));
    }
  }, [user, router]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        sessionStorage.removeItem("user");
        router.push("/login"); // Redirect to login after logout
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  return (
    <div className="dark:bg-zinc-950 bg-slate-200 min-h-screen flex items-center justify-center">
      {" "}
      <Button onClick={handleLogout}>Log out</Button>
    </div>
  );
}
