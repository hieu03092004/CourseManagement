import Link from "next/link";
import { FaBook, FaClock, FaStar, FaUser } from "react-icons/fa6";
import { ICourse } from "../../interfaces/Course/ICourse";

interface CardItemProps {
  course: ICourse;
}

export default function CardItem({ course }: CardItemProps) {
  const roundedRating = parseFloat(course.rating.toFixed(1));
  const fullStars = Math.floor(roundedRating);
  const partialStarPercentage = (roundedRating % 1) * 100;

  const renderStars = () => {
    return Array.from({ length: 5 }).map((_, index) => {
      if (index < fullStars) {
        return (
          <FaStar
            key={index}
            className="text-[13px] text-[#FF9747]"
          />
        );
      } else if (index === fullStars && partialStarPercentage > 0) {
        return (
          <div key={index} className="relative inline-block" style={{ width: '13px', height: '13px' }}>
            <FaStar className="text-[13px] text-gray-300 absolute top-0 left-0" />
            <div
              className="absolute top-0 left-0 overflow-hidden"
              style={{ width: `${partialStarPercentage}%`, height: '13px' }}
            >
              <FaStar className="text-[13px] text-[#FF9747]" />
            </div>
          </div>
        );
      } else {
        return (
          <FaStar
            key={index}
            className="text-[13px] text-gray-300"
          />
        );
      }
    });
  };

  return (
    <>
      <Link href={`/course/${course.id}`} className="block transition-transform duration-300 hover:scale-105">
        <div className="bg-white rounded-[10px]">
          <div className="">
            <img
              src={course.image}
              className="h-[233px] w-full object-cover rounded-tr-[5px] rounded-tl-[5px]"
              alt={course.name}
            />
          </div>
          <div className="px-[25px] py-[20px] rounded-bl-[10px] rounded-br-[10px]">
            <div className="card_review mb-[10px] flex justify-start">
              <div className="flex justify-start">
                {renderStars()}
              </div>
              <span className="text-[14px] font-[500]">({course.reviews} đánh giá)</span>
            </div>
            <div className="card_title">
              <h4 className="text-[18px] font-[700] mb-[15px] text-primary">
                {course.name}
              </h4>
              <div className="mb-[14px]">
                <ul>
                  <li className="text-[13px] my-[10px] flex justify-start text-body">
                    <FaBook className="mr-[5px] text-secondary" />
                    <strong className="mr-[5px]">{course.lectures}</strong>
                    <span>Bài Giảng</span>
                  </li>
                  <li className="text-[13px] my-[10px] flex justify-start text-body">
                    <FaUser className="text-secondary mr-[5px]" />
                    <strong className="mr-[5px]">{course.students}</strong>
                    <span>Học viên</span>
                  </li>
                  <li className="text-[13px] my-[10px] flex justify-start text-body">
                    <FaClock className="text-secondary mr-[5px]" />
                    <span className="mr-[5px]">Thời hạn</span>
                    <strong>{course.duration} ngày</strong>
                  </li>
                </ul>
              </div>
              <div className="flex justify-start gap-[10px] items-center">
                <div className="">
                  <img
                    className="max-w-[40px] w-[40px] height-[40px] object-cover rounded-full border-2 border-primary__opacity pd-[2px]"
                    src={course.avavatarInstructor || "/src/assets/images/avatar_demo.png"}
                    alt={course.instructor}
                  />
                </div>
                <div className="text-[13px] font-[500] text-heading">
                  {course.instructor}
                </div>
              </div>
              <div className="card_botttom">
                <div className="price">
                  <span className="text-[16px] font-[700] text-main">
                    {course.price.toLocaleString('vi-VN')}
                  </span>
                  <span className="text-[16px] font-[700] text-main">đ</span>
                  <span className="text-[14px] ml-[8px] font-[600] text-black line-through opacity-50">
                    {course.originalPrice.toLocaleString('vi-VN')}
                    <span className="currency-symbol">đ</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
