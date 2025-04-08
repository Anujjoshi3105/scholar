"use client";

import {
  Star,
  Clock,
  BarChart,
  Globe,
  CheckCircle,
  User,
  PlayCircle,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { Course, Lesson } from "@/types/course";
import Image from "next/image";
import CourseDialog from "@/section/CourseForm";

export default function CourseDescriptionPage({ course }: { course: Course }) {
  const {
    title,
    subtitle,
    category,
    level,
    rating,
    totalReviews,
    language,
    sections,
    totalDuration,
    instructor,
    learningOutcomes,
    price,
    discountedPrice,
    reviews,
  } = course;

  const totalLessons = sections.reduce(
    (total, section) => total + section.lessons.length,
    0
  ) as number;

  return (
    <div className="max-w-6xl mx-auto p-6 pt-36">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <p className="text-xl mb-4">{subtitle}</p>
          <div className="flex items-center mb-4">
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
              {category}
            </span>
            <span className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
              {level}
            </span>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              <span>{rating.toFixed(1)}</span>
              <span className="text-gray-500 ml-1">
                ({totalReviews} reviews)
              </span>
            </div>
          </div>
          <div className="flex items-center mb-6">
            <Clock className="w-4 h-4 mr-2" />
            <span>{totalDuration}</span>
            <Globe className="w-4 h-4 ml-4 mr-2" />
            <span>{language}</span>
          </div>

          <h2 className="text-2xl font-bold mb-4">Course Content</h2>
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span>
                {sections.length} sections • {totalLessons} lessons •{" "}
                {totalDuration} total length
              </span>
              <Button variant="link">Expand all sections</Button>
            </div>
            <Progress value={33} className="w-full" />
          </div>
          <Accordion type="single" collapsible className="w-full">
            {sections.map((section, index) => (
              <AccordionItem value={`section-${index}`} key={index}>
                <AccordionTrigger>
                  <div className="flex justify-between w-full">
                    <span>{section.title}</span>
                    <span className="text-sm text-gray-500">
                      {section.totalDuration}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-4">
                    {section.lessons.map(
                      (lesson: Lesson, lessonIndex: number) => (
                        <li
                          key={lessonIndex}
                          className="border-b border-gray-200 pb-4 last:border-b-0">
                          <div className="flex items-start">
                            {lessonIndex === 0 ? (
                              <PlayCircle className="w-6 h-6 mr-2 text-blue-500 flex-shrink-0 mt-1" />
                            ) : (
                              <Lock className="w-6 h-6 mr-2 text-gray-400 flex-shrink-0 mt-1" />
                            )}
                            <div className="flex-grow">
                              <div className="flex justify-between">
                                <span className="font-medium">
                                  {lesson.title}
                                </span>
                                <span className="text-sm text-gray-500">
                                  {lesson.duration}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">
                                {lesson.description}
                              </p>
                            </div>
                          </div>
                        </li>
                      )
                    )}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            What you&apos;ll learn
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {learningOutcomes.map((outcome, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-1" />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Instructor</h2>
          <div className="flex items-start">
            <Image
              src={instructor.profilePicture}
              alt={instructor.name}
              className="w-16 h-16 rounded-full mr-4"
              width={100}
              height={100}
            />
            <div>
              <h3 className="text-xl font-semibold">{instructor.name}</h3>
              <p className="text-gray-600 mb-2">{instructor.bio}</p>
              <ul className="list-disc list-inside">
                {instructor.qualifications.map((qualification, index) => (
                  <li key={index}>{qualification}</li>
                ))}
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Student Reviews</h2>
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-2">
                    <User className="w-6 h-6 mr-2" />
                    <span className="font-semibold">{review.userName}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p>{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="md:col-span-1">
          <Card className="sticky top-6">
            <CardContent className="p-6">
              <div className="text-3xl font-bold mb-4">
                {discountedPrice ? (
                  <>
                    <span className="line-through text-gray-400 mr-2">
                      ${price}
                    </span>
                    ${discountedPrice}
                  </>
                ) : (
                  `$${price}`
                )}
              </div>
              <CourseDialog />
              <ul className="space-y-2">
                <li className="flex items-center">
                  <BarChart className="w-5 h-5 mr-2" />
                  <span>{level} level</span>
                </li>
                <li className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{totalDuration} total</span>
                </li>
                <li className="flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  <span>{language}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
