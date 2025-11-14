import Link from "next/link";
import CourseBadge from "../Badge/CourseBadge";

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
  course: Course;
};

export default function CourseItem({ course }: Props) {
  const discountPercent = course.discount || Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);

  return (
    <div className="group relative">
      <Link
        href={`/course/${course.id}`}
        className="block bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
      >
        <div className="relative">
          <div className="relative overflow-hidden">
            <img
              src={course.image}
              alt={course.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>

          <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
            {course.isFeatured && (
              <CourseBadge text="Nổi Bật" bgColor="purple1" />
            )}
            {discountPercent > 0 && (
                <CourseBadge text={`-${discountPercent}%`} bgColor="green1" textColor="dark1" />
            )}
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-base font-medium text-gray-900 line-clamp-2 min-h-[3rem] mb-3">
            {course.name}
          </h3>

          <div className="flex flex-wrap gap-3 text-xs text-gray-600 mb-4">
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
              </svg>
              <span>{course.lectures} bài giảng</span>
            </div>

            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span>{course.duration}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
              <span>{course.students} học viên</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-secondary">
              {course.price.toLocaleString('vi-VN')} VND
            </div>
            <div className="text-sm text-gray-400 line-through">
              {course.originalPrice.toLocaleString('vi-VN')} VND
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}