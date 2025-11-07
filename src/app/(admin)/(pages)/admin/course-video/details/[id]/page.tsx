import Link from "next/link";

interface PageProps {
  params: {
    id: string;
  };
}

export default function CourseDetailsPage({ params }: PageProps) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Chi tiết khóa học</h1>
      <Link href={`/admin/quizzles/create/${params.id}`} className="bg-white p-4 rounded-lg shadow block hover:shadow-lg transition-shadow">
        <p className="text-gray-600 mb-2">ID Khóa học:</p>
        <p className="text-3xl font-bold text-blue-600">{params.id}</p>
      </Link>
    </div>
  );
}

