"use client";
import { useState } from "react";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import LessonList from "../Lesson/LessonList";
import { ITopic } from "@/app/(client)/interfaces/Course/ICourseDetail";

type Props = {
  topic: ITopic;
};

function ChapterItem({ topic }: Props) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed((c) => !c);
  };

  return (
    <>
      <div className="chapter-item px-[8] mb-1">
        <div className="chapter-title bg-sky-500/100 p-[5px] text-[14px] flex justify-between text-white font-medium">
          <span>{topic.title.toUpperCase()}</span>
          <div className="flex items-center gap-4">
            <span className="me-[10px]">Quizz</span>
            <span className="me-[10px]">Timeline</span>
            <button
              type="button"
              onClick={toggleCollapse}
              className="cursor-pointer min-w-[21px]"
            >
              <IoMdArrowDropdownCircle
                className={` cursor-pointer ${
                  collapsed ? "transform rotate-90" : ""
                }`}
              />
            </button>
          </div>
         
        </div>

        <LessonList isCollapsed={collapsed} lessons={topic.lessons} />
      </div>
    </>
  );
}
export default ChapterItem;
