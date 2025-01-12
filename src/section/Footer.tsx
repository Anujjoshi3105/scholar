"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import {
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "/api/send-email",
        { email, name: "scholar", message: "subscribe for newsletter" },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data) {
        throw new Error("Failed to send email");
      }

      toast("Message Sent", {
        description: "Thank you for your message. We'll get back to you soon!",
      });
      setEmail("");
    } catch {
      toast("Error", {
        description: `There was an error sending your message. Please try again. If the problem persists, please contact us directly at ${process.env.NEXT_PUBLIC_ADMIN_MAIL}.`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="w-full">
      {/* Newsletter Section */}
      <div className="container mx-auto py-16">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-12 bg-blue-800 text-primary-foreground rounded-3xl p-8 lg:p-12">
          <div className="flex-1 max-w-xl">
            <h2 className="text-3xl font-bold tracking-tight text-center lg:text-left">
              Stay Ahead with Scholar
            </h2>
            <p className="mt-4 text-primary-foreground/80 text-center lg:text-left">
              Subscribe to our newsletter for exclusive content, latest courses,
              and expert tips to accelerate your learning journey.
            </p>
            <form onSubmit={handleSubmit} className="mt-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <label htmlFor="email-input" className="sr-only">
                    Email address
                  </label>
                  <Input
                    id="email-input"
                    type="email"
                    placeholder="Enter your email..."
                    required
                    className="w-full bg-primary-foreground text-primary"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <Button type="submit" size="lg" disabled={loading}>
                  <Mail className="h-4 w-4" /> Subscribe
                </Button>
              </div>
            </form>
          </div>
          <div className="relative h-[250px] w-full lg:w-1/2 lg:h-[300px]">
            <Image
              src="/student.jpg"
              alt="Students collaborating"
              fill
              className="object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto py-16 border-t">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="relative w-10 h-10">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-bold text-primary link uppercase">
                Scholar
              </span>
            </Link>
            <p className="text-muted-foreground mb-6">
              Empowering millions of learners worldwide. Discover a world of
              knowledge with our cutting-edge online education platform.
            </p>
            <Button className="rounded-full">
              Contact us <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Explore</h3>
            <ul className="space-y-2">
              {["Home", "About Us", "Pricing", "Courses", "Pro Version"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="link text-muted-foreground hover:text-foreground transition-colors duration-200">
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              {[
                "Online Courses",
                "Certification Programs",
                "Learning Paths",
                "Instructor Tools",
                "Student Resources",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="link text-muted-foreground hover:text-foreground transition-colors duration-200">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              {[
                "Customer Support",
                "FAQs",
                "License",
                "Terms & Conditions",
                "Privacy Policy",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="link text-muted-foreground hover:text-foreground transition-colors duration-200">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            All rights are reserved by&nbsp;
            <Link href="/" className="link">
              Scholar
            </Link>
            &nbsp;© {new Date().getFullYear()}
          </p>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Link href="#">
                <Facebook />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Link href="#">
                <Twitter />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Link href="#">
                <Instagram />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Link href="#">
                <Linkedin />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
