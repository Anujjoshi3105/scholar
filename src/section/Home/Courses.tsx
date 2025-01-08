import Link from "next/link";
import { Button } from "@/components/ui/button";
import courses from "@/data/courses.json";
import CourseCard from "@/section/Courses/CourseCard";
import { GraduationCap } from "lucide-react";
import { Course } from "@/types/course";

export default function Courses() {
  return (
    <section className="py-12" id="courses">
      <div className="container mx-auto px-4 space-y-12">
        <header className="space-y-2 text-center">
          <h4 className="text-lg font-semibold text-blue-700 flex w-full items-center justify-center gap-2">
            <GraduationCap /> Explore Popular Courses
          </h4>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Recommended Courses
          </h2>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.slice(0, 6).map((course) => (
            <CourseCard key={course.id} course={course as Course} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button variant="default" size="lg" asChild>
            <Link href="/courses">View All Courses</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
