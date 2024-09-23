import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import DashboardClient from "./DashboardClient";
import NewProjectDialog from "./NewProjectDialog";
import logo from "@/assets/logo.png";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard | SyncLab",
  description: "Manage your projects and team collaboration with SyncLab",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${inter.className} min-h-screen bg-slate-200 dark:bg-zinc-950 pt-4`}
    >
      <header className="bg-slate-200 dark:bg-zinc-950 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/dashboard" className="flex-shrink-0">
                <Image
                  src={logo}
                  className="lg:h-20 lg:w-52 h-10 w-24"
                  alt="logo"
                />
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <NewProjectDialog />
              <DashboardClient />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
