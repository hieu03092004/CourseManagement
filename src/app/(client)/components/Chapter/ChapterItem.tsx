"use client";
import { useState } from "react";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import LessonList from "../Lesson/LessonList";

function ChapterItem() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed((c) => !c);
  };
  return (
    <>
      <div className="chapter-item px-[8] mb-1">
        <div className="chapter-title bg-sky-500/100 p-[5px] text-[14px] flex justify-between text-white font-medium">
          <span>PHẦN 1 : KIỂU DỮ LIỆU, BIẾN, VÒNG LẶP, HÀM</span>
          <span className="ms-[80px] ">Timeline</span>
          <button type="button" onClick={toggleCollapse} className="ml-2">
            <IoMdArrowDropdownCircle
              className={` cursor-pointer ${
                collapsed ? "transform rotate-90" : ""
              }`}
            />
          </button>
        </div>

        <LessonList isCollapsed={collapsed} />
      </div>
    </>
  );
}
export default ChapterItem;
