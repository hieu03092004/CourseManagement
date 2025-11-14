"use client";
import { useState } from "react";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import LessonList from "../Lesson/LessonList";

interface Lesson {
  id: number;
  title: string;
  videoUrl: string;
  duration: number;
  orderIndex: number;
}

interface Topic {
  title: string;
  orderIndex: number;
  lessons: Lesson[];
}

type Props = {
  topic: Topic;
};

function TopicItem({ topic }: Props) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed((c) => !c);
  };

  return (
    <>
      <div className="chapter-item  mb-1">
        <div className="chapter-title bg-sky-500/100 p-[5px] text-[14px] flex justify-between text-white font-medium">
          <span>{topic.title.toUpperCase()}</span>
          <div className="flex items-center gap-4">
            <span className="me-[10px]">Hành động</span>
            <button type="button" onClick={toggleCollapse} className="cursor-pointer min-w-[21px]">
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
export default TopicItem;
