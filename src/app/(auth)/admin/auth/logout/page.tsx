"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { deleteCookie } from "@/app/(client)/helpers/cookie";

interface RootState {
    loginReducer: boolean;
}

export default function LogOutPage() {
    const router = useRouter();

    useEffect(() => {
        deleteCookie("cartId");
        deleteCookie("email");
        deleteCookie("fullName");
        deleteCookie("id");
        deleteCookie("phone");
        deleteCookie("token");

        // Kiểm tra cookies sau khi xóa

        // Dispatch action để cập nhật Redux state
        // dispatch(checkLogin(false));

        // Redirect về trang login
        setTimeout(() => {
            router.push("/admin/auth/login");
        }, 500);
    }, [router]);

    return (
       <>
       </>
    );
}