import { Nav } from "@/components/landing/nav";
import { Hero } from "@/components/landing/hero";
import { Course } from "@/components/landing/course";
import { MockTests } from "@/components/landing/mock-tests";
import { Teacher } from "@/components/landing/teacher";
import { Prebook } from "@/components/landing/prebook";
import { Faq } from "@/components/landing/faq";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex flex-col">
        <Hero />
        <Course />
        <MockTests />
        <Teacher />
        <Prebook />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
