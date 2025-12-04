"use client";
import { useEffect, useState } from "react";
import CardItem from "./CardItem";
import { ICourse } from "../../interfaces/Course/ICourse";
import { get } from "@/app/(admin)/ultils/request";
import { handleResponse } from "@/helpers/api/response/handleResponse";
import { IApiResponse } from "@/helpers/api/response/IResponse";

export default function CardList() {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await get("/admin/courses/getAll") as IApiResponse<ICourse[]>;
        const { isSuccess, data, error: responseError } = handleResponse(response);

        if (isSuccess && data) {
          setCourses(data);
        } else {
          const errorMessage = responseError?.message || "Không thể tải danh sách khóa học";
          setError(errorMessage);
          console.error("Error fetching courses:", responseError);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Có lỗi xảy ra khi tải danh sách khóa học";
        setError(errorMessage);
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-gray-600">Đang tải danh sách khóa học...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-red-600">Lỗi: {error}</p>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-gray-600">Không có khóa học nào.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-[30px] max-w-[1320px] mx-auto px-[7.5px]">
        {courses.map((course) => (
          <CardItem key={course.id} course={course} />
        ))}
      </div>
    </>
  );
}