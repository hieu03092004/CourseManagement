"use client";
import { use, useState, useEffect } from "react";
import Section1 from "./Section1";
import TopicList from "../../components/Topic/TopicList";
import {
  ICourseDetailsPageProps,
  ICourseDetailData
} from "../../../interfaces/CourseVideo/ICourseVideo";
import { loadCourseDetailData } from "../../services/getData";

export default function CourseDetailsPage({ params }: ICourseDetailsPageProps) {
  const { id } = use(params);
  const [courseData, setCourseData] = useState<ICourseDetailData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await loadCourseDetailData(id);
        if (data) {
          setCourseData(data);
        }
      } catch (error) {
        console.error("Error loading course data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <p className="text-red-600">Không thể tải dữ liệu khóa học</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <Section1
          title={courseData.title}
          description={courseData.description}
          rating={courseData.rating}
          reviewsCount={courseData.reviews}
          totalStudents={courseData.studentCount}
        />
        <TopicList topics={courseData.topics} />
      </div>
    </div>
  );
}

