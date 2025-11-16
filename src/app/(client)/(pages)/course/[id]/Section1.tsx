"use client";

export default function Section1() {
  return (
    <>
      <div className="breadcrumbs bg-primary  px-[135px] w-full p-4  border border-t-gray-500 border-b-0">
        <ul className="list-disc list-inside text-white text-[10px] flex gap-2 [&>li:first-child]:list-none">
          <li>
            <a href="/">Trang chủ</a>
          </li>
          <li>
            <a href="/">Khoá học online</a>
          </li>
          <li>
            <a href="/">Học lập trình C..</a>
          </li>
        </ul>
      </div>
    </>
  );
}
