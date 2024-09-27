"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface ProjectProps {
  params: {
    uid: string;
    projectname: string;
  };
}

export default function Project({ params }: ProjectProps) {
  const { uid, projectname } = params;
  const [user, loading] = useAuthState(auth);
  const { toast } = useToast();

  const router = useRouter();
  if (uid != user?.uid) {
    router.push("/dashboard");
    toast({
      variant: "default",
      className: "text-white font-bold bg-red-700",
      title: "You cannot access this project",
      duration: 4000,
    });
  }
  if (loading) {
    <div>loading..</div>;
  }

  return (
    <div className="text-3xl text-white overflow-x-hidden ">
      <p>User ID: {uid}</p>
      <p>Project Name: {projectname}</p>
    </div>
  );
}
