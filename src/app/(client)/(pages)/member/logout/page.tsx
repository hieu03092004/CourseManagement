"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function LogOutPage(){
    const router=useRouter();
    useEffect(()=>{
        router.push("/member/login");
    },[])
    return(
        <>
        </>
    )
}