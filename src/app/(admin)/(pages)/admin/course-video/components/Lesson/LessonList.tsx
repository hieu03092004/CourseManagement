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
