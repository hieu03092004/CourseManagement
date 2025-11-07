"use client";
import ChapterList from "@/app/(client)/components/Chapter/ChapterList";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
export default function CourseDetailPage() {
  const rating = 5.0;
  return (
    <>
      <div>
        <Section1 />
        <Section2 rating={rating} />
        <ChapterList />
        <Section3 rating={rating} />
      </div>
    </>
  );
}
