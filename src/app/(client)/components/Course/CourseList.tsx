import CourseItem from "./CourseItem";

interface Course {
  id: string;
  name: string;
  description: string;
  instructor: string;
  lectures: number;
  students: number;
  duration: string;
  price: number;
  originalPrice: number;
  image: string;
  discount?: number;
  isFeatured?: boolean;
}

type Props = {
  courses: Course[];
};

export default function CourseList({ courses }: Props) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseItem key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}