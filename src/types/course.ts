export interface Instructor {
  name: string;
  bio: string;
  profilePicture: string;
  qualifications: string[];
}

export interface Lesson {
  title: string;
  duration: string;
  description: string;
}

export interface CourseSection {
  title: string;
  totalDuration: string;
  lessons: Lesson[];
}

export interface Review {
  userName: string;
  rating: number;
  comment: string;
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  students: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
  totalReviews: number;
  language: string;
  bestSeller: boolean;
  sections: CourseSection[];
  totalDuration: string;
  instructor: Instructor;
  learningOutcomes: string[];
  price: number;
  discountedPrice?: number;
  enrollmentLink: string;
  reviews: Review[];
}
