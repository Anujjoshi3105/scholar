"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import courses from "@/data/courses.json";
import CourseCard from "@/section/Courses/CourseCard";

export default function Courses() {
  const [showAll, setShowAll] = useState(false);
  const displayedCourses = courses;

  return (
    <section className="pt-36" id="courses">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Popular Courses</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        {!showAll && courses.length > 6 && (
          <div className="mt-8 text-center">
            <Button
              onClick={() => setShowAll(true)}
              variant="default"
              size="lg">
              View All Courses
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
