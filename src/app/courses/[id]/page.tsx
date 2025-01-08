import { getCourseData } from "@/utils/getCourseData";
import CourseDescriptionPage from "@/components/CourseDescriptionPage";
import { notFound } from "next/navigation";

export default async function CoursePage({
  params,
}: {
  params: { id: string };
}) {
  const course = await getCourseData(params.id);

  if (!course) {
    notFound();
  }

  return <CourseDescriptionPage course={course} />;
}
