"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ArrowDown, MoveRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const features = [
  {
    id: 1,
    title: "Building the Simple ecosystem",
    description:
      "Take collaboration to the next level with security and administrative features built for teams.",
    icon: ArrowRight,
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 2,
    title: "Building the Simple ecosystem",
    description:
      "Take collaboration to the next level with security and administrative features built for teams.",
    icon: MoveRight,
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 3,
    title: "Building the Simple ecosystem",
    description:
      "Take collaboration to the next level with security and administrative features built for teams.",
    icon: ArrowDown,
    image: "/placeholder.svg?height=400&width=400",
  },
];

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(1);

  return (
    <section className="relative py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="md:grid md:grid-cols-12 md:gap-12">
          {/* Content */}
          <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6">
            <div className="md:pr-4 lg:pr-12 xl:pr-16 mb-8">
              <h3 className="text-2xl font-bold mb-3">
                Powerful suite of tools
              </h3>
              <p className="text-xl text-muted-foreground">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa.
              </p>
            </div>

            <div className="space-y-4">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.id}
                    onClick={() => setActiveFeature(feature.id)}
                    className="cursor-pointer"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card
                        className={cn(
                          "transition-colors duration-200",
                          activeFeature === feature.id
                            ? "bg-muted"
                            : "hover:bg-muted/50"
                        )}
                      >
                        <CardContent className="flex items-center justify-between p-6">
                          <div className="space-y-1">
                            <h4 className="text-xl font-semibold">
                              {feature.title}
                            </h4>
                            <p className="text-muted-foreground">
                              {feature.description}
                            </p>
                          </div>
                          <div className="ml-4">
                            <Icon
                              className={cn(
                                "h-6 w-6 transition-colors",
                                activeFeature === feature.id
                                  ? "text-foreground"
                                  : "text-muted-foreground"
                              )}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Image Slider */}
          <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1">
            <div className="relative h-full aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-20 blur-3xl" />
              <div className="relative w-full h-full rounded-full bg-muted overflow-hidden">
                <AnimatePresence mode="wait">
                  {features.map(
                    (feature) =>
                      feature.id === activeFeature && (
                        <motion.div
                          key={feature.id}
                          className="absolute inset-0 flex items-center justify-center"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.2 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        >
                          <Image
                            src={feature.image}
                            alt={feature.title}
                            width={400}
                            height={400}
                            className="w-2/3 h-2/3 object-cover rounded-full"
                            priority={feature.id === 1}
                          />
                        </motion.div>
                      )
                  )}
                </AnimatePresence>
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-background"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
