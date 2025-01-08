import { getCourseData } from "@/utils/getCourseData";
import CourseDescriptionPage from "@/components/CourseDescriptionPage";
import { notFound } from "next/navigation";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = await getCourseData(id);

  if (!course) {
    notFound();
  }

  return <CourseDescriptionPage course={course} />;
}
