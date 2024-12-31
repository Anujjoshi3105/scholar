"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { GraduationCap, Users, BookOpen } from "lucide-react";

export default function Hero() {
  return (
    <div className="min-h-screen w-full bg-blue-900 text-white relative overflow-hidden pt-32">
      {/* Background pattern */}
      <div className="container mx-auto px-4 py-16 sm:py-24 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto flex flex-col items-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="max-w-4xl text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            Elevate Your Learning Journey
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-3xl mt-6 sm:text-lg">
            Discover a world of knowledge with our cutting-edge online education
            platform. Engage with expert tutors, explore diverse courses, and
            unlock your full potential.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg">Get Started</Button>
            <Button size="lg" variant="alternate">
              Learn More
            </Button>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-16 grid w-full grid-cols-1 gap-8 rounded-xl bg-white/5 p-8 backdrop-blur-sm sm:grid-cols-3 md:gap-12 lg:gap-16">
            <StatItem number="260+" text="Expert Tutors" icon={GraduationCap} />
            <StatItem number="2260+" text="Active Students" icon={Users} />
            <StatItem number="60+" text="Diverse Courses" icon={BookOpen} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function StatItem({
  number,
  text,
  icon: Icon,
}: {
  number: string;
  text: string;
  icon: React.ElementType;
}) {
  return (
    <div className="flex flex-col items-center hover:scale-105 duration-200">
      <Icon className="w-12 h-12 mb-2" />
      <p className="text-2xl font-bold">{number}</p>
      <p className="text-gray-300">{text}</p>
    </div>
  );
}
