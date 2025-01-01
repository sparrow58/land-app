"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { QuoteIcon } from "lucide-react";
import { motion } from "framer-motion";
import TestimonialImage from "@/public/images/testimonial.jpg";
import ProfileImage from "@/public/images/profile.png";

const companyLogos = [
  { src: ProfileImage, alt: "Company 1" },
  { src: ProfileImage, alt: "Company 2" },
  { src: ProfileImage, alt: "Company 3" },
  { src: ProfileImage, alt: "Company 4" },
  { src: ProfileImage, alt: "Company 5" },
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

export default function Testimonials() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center pb-12 md:pb-20"
        >
          <h2 className="text-3xl font-bold mb-4">
            Trusted by over 20,000 companies worldwide
          </h2>
          <p className="text-xl text-muted-foreground">
            Our clients love our product and the support we provide. Here's what
            they have to say about us.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center items-center gap-8 mb-16"
        >
          {companyLogos.map((logo, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Image
                src={logo.src}
                alt={logo.alt}
                width={100}
                height={40}
                className="max-h-10 w-auto opacity-70 hover:opacity-100 transition-opacity duration-300"
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="max-w-4xl mx-auto overflow-hidden">
            <CardContent className="flex flex-col md:flex-row items-center text-center md:text-left px-6 py-10">
              <div className="md:w-1/3 mb-6 md:mb-0 md:mr-8">
                <Avatar className="w-24 h-24 mx-auto md:mx-0">
                  <AvatarImage src={TestimonialImage.src} alt="Darya Finger" />
                  <AvatarFallback>DF</AvatarFallback>
                </Avatar>
              </div>
              <div className="md:w-2/3">
                <QuoteIcon className="w-12 h-12 text-primary mb-6 mx-auto md:mx-0" />
                <blockquote className="text-2xl font-medium mb-6">
                  "I love this product and would recommend it to anyone. Could
                  not be easier to use, and our multiple websites are wonderful.
                  We get nice comments all the time."
                </blockquote>
                <cite className="not-italic">
                  <strong className="font-bold text-lg block">
                    Darya Finger
                  </strong>
                  <span className="text-muted-foreground">
                    CEO & Co-Founder{" "}
                    <a href="#0" className="text-primary hover:underline">
                      @Dropbox
                    </a>
                  </span>
                </cite>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
