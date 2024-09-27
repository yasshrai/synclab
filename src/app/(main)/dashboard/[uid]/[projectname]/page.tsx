"use client";

import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/app/firebase/config";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

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

  useEffect(() => {
    if (!loading && user?.uid !== uid) {
      router.push("/dashboard");
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "You do not have permission to view this project.",
        duration: 4000,
      });
    }
  }, [user, loading, uid, router, toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  if (!user || user.uid !== uid) {
    return null; // Render nothing if not authorized
  }

  return (
    <div className="text-3xl text-white overflow-x-hidden">
      <p>User ID: {uid}</p>
      <p>Project Name: {projectname}</p>
    </div>
  );
}
