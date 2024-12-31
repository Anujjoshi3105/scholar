"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaBars, FaX } from "react-icons/fa6";
import { useState } from "react";
import navLinks from "@/data/navLinks.json";
import { containerVars, menuVars, mobileLinkVars } from "@/data/animate";
import Link from "next/link";
import Image from "next/image";
import { Bell } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => setOpen((prevOpen) => !prevOpen);
  const closeMenu = () => setOpen(false);

  return (
    <header className="select-none absolute top-0 left-0 w-full z-[100]">
      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="origin-top fixed z-[1000] top-0 left-0 h-screen w-screen bg-muted text-center font-semibold uppercase">
            <Button
              onClick={toggleMenu}
              variant="ghost"
              size="icon"
              className="absolute right-10 top-8 rounded-full active:scale-50 transition-transform duration-150 ease-in-out">
              <FaX />
            </Button>
            <motion.div
              variants={containerVars}
              initial="initial"
              animate="open"
              exit="initial"
              className="flex flex-col tracking-wide justify-center items-center h-full gap-6 sm:gap-8 md:gap-10 text-xl sm:text-2xl lg:text-3xl">
              {navLinks.map((link) => (
                <motion.div key={link.href} variants={mobileLinkVars}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="link"
                    rel="noopener noreferrer">
                    {link.title}
                  </Link>
                </motion.div>
              ))}
              <motion.span
                onClick={closeMenu}
                variants={mobileLinkVars}
                className="flex justify-center items-center gap-2 mt-4">
                <Button className="rounded-full" asChild>
                  <Link href="/auth/login">Login</Link>
                </Button>
                <Button variant="outline" className="rounded-full" asChild>
                  <Link href="/auth/register">Register</Link>
                </Button>
              </motion.span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Desktop Menu */}

      <nav className="bg-blue-900 p-4 md:p-6 pt-0 md:px-8 relative left-1/2 transform -translate-x-1/2 flex items-center justify-between">
        <Link
          href="/"
          rel="noopener noreferrer"
          className="hover:scale-110 duration-200">
          <Image src="/logo.png" alt="logo" width={50} height={50} />
        </Link>
        <div className="uppercase absolute left-1/2 transform -translate-x-1/2 lg:flex hidden gap-12 font-semibold items-baseline text-white">
          {navLinks.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              className="link"
              rel="noopener noreferrer">
              {link.title}
            </Link>
          ))}
        </div>
        <div className="gap-2 flex justify-center items-center">
          <Button
            onClick={toggleMenu}
            variant="ghost"
            size="icon"
            className="md:hidden text-white active:scale-50 transition-transform duration-150 ease-in-out">
            <FaBars />
          </Button>
          <span className="hidden md:flex justify-center items-center gap-2">
            <Button className="rounded-full" size="icon">
              <Bell />
            </Button>
          </span>
        </div>
      </nav>
    </header>
  );
}
