import ChapterItem from "./ChapterItem";

interface Lesson {
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
  topics: Topic[];
};

function ChapterList({ topics }: Props) {
  return (
    <>
      <div className="chapter-list w-[840px] mx-[135px] my-[50px] mb-[50px]">
        {topics.map((topic, index) => (
          <ChapterItem key={index} topic={topic} />
        ))}
      </div>
    </>
  );
}
export default ChapterList;
