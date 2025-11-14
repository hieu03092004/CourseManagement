import Link from "next/link";
import { IconType } from "react-icons";
import BtnLogout from "../../../components/Button/btn_logout";

interface MenuItem {
  title: string;
  link: string;
  icon: IconType;
}

interface MenuSection {
  heading: string;
  items: MenuItem[];
}

interface SectionMemberCategoriesProps {
  menuData: MenuSection[];
  pathname: string;
}

export default function SectionMemberCategories({ menuData, pathname }: SectionMemberCategoriesProps) {
  return (
    <ul className="mb-0">
      {menuData.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          <div className={`font-[700] mb-[10px] text-[16px] ${sectionIndex > 0 ? "mt-4" : ""}`}>
            {section.heading}
          </div>
          {section.items.map((item, itemIndex) => {
            const isActive = pathname === item.link;
            const Icon = item.icon;
            const isLastItem = itemIndex === section.items.length - 1;
            return (
              <li
                key={itemIndex}
                className={`${isActive ? "active bg-hightlight rounded" : ""} ${!isLastItem ? "mb-[5px]" : ""}`}
              >
                <Link
                  href={item.link}
                  className={`py-[7.5px] px-[5px] w-full flex items-center transition-colors font-[400] ${
                    isActive ? "text-white" : "text-black hover:text-hightlight"
                  }`}
                >
                  <Icon className="text-xl mr-2" />
                  {item.title}
                </Link>
              </li>
            );
          })}
        </div>
      ))}
      <BtnLogout />
    </ul>
  );
}

