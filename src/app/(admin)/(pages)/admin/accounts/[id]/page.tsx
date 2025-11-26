"use client";
import { use, useState, useEffect } from "react";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

interface AccountData {
  id: string;
  name: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  accountCode: string;
  status: string;
}

// Mock fetch function
const fetchAccountData = (id: string): AccountData => {
  console.log("Fetching account with id:", id);
  
  // Return mock data
  return {
    id: id,
    name: "Nguyễn Văn A",
    gender: "Nam",
    dateOfBirth: "15/03/1990",
    email: "admin@example.com",
    phone: "0123456789",
    accountCode: "ACC001",
    status: "Hoạt động"
  };
};

export default function AccountDetailsPage({ params }: PageProps) {
  const { id } = use(params);
  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAccountData = () => {
      try {
        const data = fetchAccountData(id);
        setAccountData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching account:", error);
        setLoading(false);
      }
    };

    loadAccountData();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-gray-600">Đang tải thông tin...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="rounded-lg bg-gray-50 p-6 h-full">
        <h2 className="text-[20px] font-[700] mb-[20px] text-[#1976d2]">Thông tin tài khoản</h2>
        {accountData ? (
          <>
            <ul className="space-y-4 mb-8">
              {Object.entries({
                name: "Tên",
                gender: "Giới tính",
                dateOfBirth: "Ngày sinh",
                email: "Email",
                phone: "Số điện thoại",
                accountCode: "Mã tài khoản",
                status: "Trạng thái"
              }).map(([key, label]) => (
                <li
                  key={key}
                  className="flex justify-between items-center py-[5px] border-b border-gray-200"
                >
                  <span className="text-gray-600">{label}</span>
                  <span className="font-bold">{accountData[key as keyof AccountData]}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-end gap-3">
              <Link
                href="/admin/accounts"
                className="bg-gray-500 text-white font-medium px-[25px] py-[5.625px] rounded-[3.75px] hover:bg-gray-600 hover:text-white"
              >
                Quay lại
              </Link>
              <Link
                href={`/admin/accounts/edit/${accountData.id}`}
                className="bg-[#1976d2] text-white font-medium px-[25px] py-[5.625px] rounded-[3.75px] hover:bg-hightlight hover:text-white"
              >
                Chỉnh sửa
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-600">Không tìm thấy thông tin tài khoản.</p>
          </div>
        )}
      </div>
    </div>
  );
}
