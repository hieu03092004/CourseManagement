import Link from "next/link";
import { FaBook, FaCalendar, FaClock, FaStar, FaUser } from "react-icons/fa6";
export default function CardItem() {
  return (
    <>
      {" "}
      <Link href="/">
        <div className="bg-white rounded-[10px]">
          <div className="">
            <img
              src="/src/assets/images/course_img_demo.png"
              className="rounded-tr-[5px] rounded-tl-[5px]"
            ></img>
          </div>
          <div className="px-[25px] py-[20px] rounded-bl-[10px] rounded-br-[10px]">
            <div className="card_review mb-[10px] flex justify-start">
              <div className="flex justify-start">
                <FaStar className="text-[13px] text-[#FF9747]" />
                <FaStar className="text-[13px] text-[#FF9747]" />
                <FaStar className="text-[13px] text-[#FF9747]" />
                <FaStar className="text-[13px] text-[#FF9747]" />
                <FaStar className="text-[13px] text-[#FF9747]" />
              </div>
              <span className="text-[14px] font-[500]">(350 đánh giá)</span>
            </div>
            <div className="card_title">
              <h4 className="text-[18px] font-[700] mb-[15px] text-primary">
                Lập trình node JS
              </h4>
              <div className="mb-[14px]">
                <ul>
                  <li className="text-[13px] my-[10px] flex justify-start text-body">
                    <FaBook className="mr-[5px] text-secondary" />
                    <strong className="mr-[5px]">50</strong>
                    <span>Bài Giảng</span>
                  </li>
                  <li className="text-[13px] my-[10px] flex justify-start text-body">
                    <FaUser className="text-secondary mr-[5px]" />
                    <strong className="mr-[5px]">36</strong>
                    <span>Học viên</span>
                  </li>
                  <li className="text-[13px] my-[10px] flex justify-start text-body">
                    <FaCalendar className="text-secondary mr-[5px]" />
                    <span className="mr-[5px]">Khai giảng</span>
                    <strong>29/10/2025</strong>
                  </li>
                  <li className="text-[13px] my-[10px] flex justify-start text-body">
                    <FaCalendar className="text-secondary mr-[5px]" />
                    <span className="mr-[5px]">Lịch học</span>
                    <strong>Thứ 2,Thứ 4,Thứ 6</strong>
                  </li>
                  <li className="text-[13px] my-[10px] flex justify-start text-body">
                    <FaClock className="text-secondary mr-[5px]" />
                    <span className="mr-[5px]">Giờ học</span>
                    <strong>21h-23h</strong>
                  </li>
                </ul>
              </div>
              <div className="flex justify-start gap-[10px] items-center">
                <div className="">
                  <img
                    className="max-w-[40px] w-[40px] height-[40px] object-cover rounded-full border-2 border-primary__opacity pd-[2px]"
                    src="/src/assets/images/avatar_demo.png"
                  ></img>
                </div>
                <div className="text-[13px] font-[500] text-heading">
                  Đội ngũ 28 Tech
                </div>
              </div>
              <div className="card_botttom">
                <div className="price">
                  <span className="text-[16px] font-[700] text-main">
                    7,000,000
                  </span>
                  <span className="text-[16px] font-[700] text-main">đ</span>
                  <span className="text-[14px] ml-[8px] font-[600] text-black line-through opacity-50">
                    14,000,000
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
