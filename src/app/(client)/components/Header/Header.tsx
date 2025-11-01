import Link from "next/link";
import { IMenuLink } from "../../interfaces/IMenuLink";
import { IMenuAuth } from "../../interfaces/IMenuAuth";
export default function Header() {
    const menu: IMenuLink[] = [
        {
            title: "Trang chủ",
            link: "/",
        },
        {
            title: "Khóa học Zoom",
            link: "/course",
        },
        {
            title: "Khóa học Video",
            link: "/course/course_video",
        },
    ]
    const menuAuth: IMenuAuth[] = [
        {
            title: "Đăng nhập",
            link: "/member/login",
            logged: false
        },
        {
            title: "Đăng ký",
            link: "/member/register",
            logged: false
        },
    ]
    return (
        <header>
            <div className="header-main py-[20px] bg-primary fixed top-0 left-0 right-0 z-999">
                <div className="container max-w-[1320px] mx-auto flex justify-between items-center">
                    <div className="inner-left ">
                        <Link href="/">
                            <img src="/demo/Logo.svg" alt="Logo" className="h-[42px] w-auto" />
                        </Link>
                    </div>
                    <div className="">
                        <ul className="flex items-center justify-between text-white font-[600] text-[16px]">
                            {menu.map((item, index) => {
                                return (
                                    <li className="mx-[10px]" key={index}>
                                        <Link href={item.link}>{item.title}</Link>
                                    </li>
                                )
                            })}

                        </ul>
                    </div>
                    <div className="inner-right">
                        <ul className="flex items-center justify-between text-white font-[600] text-[16px]">
                            {menuAuth.map((item,index)=>{
                                return(
                                    <li className="mx-[10px]" key={index}>
                                        <Link href={item.link}>{item.title}</Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}