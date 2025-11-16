"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FaRegClipboard, FaRegUser, FaVideo } from "react-icons/fa6";
import { FaTicketAlt } from "react-icons/fa";
import { IconType } from "react-icons";
import LeftProfile from "../dashboard/SectionLeftProfile";
import Input from "../../../components/Form/Input";
import ButtonInput from "../../../components/Button/btn_input";
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

export default function ChangePasswordPage() {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      oldPassword: formData.get("old_password"),
      newPassword: formData.get("new_password"),
      rePassword: formData.get("re_password")
    };
    console.log("Form submitted:", data);
  };

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
          <div className="rounded-[8px] bg-gray-50 mb-[10px] p-[15px] h-full">
            <form onSubmit={handleSubmit} className="contact-form" autoComplete="off">
              <h2 className="text-[20px] font-[700] mb-[20px] text-dark1">Đổi mật khẩu</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1">
                  <Input
                    htmlFor="old_password"
                    label="Mật khẩu"
                    name="old_password"
                    type="password"
                    required
                  />

                  <Input
                    htmlFor="new_password"
                    label="Mật khẩu mới"
                    name="new_password"
                    type="password"
                    required
                  />

                  <Input
                    htmlFor="re_password"
                    label="Nhập lại mật khẩu mới"
                    name="re_password"
                    type="password"
                    required
                  />

                  <ButtonInput text="Cập nhật" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}