import Courses from "@/section/Home/Courses";
import FAQ from "@/section/Home/Faq";
import Hero from "@/section/Home/Hero";
import Testimonial from "@/section/Home/Testimonial";

export default function Home() {
  return (
    <main>
      <Hero />
      <Courses />
      <FAQ />
      <Testimonial />
    </main>
  );
}
