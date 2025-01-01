"use client";

import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import ModalVideo from "./modal-video";
import { useEffect, useState } from "react";

export default function Hero() {
  const words = ["Home", "Ground", "Property", "Apartment"];
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000); // Change word every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-background text-foreground">
      {/* Background illustration */}
      <motion.div
        className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none -z-1"
        aria-hidden="true"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <svg
          width="1360"
          height="578"
          viewBox="0 0 1360 578"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
              id="illustration-01"
            >
              <stop stopColor="hsl(var(--background))" offset="0%" />
              <stop stopColor="hsl(var(--muted))" offset="77.402%" />
              <stop stopColor="hsl(var(--border))" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="url(#illustration-01)" fillRule="evenodd">
            <circle cx="1232" cy="128" r="128" />
            <circle cx="155" cy="443" r="64" />
          </g>
        </svg>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-24 pb-12 md:pt-32 md:pb-20">
          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <motion.h1
              className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Find Your Dream{" "}
              <span className="inline-block w-[150px]">
                {" "}
                {/* Adjust width as needed */}
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentWord}
                    className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {words[currentWord]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.h1>
            <div className="max-w-3xl mx-auto">
              <motion.p
                className="text-xl text-muted-foreground mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Discover beautiful properties in prime locations. Our expert
                real estate agents are here to help you find the perfect home
                for your family.
              </motion.p>
              <motion.div
                className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Button size="lg">Browse Properties</Button>
                <Button variant="outline" size="lg">
                  Contact Agent
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Hero video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <ModalVideo
              thumb="/images/4.jpg"
              thumbWidth={1920}
              thumbHeight={1080}
              thumbAlt="Modern two-story home with beautiful sunset backdrop"
              video="/videos/property-tour.mp4"
              videoWidth={1920}
              videoHeight={1080}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
