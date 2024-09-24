"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { auth } from "@/app/firebase/config";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useToast } from "@/hooks/use-toast";

const db = getFirestore();

export default function NewProjectDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [user] = useAuthState(auth);
  const { toast } = useToast();

  const handleCreateProject = async () => {
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "projects"), {
        name: projectName,
        description: projectDescription,
        userId: user.uid,
        createdAt: new Date(),
      });
      toast({
        variant: "default",
        className: "text-white font-bold bg-green-700",
        title: "project Created Successfully " + "\n projectID:" + docRef.id,
        duration: 2000,
      });
      setProjectName("");
      setProjectDescription("");
      setIsOpen(false);
      location.reload();
    } catch (error) {
      let message = "";

      if (error instanceof Error) {
        message = error.message;
      } else {
        message = "Something went wrong";
      }
      toast({
        variant: "default",
        className: "text-white font-bold bg-red-700",
        title: message,
        duration: 2000,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className="dark:text-white">
        <Button variant="outline" className="dark:text-white">
          New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black">
        <DialogHeader>
          <DialogTitle className="dark:text-white">
            Create New Project
          </DialogTitle>
          <DialogDescription>
            Enter the details for your new project. Click create when you are
            done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 ">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right dark:text-white">
              Name
            </Label>
            <Input
              id="name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="col-span-3 dark:text-white"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right dark:text-white">
              Description
            </Label>
            <Textarea
              id="description"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              className="col-span-3 dark:text-white"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleCreateProject}>
            Create Project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
