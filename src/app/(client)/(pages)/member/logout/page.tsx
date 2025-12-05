"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkLogin } from "@/app/(client)/actions";
import { deleteCookie, getCookie } from "@/app/(client)/helpers/cookie";

interface RootState {
    loginReducer: boolean;
}

export default function LogOutPage() {
    const router = useRouter();
    const dispatch = useDispatch();
    const isLogin = useSelector((state: RootState) => state.loginReducer);

    useEffect(() => {
        deleteCookie("cartId");
        deleteCookie("email");
        deleteCookie("fullName");
        deleteCookie("id");
        deleteCookie("phone");
        deleteCookie("token");

        // Kiểm tra cookies sau khi xóa

        // Dispatch action để cập nhật Redux state
        dispatch(checkLogin(false));

        // Redirect về trang login
        setTimeout(() => {
            router.push("/member/login");
        }, 500);
    }, [router, dispatch, isLogin]);

    return (
       <>
       </>
    );
}