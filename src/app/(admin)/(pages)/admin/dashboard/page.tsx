"use client";

import { useMemo, useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  buildTimeFilters,
  TimeFilterOption,
} from "../../../helpers/timeFilters";

type CourseMetric = {
  id: string;
  name: string;
  code: string;
  orders: number;
  revenue: number; // VND
};

type DashboardData = {
  totalRevenue: number;
  totalOrders: number;
  totalCourses: number;
  courses: CourseMetric[];
};
function buildPieColors(count: number): string[] {
  if (count <= 0) return [];

  return Array.from({ length: count }, (_, i) => {
    // Trải đều 0 → 360 độ trên vòng tròn màu
    const hue = Math.round((i * 360) / count);
    // Saturation & Lightness giữ cố định cho dễ nhìn
    return `hsl(${hue}, 70%, 50%)`;
  });
}

// Mock data cho từng lựa chọn – thực tế bạn sẽ lấy từ API BE
const MOCK_DATA_BY_FILTER: Record<string, DashboardData> = {
  "2025-10": {
    totalRevenue: 27_000_000,
    totalOrders: 140,
    totalCourses: 5,
    courses: [
      {
        id: "COURSE001",
        name: "Lập trình Web Fullstack",
        code: "COURSE001",
        orders: 40,
        revenue: 12_000_000,
      },
      {
        id: "COURSE002",
        name: "React + Next.js Cơ bản",
        code: "COURSE002",
        orders: 35,
        revenue: 8_000_000,
      },
      {
        id: "COURSE003",
        name: "Python cho người mới bắt đầu",
        code: "COURSE003",
        orders: 30,
        revenue: 4_000_000,
      },
      {
        id: "COURSE004",
        name: "Kỹ năng mềm cho lập trình viên",
        code: "COURSE004",
        orders: 20,
        revenue: 2_000_000,
      },
      {
        id: "COURSE005",
        name: "Phân tích dữ liệu bằng Python",
        code: "COURSE005",
        orders: 15,
        revenue: 1_000_000,
      },
    ],
  },
  "2025-11": {
    totalRevenue: 32_000_000,
    totalOrders: 180,
    totalCourses: 5,
    courses: [
      {
        id: "COURSE001",
        name: "Lập trình Web Fullstack",
        code: "COURSE001",
        orders: 50,
        revenue: 15_000_000,
      },
      {
        id: "COURSE004",
        name: "Kỹ năng mềm cho lập trình viên",
        code: "COURSE004",
        orders: 45,
        revenue: 9_000_000,
      },
      {
        id: "COURSE002",
        name: "React + Next.js Cơ bản",
        code: "COURSE002",
        orders: 35,
        revenue: 4_000_000,
      },
      {
        id: "COURSE005",
        name: "Phân tích dữ liệu bằng Python",
        code: "COURSE005",
        orders: 25,
        revenue: 3_000_000,
      },
      {
        id: "COURSE003",
        name: "Python cho người mới bắt đầu",
        code: "COURSE003",
        orders: 25,
        revenue: 1_000_000,
      },
    ],
  },
  "2025-Q4": {
    totalRevenue: 59_000_000,
    totalOrders: 320,
    totalCourses: 5,
    courses: [
      {
        id: "COURSE001",
        name: "Lập trình Web Fullstack",
        code: "COURSE001",
        orders: 90,
        revenue: 27_000_000,
      },
      {
        id: "COURSE002",
        name: "React + Next.js Cơ bản",
        code: "COURSE002",
        orders: 70,
        revenue: 12_000_000,
      },
      {
        id: "COURSE003",
        name: "Python cho người mới bắt đầu",
        code: "COURSE003",
        orders: 55,
        revenue: 5_000_000,
      },
      {
        id: "COURSE004",
        name: "Kỹ năng mềm cho lập trình viên",
        code: "COURSE004",
        orders: 65,
        revenue: 11_000_000,
      },
      {
        id: "COURSE005",
        name: "Phân tích dữ liệu bằng Python",
        code: "COURSE005",
        orders: 40,
        revenue: 4_000_000,
      },
    ],
  },
  "2025-YTD": {
    totalRevenue: 185_000_000,
    totalOrders: 980,
    totalCourses: 8,
    courses: [
      {
        id: "COURSE001",
        name: "Lập trình Web Fullstack",
        code: "COURSE001",
        orders: 260,
        revenue: 60_000_000,
      },
      {
        id: "COURSE002",
        name: "React + Next.js Cơ bản",
        code: "COURSE002",
        orders: 210,
        revenue: 35_000_000,
      },
      {
        id: "COURSE003",
        name: "Python cho người mới bắt đầu",
        code: "COURSE003",
        orders: 180,
        revenue: 30_000_000,
      },
      {
        id: "COURSE004",
        name: "Kỹ năng mềm cho lập trình viên",
        code: "COURSE004",
        orders: 160,
        revenue: 25_000_000,
      },
      {
        id: "COURSE005",
        name: "Phân tích dữ liệu bằng Python",
        code: "COURSE005",
        orders: 120,
        revenue: 20_000_000,
      },
      {
        id: "COURSE006",
        name: "Node.js Nâng cao",
        code: "COURSE006",
        orders: 80,
        revenue: 8_000_000,
      },
      {
        id: "COURSE007",
        name: "TypeScript Pro",
        code: "COURSE007",
        orders: 50,
        revenue: 4_000_000,
      },
      {
        id: "COURSE008",
        name: "Next.js Toàn tập",
        code: "COURSE008",
        orders: 40,
        revenue: 3_000_000,
      },
    ],
  },
};

const PIE_COLORS = [
  "#4F46E5",
  "#22C55E",
  "#F97316",
  "#EC4899",
  "#06B6D4",
  "#0EA5E9",
  "#A855F7",
  "#FACC15",
];

const formatCurrency = (value: number) =>
  value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

export default function DashboardPage() {
  const timeFilters = useMemo(() => buildTimeFilters(new Date()), []);
  const [selectedFilterId, setSelectedFilterId] = useState(
    timeFilters[0]?.id ?? ""
  );

  const selectedFilter: TimeFilterOption =
    timeFilters.find((f) => f.id === selectedFilterId) ?? timeFilters[0];

  const data = MOCK_DATA_BY_FILTER[selectedFilter.id];

  const revenuePieData = data.courses.map((c) => ({
    name: c.name,
    value: c.revenue,
  }));

  const ordersPieData = data.courses.map((c) => ({
    name: c.name,
    value: c.orders,
  }));
  const revenuePieColors = useMemo(
    () => buildPieColors(revenuePieData.length),
    [revenuePieData.length]
  );

  const ordersPieColors = useMemo(
    () => buildPieColors(ordersPieData.length),
    [ordersPieData.length]
  );

  const top5Courses = [...data.courses]
    .sort((a, b) => b.orders - a.orders)
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 md:px-8 md:py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Dashboard doanh thu &amp; đơn hàng
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {selectedFilter.subtitle}
            </p>
          </div>

          <div className="w-56">
            <div className="relative">
              {/* Select */}
              <select
                value={selectedFilter.id}
                onChange={(e) => setSelectedFilterId(e.target.value)}
                className="
                  block w-full cursor-pointer appearance-none
                  rounded-lg border-2 border-gray-300 bg-white
                  px-4 py-2.5 pr-10 text-sm font-medium text-gray-800
                  shadow-sm transition-all duration-200
                 
                "
              >
                {timeFilters.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>

              {/* Icon mũi tên */}
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5">
                <svg
                  className="h-5 w-5 text-gray-600 transition-transform duration-200"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.085l3.71-3.854a.75.75 0 011.08 1.04l-4.24 4.4a.75.75 0 01-1.08 0l-4.25-4.4a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Tổng doanh thu
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {formatCurrency(data.totalRevenue).replace("₫", "đ")}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Trong khoảng thời gian được chọn
            </p>
          </div>

          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Tổng đơn hàng
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {data.totalOrders.toLocaleString("vi-VN")}{" "}
              <span className="text-base font-normal text-slate-500">đơn</span>
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Bao gồm tất cả các khóa học
            </p>
          </div>

          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Tổng khoá học (unique)
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {data.totalCourses.toLocaleString("vi-VN")}{" "}
              <span className="text-base font-normal text-slate-500">khoá</span>
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Có phát sinh ít nhất 1 đơn trong khoảng thời gian này
            </p>
          </div>
        </div>

        {/* 2 biểu đồ hình tròn */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Pie 1: Doanh thu theo khóa học */}
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">
              Tỉ lệ doanh thu theo khoá học
            </p>
            <p className="mb-2 mt-1 text-xs text-slate-500">
              Phân bổ tổng doanh thu{" "}
              {formatCurrency(data.totalRevenue).replace("₫", "đ")}
            </p>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenuePieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={40}
                    paddingAngle={2}
                  >
                    {revenuePieData.map((entry, index) => (
                      <Cell
                        key={`rev-slice-${index}`}
                        fill={revenuePieColors[index]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie 2: Số đơn theo khóa học */}
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">
              Tỉ lệ số đơn hàng theo khoá học
            </p>
            <p className="mb-2 mt-1 text-xs text-slate-500">
              Tổng {data.totalOrders.toLocaleString("vi-VN")} đơn
            </p>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ordersPieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={40}
                    paddingAngle={2}
                  >
                    {ordersPieData.map((entry, index) => (
                      <Cell
                        key={`ord-slice-${index}`}
                        fill={ordersPieColors[index]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Bảng Top 5 khoá học bán chạy */}
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Top 5 khoá học bán chạy
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Dựa trên số đơn hàng trong khoảng thời gian:{" "}
                {selectedFilter.label}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs uppercase text-slate-500">
                  <th className="py-2 pr-3 pl-1">#</th>
                  <th className="py-2 pr-3">Tên khoá học</th>
                  <th className="py-2 pr-3">Mã khoá học</th>
                  <th className="py-2 pr-3 text-right">Số đơn hàng</th>
                  <th className="py-2 pr-3 text-right">Doanh thu</th>
                </tr>
              </thead>
              <tbody>
                {top5Courses.map((course, index) => (
                  <tr
                    key={course.id}
                    className="border-b border-slate-50 last:border-none hover:bg-slate-50/70"
                  >
                    <td className="py-2 pr-3 pl-1 text-xs text-slate-500">
                      {index + 1}
                    </td>
                    <td className="py-2 pr-3 font-medium text-slate-900">
                      {course.name}
                    </td>
                    <td className="py-2 pr-3 text-xs text-slate-500">
                      {course.code}
                    </td>
                    <td className="py-2 pr-3 text-right text-sm text-slate-800">
                      {course.orders.toLocaleString("vi-VN")}
                    </td>
                    <td className="py-2 pr-3 text-right text-sm text-slate-800">
                      {formatCurrency(course.revenue).replace("₫", "đ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
