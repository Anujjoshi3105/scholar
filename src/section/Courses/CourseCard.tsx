import Image from "next/image";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";
import { FaStar } from "react-icons/fa6";
import Link from "next/link";
import { Course } from "@/types/course";

export default function CourseCard({ course }: { course: Course }) {
  if (!course) return null;

  const renderStars = (rating: number) => {
    const filledStars = Math.floor(rating);
    return [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={`h-4 w-4 ${
          i < filledStars ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };
  const totalLessons = course.sections.reduce(
    (total, section) => total + section.lessons.length,
    0
  );

  return (
    <Link href={`/courses/${course.id}`}>
      <Card className="flex flex-col hover:-translate-y-2 duration-200 h-[480px]">
        <CardHeader className="relative p-0">
          <Image
            src={course.image}
            alt={course.title}
            width={500}
            height={500}
            className="rounded-t-lg w-full h-[250px]"
          />
          {course.bestSeller && (
            <Badge className="absolute top-2 right-2 bg-yellow-400">
              Best Seller
            </Badge>
          )}
        </CardHeader>
        <CardContent className="flex-grow pt-4">
          <CardTitle className="text-xl font-semibold">
            {course.title}
          </CardTitle>
          <p className="text-sm text-muted-foreground mb-2">
            {course.subtitle}
          </p>
          <p className="text-sm font-medium mb-2">{course.instructor.name}</p>
          <div className="flex items-center mb-2">
            <span className="text-yellow-500 mr-1">
              {course.rating.toFixed(1)}
            </span>
            <div className="flex">{renderStars(course.rating)}</div>
            <span className="text-sm text-muted-foreground ml-1">
              ({course.students.toLocaleString()} students)
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold">
              ${course.price.toFixed(2)}
            </span>
            <Badge className="bg-blue-900 text-white">{course.level}</Badge>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className="flex items-center text-sm text-muted-foreground">
            <BookOpen className="w-4 h-4 mr-1" />
            {totalLessons} lessons
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
