"use client"
import { useState } from 'react';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { setCookie } from '@/app/(client)/helpers/cookie';
import { checkLogin } from '@/app/(client)/actions';
import { useDispatch } from 'react-redux';
import BreadCump from '@/app/(client)/components/BreadCump/BreadCump';

type SvgProps = React.ComponentProps<'svg'>;

// Mock login function - trả về data fix cứng
const login = (email: string, password: string) => {
  // Giả lập check login với data cứng
  const mockUsers = [
    {
      id: "1",
      email: "admin@example.com",
      password: "123456",
      fullName: "Nguyen Van A",
      token: "mock-token-123"
    },
    {
      id: "2",
      email: "user@example.com",
      password: "123456",
      fullName: "Tran Thi B",
      token: "mock-token-456"
    }
  ];

  const user = mockUsers.find(u => u.email === email && u.password === password);
  return user ? [user] : [];
};

const EyeIcon = (props: SvgProps) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeOffIcon = (props: SvgProps) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.828l-5.694-5.694m5.694 5.694a.5.5 0 11.707-.707m-.707.707l-5.694-5.694" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router=useRouter();
  const dispatch=useDispatch();
  const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const email=(e.target as HTMLFormElement).email.value;
    const password=(e.target as HTMLFormElement).password.value;
    const response= login(email,password);
    console.log(response);
    if(response.length>0){
        router.push("/");
        setCookie("id",response[0].id,1);
        setCookie("fullName",response[0].fullName,1);
        setCookie("email",response[0].email,1);
        setCookie("token",response[0].token,1);
        dispatch(checkLogin(true));
    }
    else{
        alert("Tài khoản hoặc mật khẩu không chính xác");
    }


}
  
  const inputClass = "block w-full pl-10 pr-10 py-2.5 text-base border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out";

  const labelClass = "block text-base font-medium text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500";

  const breadcrumbItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Tài khoản thành viên", href: "/member", active: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <BreadCump items={breadcrumbItems} />

      <div className="flex flex-col items-center px-4">
        <div className="w-full max-w-lg mt-4 p-5 md:p-8 bg-white shadow-xl rounded-xl border border-gray-100">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Đăng nhập</h2>

        <form className="space-y-6" onSubmit={handleSubmit} method="post" action="/member/login">
          <div>
            <label htmlFor="email" className={labelClass}>
              Email
            </label>
            <div className="mt-1 relative rounded-lg shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                type="email"
                name="email"
                id="email"
                className={inputClass.replace('pr-10', 'pr-4')}
                placeholder="Ví dụ: admin@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className={labelClass}>
              Mật khẩu
            </label>
            <div className="mt-1 relative rounded-lg shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className={inputClass}
                placeholder="********"
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out focus:outline-none"
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="text-right text-sm">
            <Link href="/member/forgot-password" className="font-medium text-blue-600 hover:text-blue-500 hover:underline">
              Quên mật khẩu?
            </Link>
          </div>


          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-md text-xl font-semibold text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
              style={{ backgroundColor: '#00ff99', color: 'white' }}
            >
              Đăng nhập
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-base text-gray-600">
          Bạn chưa có tài khoản?{' '}
          <Link href="/member/register" className="font-semibold text-blue-600 hover:text-blue-500 hover:underline">
            Đăng ký ngay
          </Link>
        </p>
        </div>
      </div>
    </div>
  );
}
