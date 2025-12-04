import ChapterItem from "./ChapterItem";
import { ITopic } from "@/app/(client)/interfaces/Course/ICourseDetail";

type Props = {
  topics: ITopic[];
};

function ChapterList({ topics }: Props) {
  return (
    <>
      <div className="chapter-list w-[840px] mx-[135px] my-[50px] mb-[50px]">
        {topics
          .filter((topic) => topic.lessons.length > 0)
          .map((topic, index) => (
            <ChapterItem key={index} topic={topic} />
          ))}
      </div>
    </>
  );
}
export default ChapterList;
