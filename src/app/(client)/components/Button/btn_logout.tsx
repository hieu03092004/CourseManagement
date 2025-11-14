import Link from "next/link";
export default function BtnLogout() {
    return (
        <button className="btn-logout mt-[20px] bg-dark1 text-white  py-[7.5px] px-[5px] hover:bg-white hover:text-dark1 border-[2px] border-dark1 rounded-[8px] w-full">
           <Link href="/member/logout" className="w-full block text-[16px] font-[500] line-height-[18px] h-[40px] flex items-center justify-center">
               Đăng xuất
           </Link>
        </button>
    )
}