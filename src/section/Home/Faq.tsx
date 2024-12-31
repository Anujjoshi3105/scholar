"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import faqs from "@/data/faqs.json";
import { GraduationCap } from "lucide-react";

const animationVariants = {
  hidden: (direction: "left" | "right") => ({
    opacity: 0,
    x: direction === "left" ? -100 : 100,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 150,
    },
  },
};

export default function FAQ() {
  return (
    <section className="max-w-3xl mx-auto overflow-clip space-y-16">
      <header className="space-y-2 text-center">
        <h4 className="text-lg font-semibold text-blue-700 flex w-full items-center justify-center gap-2">
          <GraduationCap /> Explore Commonly Asked Questions
        </h4>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Frequently Asked Questions
        </h2>
      </header>

      <Accordion type="single" collapsible className="w-full">
        {faqs.map(({ question, answer }, index) => {
          const direction = index % 2 === 0 ? "left" : "right";
          return (
            <AccordionItem key={index} value={`item-${index}`}>
              <motion.div
                custom={direction}
                initial="hidden"
                animate="visible"
                variants={animationVariants}>
                <AccordionTrigger>{question}</AccordionTrigger>
                <AccordionContent>{answer}</AccordionContent>
              </motion.div>
            </AccordionItem>
          );
        })}
      </Accordion>
    </section>
  );
}
