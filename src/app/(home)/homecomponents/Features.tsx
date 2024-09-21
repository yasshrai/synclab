import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const Features = () => {
  return (
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
  );
};

export default Features;
