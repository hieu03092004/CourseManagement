import LessonItem from "./LessonItem";

interface Lesson {
  id: number;
  title: string;
  videoUrl: string;
  duration: number;
  orderIndex: number;
}

type Props = {
  isCollapsed: boolean;
  lessons: Lesson[];
};

function LessonList({ isCollapsed, lessons }: Props) {
  const collapsed = "max-h-0 opacity-0 -translate-y-2 pointer-events-none";
  const expanded =
    "max-h-[1000px] opacity-100 translate-y-0 pointer-events-auto";

  return (
    <ul
      className={`overflow-hidden transform transition-[max-height,opacity,transform] duration-300 ease-in-out ${
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
