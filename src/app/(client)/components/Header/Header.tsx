"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { IMenuLink } from "../../interfaces/IMenuLink";
import { IMenuAuth } from "../../interfaces/IMenuAuth";
import { getCookie, deleteCookie } from "../../helpers/cookie";
import { useSelector, useDispatch } from "react-redux";
import { checkLogin } from "../../actions";

export default function Header() {
    const router = useRouter();
    const dispatch = useDispatch();
    const isLogin = useSelector((state: any) => state.loginReducer);

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
    ];

    const handleLogout = () => {
        deleteCookie("id");
        deleteCookie("fullName");
        deleteCookie("email");
        deleteCookie("token");
        dispatch(checkLogin(false));
        router.push("/");
    };

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
                            {isLogin ? (
                                <li className="mx-[10px]">
                                    <button
                                        onClick={handleLogout}
                                        className="hover:underline cursor-pointer"
                                    >
                                        Đăng xuất
                                    </button>
                                </li>
                            ) : (
                                menuAuth.map((item, index) => {
                                    return (
                                        <li className="mx-[10px]" key={index}>
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