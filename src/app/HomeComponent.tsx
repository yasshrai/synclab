"use client";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import logo from "@/assets/logo.png";
const HomeComponent = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-200 dark:bg-zinc-950">
      <header className="w-full px-4 py-6 bg-slate-200 dark:bg-zinc-950 sticky top-0 ">
        <div className="container mx-auto flex items-center justify-between lg:justify-evenly">
          <Image
            src={logo}
            className=" lg:h-20  lg:w-52 h-10 w-24"
            alt="logo"
          ></Image>

          <NavigationMenu>
            <NavigationMenuList className="flex gap-6">
              {["Home", "Features", "Contact"].map((item) => (
                <NavigationMenuLink key={item} asChild>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100 transition-colors"
                    prefetch={false}
                  >
                    {item}
                  </Link>
                </NavigationMenuLink>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>

      <main className="flex-1">
        <section
          id="home"
          className="py-20 md:py-32 bg-slate-200 dark:bg-zinc-950"
        >
          <div className="container px-4 md:px-6 mx-auto">
            <motion.div
              className="flex flex-col items-center justify-center space-y-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-slate-900 dark:text-slate-100">
                Welcome to{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  SyncLab
                </span>
              </h1>
              <p className="max-w-[700px] text-slate-600 md:text-xl dark:text-slate-300">
                The ultimate app for managing your tasks and projects with ease
                and efficiency.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Link href="/signup" prefetch={true}>
                    Get Started
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-slate-300 text-slate-800 hover:bg-slate-100 dark:border-zinc-700 dark:text-slate-200 dark:hover:bg-zinc-800"
                >
                  <Link href="/dashboard" prefetch={true}>
                    Go To Dashboard
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="features" className="py-20 bg-slate-200 dark:bg-zinc-950">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center text-slate-900 dark:text-slate-100 mb-12">
              Features
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  title: "Document Versioning",
                  description:
                    "Store every version of your documents like git commits, ensuring you never lose track of changes.",
                },
                {
                  title: "Real-time Collaboration",
                  description:
                    "Edit, comment, and collaborate with your team in real-time, no matter where they are.",
                },
                {
                  title: "Integrated Communication",
                  description:
                    "Integrated chat and video call features to keep communication within the platform.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full bg-slate-200 dark:bg-zinc-950 border-slate-200 dark:border-zinc-700 hover:dark:bg-zinc-900">
                    <CardHeader>
                      <CardTitle className="text-xl text-center text-slate-900 dark:text-slate-100">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 dark:text-slate-300 text-center">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer
        id="contact"
        className="w-full py-6 bg-slate-200 dark:bg-zinc-950 border-t border-slate-300 dark:border-zinc-800"
      >
        <div className="container mx-auto px-4 text-center text-white ">
          <p>&copy; {new Date().getFullYear()} SyncLab. All rights reserved.</p>
          <p>yash2154rai@gmail.com</p>
        </div>
      </footer>
    </div>
  );
};

export default HomeComponent;
