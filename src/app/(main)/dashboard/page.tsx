import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// This would typically come from a database or API
const projects = [
  {
    uid: 1,
    name: "Project Alpha",
    description: "A cutting-edge web application",
  },
  { uid: 2, name: "Project Beta", description: "Mobile app for productivity" },
  {
    uid: 3,
    name: "Project Gamma",
    description: "AI-powered data analysis tool",
  },
];

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 dark:text-white mx-7">
        Your Projects
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-7">
        {projects.map((project) => (
          <Card key={project.uid}>
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`/dashboard/${project.uid}/${project.name}`}>
                <Button variant="outline" className="w-full">
                  View Project
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
