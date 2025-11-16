"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { FaCartShopping, FaRegUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { checkLogin } from "../../actions";
import { deleteCookie, getCookie } from "../../helpers/cookie";
import { IMenuAuth } from "../../interfaces/IMenuAuth";
import { usePathname } from "next/navigation";
import { IMenuLink } from "../../interfaces/IMenuLink";
interface RootState {
  loginReducer: boolean;
}
interface Course {
  id: string;
}
interface Cart {
  listCourse: Course[];
}

const countCarts = () => {
  const data: Cart = {
    listCourse: [{ id: "1" }, { id: "1" }, { id: "1" }],
  };
  return data;
};

export default function Header() {
    const pathname = usePathname();
    const dispatch = useDispatch();
    const isLogin = useSelector((state: RootState) => state.loginReducer);
    const totalCart = countCarts();

    // Check cookie on mount để set login state
    useEffect(() => {
        const token = getCookie("token");
        if (token && !isLogin) {
            dispatch(checkLogin(true));
        }
    }, [dispatch, isLogin]);
    const menu: IMenuLink[] = [
        {
            title: "Trang chủ",
            link: "/",
        },
        {
            title: "Khóa học zoom",
            link: "/course",
        },
        {
            title: "Khóa học video",
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
    ];

    return (
        <header>
            <div className="header-main py-[20px] bg-primary fixed top-0 left-0 right-0 z-990">
                <div className="container max-w-[1320px] mx-auto flex justify-between items-center">
                    <div className="inner-left ">
                        <Link href="/">
                            <Image
                                src="/demo/Logo.svg"
                                alt="Logo"
                                width={160}
                                height={42}
                                className="h-[42px] w-auto"
                            />
                        </Link>
                    </div>
                    <div className="">
                        <ul className="flex items-center justify-between font-[600] text-[16px]">
                            {menu.map((item, index) => {
                                const isActive = pathname === item.link;

                                return (
                                    <li
                                        className={`mx-[10px] cursor-pointer transition-colors ${
                                            isActive
                                                ? "text-hightlight"
                                                : "text-white hover:text-hightlight"
                                        }`}
                                        key={index}
                                    >
                                        <Link href={item.link}>{item.title}</Link>
                                    </li>
                                )
                            })}

                        </ul>
                    </div>
                    <div className="inner-right">
                        <ul className="flex items-center justify-between text-white font-[600] text-[16px]">
                            {isLogin ? (
                                <>
                                    <li className="mx-[10px] relative">
                                        <Link href="/cart" className="flex items-center">
                                            <FaCartShopping className="text-[24px] cursor-pointer hover:opacity-80" />
                                            <span className="absolute -top-[11px] -right-[11px] bg-secondary text-white text-[10px] font-bold rounded-full w-[18px] h-[18px] flex items-center justify-center">
                                                {totalCart.listCourse.length}
                                            </span>
                                        </Link>
                                    </li>
                                    <li className="mx-[10px]">
                                        <Link href="/member/profile">
                                            <FaRegUser className="text-[24px] cursor-pointer hover:opacity-80" />
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                menuAuth.map((item, index) => {
                                    const isAuthActive = pathname === item.link;

                                    return (
                                        <li
                                            className={`mx-[10px] cursor-pointer transition-colors ${
                                                isAuthActive
                                                    ? "text-hightlight"
                                                    : "text-white hover:text-hightlight"
                                            }`}
                                            key={index}
                                        >
                                            <Link href={item.link}>{item.title}</Link>
                                        </li>
                                    );
                                })
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}
