"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/app/firebase/config";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import DashboardSkeleton from "./DashboardSkeleton";

const db = getFirestore();

interface Project {
  uid: string;
  name: string;
  description: string;
}

export default function Dashboard() {
  const [user, userLoading] = useAuthState(auth);
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      if (!user) return;

      setProjectsLoading(true);
      try {
        const projectsQuery = query(
          collection(db, "projects"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(projectsQuery);
        const fetchedProjects: Project[] = querySnapshot.docs.map((doc) => ({
          uid: doc.data().userId,
          name: doc.data().name,
          description: doc.data().description,
        }));
        setProjects(fetchedProjects);
      } catch (err) {
        setError("Failed to load projects. Please try again later.");
      } finally {
        setProjectsLoading(false);
      }
    }

    if (user) {
      fetchProjects();
    }
  }, [user]);

  if (userLoading || projectsLoading) {
    return <DashboardSkeleton />;
  }

  if (!user) {
    return (
      <div className="text-center p-4 dark:text-white">
        Please log in to view your projects.
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4 text-red-500 dark:text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 dark:text-white mx-7">
        Your Projects
      </h1>
      {projects.length === 0 ? (
        <p className="text-center dark:text-white font-bold">
          No projects found. Create your first project to get started!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-7">
          {projects.map((project) => (
            <Card key={project.uid}>
              <CardHeader>
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={`dashboard/${project.uid}/${project.name}`}>
                  <Button variant="outline" className="w-full">
                    View Project
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
