"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { IMenuLink } from "../../interfaces/IMenuLink";
import { IMenuAuth } from "../../interfaces/IMenuAuth";
import { getCookie } from "../../helpers/cookie";
import { useSelector, useDispatch } from "react-redux";
import { checkLogin } from "../../actions";
import { FaRegUser } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";

interface RootState {
    loginReducer: boolean;
}

export default function Header() {
    const pathname = usePathname();
    const dispatch = useDispatch();
    const isLogin = useSelector((state: RootState) => state.loginReducer);

    // Check cookie on mount để set login state
    useEffect(() => {
        const token = getCookie("token");
        if (token && !isLogin) {
            dispatch(checkLogin(true));
        }
    }, [dispatch, isLogin]);
    const menu: IMenuLink[] = [
        {
            title: "TRANG CHỦ",
            link: "/",
        },
        {
            title: "KHOÁ HỌC ZOOM",
            link: "/course",
        },
        {
            title: "KHOÁ HỌC VIDEO",
            link: "/course/course_video",
        },
    ]
    const menuAuth: IMenuAuth[] = [
        {
            title: "ĐĂNG NHẬP",
            link: "/member/login",
            logged: false
        },
        {
            title: "ĐĂNG KÝ",
            link: "/member/register",
            logged: false
        },
    ];

    return (
        <header>
            <div className="header-main py-[20px] bg-primary fixed top-0 left-0 right-0 z-999">
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
                                                ? "text-green1"
                                                : "text-white hover:text-green1"
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
                                        <Link href="/member/checkout" className="flex items-center">
                                            <FaCartShopping className="text-[24px] cursor-pointer hover:opacity-80" />
                                            <span className="absolute -top-[11px] -right-[11px] bg-secondary text-white text-[10px] font-bold rounded-full w-[18px] h-[18px] flex items-center justify-center">
                                                0
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
                                                    ? "text-green1"
                                                    : "text-white hover:text-green1"
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