import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <div className="container px-4 md:px-6 mx-auto">
      <motion.div
        className="flex flex-col items-center justify-center space-y-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-slate-900 dark:text-slate-100">
          Welcome to{" "}
          <span className="text-blue-600 dark:text-blue-400">SyncLab</span>
        </h1>
        <p className="max-w-[700px] text-slate-600 md:text-xl dark:text-slate-300">
          The ultimate app for managing your tasks and projects with ease and
          efficiency.
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
  );
};

export default HeroSection;
