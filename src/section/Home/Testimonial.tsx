"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import testimonials from "@/data/testimonials.json";
import Image from "next/image";

interface CardProps {
  name: string;
  title: string;
  description: string;
  imageUrl: string;
}

const Card = ({ name, title, description, imageUrl }: CardProps) => (
  <div className="text-gray-800 bg-white shadow-lg m-2 p-5 group relative cursor-pointer overflow-hidden pt-10 pb-8 hover:scale-105 transition-transform duration-300 mx-auto sm:max-w-sm rounded-lg sm:px-10">
    <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-blue-50 group-hover:scale-[20] transition-transform duration-300"></span>
    <div className="relative z-10 mx-auto max-w-lg">
      <span className="grid h-20 w-20 place-items-center rounded-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          width={100}
          height={100}
          className="h-20 w-20 rounded-full"
        />
      </span>
      <div className="pt-4 text-base">
        <p className="uppercase font-semibold text-gray-900">{name}</p>
        <p className="text-xs text-gray-600">{title}</p>
        <p className="pt-4 text-sm text-gray-700">{description}</p>
      </div>
    </div>
  </div>
);

export default function Testimonial() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () =>
    setActiveIndex(
      (current) => (current - 1 + testimonials.length) % testimonials.length
    );

  const handleNext = () =>
    setActiveIndex((current) => (current + 1) % testimonials.length);

  return (
    <div className="py-12">
      <header className="space-y-2 text-center">
        <h4 className="text-lg font-semibold text-blue-700 flex w-full items-center justify-center gap-2">
          <GraduationCap /> Proud To Present
        </h4>
        <h2 className="text-4xl sm:text-5xl font-bold uppercase text-gray-900">
          Testimonials
        </h2>
      </header>
      <motion.div
        className="w-full max-w-3xl mx-auto px-4 py-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}>
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="flex-none w-full">
                <Card
                  name={testimonial.name}
                  title={testimonial.title}
                  description={testimonial.description}
                  imageUrl={testimonial.imageUrl}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center mt-6 gap-4">
          <Button
            size="icon"
            onClick={handlePrev}
            className="rounded-full bg-blue-700 text-white hover:bg-blue-600"
            aria-label="Previous testimonial">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`h-3 w-3 rounded-full transition-colors ${
                  index === activeIndex ? "bg-blue-700" : "bg-blue-300"
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          <Button
            size="icon"
            onClick={handleNext}
            className="rounded-full bg-blue-700 text-white hover:bg-blue-600"
            aria-label="Next testimonial">
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
