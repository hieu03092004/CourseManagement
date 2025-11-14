import { IconType } from "react-icons";
import Image from "next/image";
import SectionMemberCategories from "./SectionMemberCategories";

interface MenuItem {
  title: string;
  link: string;
  icon: IconType;
}

interface MenuSection {
  heading: string;
  items: MenuItem[];
}

interface SectionLeftProfileProps {
  menuData: MenuSection[];
  pathname: string;
  avatar: string;
  name: string;
}

export default function SectionLeftProfile({ menuData, pathname, avatar, name }: SectionLeftProfileProps) {
  return (
    <>
      <div className="flex flex-col items-center mt-[20px]">
        <div className="relative mb-4">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
            <Image
              src={avatar}
              alt="Avatar"
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </div>
          <label
            htmlFor="imageUpload"
            className="absolute bottom-0 right-0 bg-primary text-white px-3 py-1 rounded-full text-xs cursor-pointer hover:opacity-90"
          >
            Sửa
          </label>
          <input
            type="file"
            id="imageUpload"
            accept="image/jpeg, image/png"
            className="hidden"
          />
        </div>
        <h3 className="text-[18px] font-[700] text-center">{name}</h3>
      </div>

      <SectionMemberCategories menuData={menuData} pathname={pathname} />
    </>
  );
}