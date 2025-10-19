export const isTeacher = (userId?: string | null) => {
  console.log("isTeacher userId:", userId);
  console.log("Expected TEACHER_ID:", process.env.NEXT_PUBLIC_TEACHER_ID);
  return userId === process.env.NEXT_PUBLIC_TEACHER_ID;
};
