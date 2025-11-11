"use client";
import Link from "next/link";
import { FaCirclePlay } from "react-icons/fa6";

interface Lesson {
  id: number;
  title: string;
  videoUrl: string;
  duration: number;
  orderIndex: number;
}

type Props = {
  lesson: Lesson;
};

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function LessonItem({ lesson }: Props) {
  return (
    <li className="lesson-item flex justify-between text-[14px] py-2 ps-2 border-b border-gray-300 last:border-b-0">
      <div className="lesson-item-title flex gap-2 items-center me-[150px]">
        <FaCirclePlay />
        <span>{lesson.title}</span>
      </div>
      <div className="flex gap-4">
        <div className="lesson-item-watch">
          <Link
            href={`/admin/quizzles/create/${lesson.id}`}
            className="underline decoration-sky-500 text-sky-500/100"
          >
            Thêm bài quiz
          </Link>
        </div>
        <div className="lesson-item-duration">{formatDuration(lesson.duration)}</div>
      </div>
    </li>
  );
}

export default LessonItem;
