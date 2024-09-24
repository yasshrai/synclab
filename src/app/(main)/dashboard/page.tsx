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
import { auth } from "@/app/firebase/config"; // Adjust this import path as needed
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const db = getFirestore();

interface Project {
  uid: string;
  name: string;
  description: string;
}

export default function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      if (!user) return;

      try {
        const projectsQuery = query(
          collection(db, "projects"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(projectsQuery);
        const fetchedProjects: Project[] = querySnapshot.docs.map((doc) => ({
          uid: doc.id,
          name: doc.data().name,
          description: doc.data().description,
        }));
        setProjects(fetchedProjects);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects. Please try again later.");
      }
    }

    if (user) {
      fetchProjects();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="text-center p-4 dark:text-white">Loading projects...</div>
    );
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
        <p className="text-center dark:text-white"></p>
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
