"use client";

import { auth } from "@/app/firebase/config";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export default function Home() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  if (!user) {
    router.push("/login");
  }
  console.log(user);
  return (
    <div className="dark:bg-zinc-950 bg-slate-200 min-h-screen">
      <Button onClick={() => signOut(auth)}>log out</Button>
    </div>
  );
}
