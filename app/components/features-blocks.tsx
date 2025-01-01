"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Globe, Wand2, Users, Cog, Star, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Fast Performance",
    description:
      "Optimize your site for lightning-fast load times and smooth interactions.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description:
      "Expand your audience with multi-language support and localization features.",
  },
  {
    icon: Wand2,
    title: "Easy Customization",
    description:
      "Tailor your site's look and feel with our intuitive customization tools.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Work seamlessly with your team using built-in collaboration features.",
  },
  {
    icon: Cog,
    title: "Advanced Settings",
    description:
      "Fine-tune your site's behavior with our advanced configuration options.",
  },
  {
    icon: Star,
    title: "Premium Support",
    description:
      "Get expert help when you need it with our dedicated support team.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

export default function FeaturesBlocks() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-background to-background/50">
      <div
        className="absolute inset-0 top-1/2 md:mt-24 lg:mt-0 bg-gradient-to-b from-background to-background/50 pointer-events-none"
        aria-hidden="true"
      ></div>
      <div className="absolute left-0 right-0  bottom-0 m-auto w-px p-px h-20 bg-border transform translate-y-1/2"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center pb-12 md:pb-20"
          >
            <h2 className="text-3xl font-bold mb-4">Explore the solutions</h2>
            <p className="text-xl text-muted-foreground">
              Discover powerful features designed to enhance your workflow and
              boost productivity.
            </p>
          </motion.div>

          {/* Items */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-sm mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-none"
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="relative flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-bold leading-snug tracking-tight mb-1">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-grow">
                    <p className="text-muted-foreground mb-4 flex-grow">
                      {feature.description}
                    </p>
                    <Button variant="ghost" className="mt-2 self-start group">
                      Learn more
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
