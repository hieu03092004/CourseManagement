"use client"
import React from 'react';
import Link from 'next/link';
import ButtonInput from '@/app/(client)/components/Button/btn_input'; 

type SvgProps = React.ComponentProps<'svg'>;

const EmailIcon = (props: SvgProps) => ( 
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const CheckIcon = (props: SvgProps) => ( 
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

export default function ForgotPasswordPage() {
  const inputClass = "block w-full pl-10 pr-4 py-2.5 text-base border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out";

  const labelClass = "block text-base font-medium text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500";
  
  const selectedClass = 'border-blue-500 bg-blue-50 shadow-md'; 

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-4 md:pt-8">
      <nav className="self-start px-4 md:px-16 text-sm text-gray-700">
        <ul className="flex space-x-2">
          <li>
            <Link href="/" className="hover:underline text-blue-600">Trang chủ</Link>
          </li>
          <li>•</li>
          <li>
            <Link href="/member" className="hover:underline text-blue-600">Tài khoản thành viên</Link>
          </li>
        </ul>
      </nav>

      <div className="w-full max-w-xl mt-3 p-5 md:p-7 bg-white shadow-xl rounded-xl border border-gray-100">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Quên mật khẩu</h2>

        <form className="space-y-6">

          <div className="space-y-4">
            {/* Chỉ hiển thị tùy chọn Email */}
            <div 
              className={`flex items-start p-4 border-2 rounded-lg transition duration-200 ${selectedClass}`}
            >
              <div className="flex-shrink-0 mr-3">
                <EmailIcon className={`h-6 w-6 text-blue-600`} />
              </div>
              <div className="flex-grow">
                <p className="font-semibold text-lg text-gray-800">Khôi phục qua Email</p>
                <p className="text-sm text-gray-600 mt-1">Gửi mã xác nhận đến địa chỉ email đã đăng ký của bạn.</p>
              </div>
              <div className="flex-shrink-0 ml-3 h-6 w-6 text-green-500 bg-white rounded-full flex items-center justify-center border border-green-500">
                <CheckIcon className="h-4 w-4" />
              </div>
            </div>
          </div>
          
          <div className="pt-2">
            <label htmlFor="recoveryInput" className={labelClass}>
              Email
            </label>
            <div className="mt-1 relative rounded-lg shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <EmailIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                name="recoveryInput"
                id="recoveryInput"
                className={inputClass}
                placeholder="Nhập địa chỉ email đã đăng ký của bạn"
              />
            </div>
          </div>

          <div className="pt-2">
            <ButtonInput text="Xác nhận" type="submit" />
          </div>
        </form>

        <p className="mt-6 text-center text-base text-gray-600">
          <Link href="/member/login" className="font-semibold text-blue-600 hover:text-blue-500 hover:underline">
            Quay lại Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}
