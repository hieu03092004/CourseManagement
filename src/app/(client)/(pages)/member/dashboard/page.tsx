"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

import { FaRegClipboard, FaRegUser, FaVideo,  } from "react-icons/fa6";
import { FaTicketAlt} from "react-icons/fa";
import { IconType } from "react-icons";
import LeftProfile from "./SectionLeftProfile";
import { IProfile } from "../../../interfaces/IProfile";

interface MenuItem {
  title: string;
  link: string;
  icon: IconType;
}

interface MenuSection {
  heading: string;
  items: MenuItem[];
}

const fetchProfileData = async (): Promise<IProfile> => {
  // TODO: Replace with actual API call
  // const response = await fetch('/api/profile');
  // const data = await response.json();
  // return data;

  // Mock data for now
  return {
    name: "Trương Thành Hiếu",
    gender: "Nam",
    dateOfBirth: "03/09/2004",
    email: "truongthanhhieu987@gmail.com",
    phone: "0342421208",
    customerCode: "CUS380154927",
    avatar: "/src/assets/images/avatar.png"
  } as IProfile;
};

export default function MemberDashboardPage() {
  const pathname = usePathname();
  const [profile, setProfile] = useState<IProfile | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const data = await fetchProfileData();
      setProfile(data);
    };
    loadProfile();
  }, []);

  const menuData: MenuSection[] = [
    {
      heading: "Tài khoản của tôi",
      items: [
        {
          title: "Thông tin cá nhân",
          link: "/member/dashboard",
          icon: FaRegUser
        },
        {
          title: "Khóa học đã mua",
          link: "/member/courses",
          icon: FaVideo
        },
        {
          title: "Đơn hàng",
          link: "/member/orders",
          icon: FaRegClipboard
        }
      ]
    },
    {
      heading: "Quà tặng",
      items: [
        {
          title: "Phiếu giảm giá",
          link: "/member/promotions",
          icon: FaTicketAlt
        }
      ]
    }
  ];

  return (
    <div className="container mb-20 py-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-3 p-[10px] rounded-lg bg-gray-50 flex flex-col gap-[25px]">
          {profile && (
            <LeftProfile 
              menuData={menuData} 
              pathname={pathname}
              avatar={profile.avatar || "/src/assets/images/avtar.png"}
              name={profile.name}
            />
          )}
        </div>

        <div className="md:col-span-9">
          <div className="rounded-lg bg-gray-50 p-6 h-full">
            <h2 className="text-xl font-bold mb-6">Thông tin cá nhân</h2>
            {profile ? (
              <>
                <ul className="space-y-4 mb-8">
                  {Object.entries({
                    name: "Tên",
                    gender: "Giới tính",
                    dateOfBirth: "Ngày sinh",
                    email: "Email",
                    phone: "Số điện thoại",
                    customerCode: "Mã khách hàng"
                  }).map(([key, label]) => (
                    <li
                      key={key}
                      className={`flex justify-between items-center py-[5px] border-b border-gray-200`}
                    >
                      <span className="text-gray-600">{label}</span>
                      <span className="font-bold">{profile[key as keyof IProfile]}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-end gap-3">
                  <Link
                    href="/member/change-password"
                    className="bg-dark1 text-white font-medium px-[25px] py-[5.625px] rounded-[3.75px] hover:bg-hightlight hover:text-white"
                  >
                    Thay đổi mật khẩu
                  </Link>
                  <Link
                    href="/member/profile"
                    className="bg-dark1 text-white font-medium px-[25px] py-[5.625px] rounded-[3.75px] hover:bg-hightlight hover:text-white"
                  >
                    Sửa thông tin
                  </Link>
                </div>
              </>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-600">Đang tải thông tin...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
