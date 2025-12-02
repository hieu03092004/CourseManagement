"use client";
import Link from "next/link";

export default function Section1() {
  return (
    <>
      <div className="breadcrumbs bg-primary px-[135px] w-full p-4 border border-t-gray-500 border-b-0">
        <ul className="list-disc list-inside text-white text-[10px] flex gap-2 [&>li:first-child]:list-none">
          <li>
            <Link href="/">Trang chủ</Link>
          </li>
          <li>
            <Link href="/">Khoá học online</Link>
          </li>
          <li>
            <Link href="/">Học lập trình C..</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
