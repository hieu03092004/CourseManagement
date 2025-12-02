"use client";
import { useMemo, useState } from "react";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { LiaComment } from "react-icons/lia";

interface Review {
  userName: string;
  comment: string;
  rating: number;
}

type props = {
  rating: number;
  reviews: Review[];
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 3);
}

function FormInner() {
  const [ratingValue, setRatingValue] = useState(5);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = "Vui lòng nhập họ và tên.";
    if (!phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    console.log({ ratingValue, comment, name, phone, email });
    setComment("");
    setName("");
    setPhone("");
    setEmail("");
    setRatingValue(5);
    setErrors({});
    alert("Cảm ơn bạn đã gửi đánh giá (demo)");
  };

  return (
    <form onSubmit={handleSubmit} className="p-[20px] [&>*]:mt-2.5">
      <div className="text-[20px] font-[600] text-primary mt-0">
        Gửi đánh giá của bạn
      </div>
      <div>
        <div className="text-sm font-medium text-slate-700 mb-2">
          1. Đánh giá của bạn về khóa học
        </div>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((i) => (
            <button
              key={i}
              type="button"
              aria-label={`${i} sao`}
              onClick={() => setRatingValue(i)}
              className={`p-1 ${
                i <= ratingValue ? "text-yellow-400" : "text-slate-300"
              }`}
            >
              {i <= ratingValue ? (
                <FaStar size={18} />
              ) : (
                <FaRegStar size={18} />
              )}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="textarea"
          className="block text-sm font-medium text-slate-700 mb-2"
        >
          2. Viết cảm nhận của bạn về khóa học
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Cảm nhận của bạn..."
          className="w-full h-36 p-4 rounded-md border border-slate-200 bg-white resize-none focus:outline-none focus:ring-2 focus:ring-sky-300"
        />
      </div>

      <div>
        <div className="text-sm font-medium text-slate-700 mb-4">
          3. Thông tin cá nhân của bạn (thông tin của bạn sẽ được bảo mật)
        </div>

        <span className="block text-sm text-slate-700 mb-2">Họ và tên:*</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Họ và tên"
          className="w-full p-3 rounded-md border border-slate-200 mb-2 focus:outline-none focus:ring-2 focus:ring-sky-300 bg-white"
        />
        {errors.name && (
          <div className="text-sm text-red-500 mb-2">{errors.name}</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="block text-sm text-slate-700 mb-2">
              Số điện thoại:*
            </span>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Số điện thoại"
              className="w-full p-3 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-300 bg-white"
            />
            {errors.phone && (
              <div className="text-sm text-red-500 mt-2">{errors.phone}</div>
            )}
          </div>

          <div>
            <label className="block text-sm text-slate-700 mb-2">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-300 bg-white"
              readOnly
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          className="px-6 py-3 rounded-md  text-white shadow bg-primary "
        >
          Gửi đánh giá
        </button>
      </div>
    </form>
  );
}

export default function Section3({ rating, reviews }: props) {
  const [formOpen, setFormOpen] = useState(false);

  const ratingBreakdown = useMemo(() => {
    const total = reviews.length;
    if (total === 0)
      return [
        { stars: 5, percent: 0 },
        { stars: 4, percent: 0 },
        { stars: 3, percent: 0 },
        { stars: 2, percent: 0 },
        { stars: 1, percent: 0 },
      ];

    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((review) => {
      const roundedRating = Math.round(review.rating) as 1 | 2 | 3 | 4 | 5;
      if (roundedRating >= 1 && roundedRating <= 5) {
        counts[roundedRating]++;
      }
    });

    return [
      { stars: 5, percent: Math.round((counts[5] / total) * 100) },
      { stars: 4, percent: Math.round((counts[4] / total) * 100) },
      { stars: 3, percent: Math.round((counts[3] / total) * 100) },
      { stars: 2, percent: Math.round((counts[2] / total) * 100) },
      { stars: 1, percent: Math.round((counts[1] / total) * 100) },
    ];
  }, [reviews]);

  return (
    <>
      <div className=" mx-[135px] px-[8] rating h-auto mb-50 w-auto">
        <h1 className="text-[20px] font-bold mb-8 text-primary">
          Đánh giá của học viên
        </h1>
        <div className="rating-overall flex justify-center items-center text-center bg-gray-100 rounded-lg h-full py-4 w-full ">
          <div className="w-1/4 flex-col justify-center items-center text-yellow-400 ">
            <span className="font-bold text-[36px] ">{rating}</span>
            <span className=" flex gap-1 justify-center items-center text-[25px] ">
              {[1, 2, 3, 4, 5].map((i) =>
                rating >= i ? (
                  <FaStar className="" key={i} />
                ) : rating >= i - 0.5 ? (
                  <FaStarHalfAlt key={i} />
                ) : (
                  <FaRegStar key={i} />
                )
              )}
            </span>
          </div>
          <div className="w-2/4 py-[20px] px-[10px] ">
            {ratingBreakdown.map((r) => (
              <div key={r.stars} className="flex items-center gap-3 mb-2">
                <div className="flex items-center w-14 text-sm text-gray-700">
                  <span className="w-6 text-right mr-2">{r.stars}</span>
                  <FaRegStar className="text-yellow-400" />
                </div>

                <div className="w-[calc(100%-60px)] h-4 bg-gray-200 rounded overflow-hidden">
                  <div
                    className="h-4 bg-sky-500 "
                    style={{ width: `${r.percent}% ` }}
                  />
                </div>

                <div className="w-12 text-sm text-gray-700 text-right ml-2">
                  {r.percent}%
                </div>
              </div>
            ))}
          </div>
          <div className="w-1/4">
            <button
              type="button"
              onClick={() => setFormOpen((s) => !s)}
              aria-expanded={formOpen}
              className="bg-sky-500 hover:bg-sky-700 px-[50px] py-4 rounded-xl text-white text-[16px]"
            >
              Đánh giá
            </button>
          </div>
        </div>
        <div
          className={`mt-5 form-rating bg-gray-100 overflow-hidden transition-[max-height,opacity,transform] duration-300 ease-in-out  ${
            formOpen
              ? "max-h-[1200px] opacity-100 translate-y-0 pointer-events-auto rounded-md "
              : "max-h-0 opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <FormInner />
        </div>
        <div className="comment-section mt-1">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="comment-item flex py-8 border-b border-gray-300 last:border-b-0"
            >
              <div className="w-1/5 in4-comment flex flex-col text-[13px] justify-between items-center">
                <span className="w-[50px] rounded-[50%] bg-sky-500 h-[50px] text-center leading-[53px] text-white ">
                  {getInitials(review.userName)}
                </span>
                <span className="font-[600] mt-1 text-primary">
                  {review.userName}
                </span>
                <span className="italic text-primary">16 ngày trước</span>
              </div>
              <div className="w-4/5 flex flex-col">
                <span className=" flex gap-1 text-yellow-500 text-[14px]">
                  {[1, 2, 3, 4, 5].map((i) =>
                    review.rating >= i ? (
                      <FaStar className="" key={i} />
                    ) : review.rating >= i - 0.5 ? (
                      <FaStarHalfAlt key={i} />
                    ) : (
                      <FaRegStar key={i} />
                    )
                  )}
                </span>
                <span className="detail-comment text-[14px] mt-2 font-[400]">
                  {review.comment}
                </span>
                <span className="flex items-center gap-1 text-[13px] font-[600] ">
                  <LiaComment />
                  Trả lời
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
