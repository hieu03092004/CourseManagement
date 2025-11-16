"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FaRegClipboard, FaRegUser, FaVideo } from "react-icons/fa6";
import { FaTicketAlt } from "react-icons/fa";
import { IconType } from "react-icons";
import LeftProfile from "../dashboard/SectionLeftProfile";
import SectionOrderTable from "./SectionOrderTable";
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

interface Order {
  orderCode: string;
  amount: string;
  orderDate: string;
  status: string;
}

const fetchProfileData = async (): Promise<IProfile> => {
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

const fetchOrdersData = async (): Promise<Order[]> => {
  return [
    { orderCode: "ORD918654730", amount: "1,200,000 VND", orderDate: "17:12 - 09/11/2025", status: "Đã hủy" },
    { orderCode: "ORD491358760", amount: "1,200,000 VND", orderDate: "17:12 - 09/11/2025", status: "Đã hủy" },
    { orderCode: "ORD842963107", amount: "1,200,000 VND", orderDate: "17:58 - 07/11/2025", status: "Chờ thanh toán" },
    { orderCode: "ORD185760943", amount: "1,200,000 VND", orderDate: "14:14 - 06/10/2025", status: "Chờ thanh toán" },
    { orderCode: "ORD526471380", amount: "499,000 VND", orderDate: "18:13 - 05/01/2023", status: "Đã hủy" },
    { orderCode: "ORD579084213", amount: "499,000 VND", orderDate: "12:37 - 02/01/2023", status: "Chờ thanh toán" },
    { orderCode: "ORD842370195", amount: "699,000 VND", orderDate: "10:12 - 05/10/2022", status: "Chờ thanh toán" },
    { orderCode: "ORD610934852", amount: "699,000 VND", orderDate: "22:08 - 01/10/2022", status: "Chờ thanh toán" }
  ];
};

export default function MyOrdersPage() {
  const pathname = usePathname();
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const loadProfile = async () => {
      const data = await fetchProfileData();
      setProfile(data);
    };
    const loadOrders = async () => {
      const data = await fetchOrdersData();
      setOrders(data);
    };
    loadProfile();
    loadOrders();
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
          link: "/member/order",
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
            <h2 className="text-xl font-bold mb-6">Đơn hàng của tôi</h2>
            <SectionOrderTable orders={orders} />
          </div>
        </div>
      </div>
    </div>
  );
}