import { Course } from "@/types/course";
import coursesData from "@/data/courses.json";

export async function getCourseData(id: string): Promise<Course | null> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const course = coursesData.find((course) => course.id === id) as Course;
  return course || null;
}
