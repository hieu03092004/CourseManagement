import LessonItem from "./LessonItem";

type props = { isCollapsed: boolean };

function LessonList({ isCollapsed }: props) {
  const collapsed = "max-h-0 opacity-0 -translate-y-2 pointer-events-none";
  const expanded =
    "max-h-[1000px] opacity-100 translate-y-0 pointer-events-auto";

  return (
    <ul
      className={`overflow-hidden transform transition-[max-height,opacity,transform] duration-300 ease-in-out ${
        isCollapsed ? expanded : collapsed
      }`}
    >
      <LessonItem />
      <LessonItem />
      <LessonItem />
    </ul>
  );
}

export default LessonList;
