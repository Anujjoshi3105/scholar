"use client";

import { motion } from "framer-motion";
import { ContactCard } from "@/components/Cards";
import { contactDetails } from "@/data/data";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="md:w-1/2 my-auto flex flex-col justify-between h-full">
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 w-full">
        {contactDetails.map((contact) => (
          <ContactCard key={contact.title} contact={contact} />
        ))}
      </div>
      <Link
        href="https://wa.me/918447512857"
        target="_blank"
        className="hover:scale-105 duration-200 relative w-full flex justify-center items-center p-4">
        <Badge variant="secondary" className="absolute">
          WhatsApp: +91 8447512857
        </Badge>
        <Image src="/contact.png" alt="contact" width={400} height={400} />
      </Link>
    </motion.div>
  );
}
