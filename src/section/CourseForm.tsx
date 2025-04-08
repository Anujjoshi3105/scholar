"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import axios from "axios";
import { FormEvent, useState } from "react";

export default function CourseDialog() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    education: "",
    note: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/enroll-course", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.data) throw new Error("Enrollment failed");

      toast("Enrollment Successful", {
        description:
          "Thank you for enrolling! We’ll contact you with further details.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        course: "",
        education: "",
        note: "",
      });

      setOpen(false);
    } catch {
      toast("Error", {
        description: `There was an error with your enrollment. Please try again or contact us at ${process.env.NEXT_PUBLIC_ADMIN_MAIL}.`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Enroll Now</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-center">Course Enrollment</DialogTitle>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-4">
            <Input
              disabled={loading}
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              disabled={loading}
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              disabled={loading}
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <Input
              disabled={loading}
              name="course"
              placeholder="Course Interested In"
              value={formData.course}
              onChange={handleChange}
              required
            />
            <Input
              disabled={loading}
              name="education"
              placeholder="Educational Background"
              value={formData.education}
              onChange={handleChange}
              required
            />
            <Textarea
              disabled={loading}
              name="note"
              placeholder="Why are you interested?"
              value={formData.note}
              onChange={handleChange}
              className="min-h-[100px]"
            />
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader className="mr-2 animate-spin" />
                  Enrolling...
                </>
              ) : (
                "Submit Enrollment"
              )}
            </Button>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
