import TopicItem from "./TopicItem";

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
  topics: Topic[];
};

function TopicList({ topics }: Props) {
  return (
    <>
      <div className="chapter-list w-[full] pt-[30px]">
        {topics.map((topic, index) => (
          <TopicItem key={index} topic={topic} />
        ))}
      </div>
    </>
  );
}
export default TopicList;
