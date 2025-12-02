import LessonItem from "./LessonItem";
import { ILesson } from "@/app/(client)/interfaces/ILesson";

type Props = {
  isCollapsed: boolean;
  lessons: ILesson[];
};

function LessonList({ isCollapsed, lessons }: Props) {
  const collapsed = "hidden pointer-events-none";
  const expanded =
    "animate-tab-fade-in opacity-100 pointer-events-auto";

  return (
    <ul
      className={`${
        isCollapsed ? expanded : collapsed
      }`}
    >
      {lessons.map((lesson, index) => (
        <LessonItem key={index} lesson={lesson} />
      ))}
    </ul>
  );
}

export default LessonList;
