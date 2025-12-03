"use client"
import { useState } from 'react';
import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ButtonInput from '@/app/(client)/components/Button/btn_input';
import { post } from '@/app/(admin)/ultils/request';
import { handleResponse } from '@/helpers/api/response/handleResponse';
import { IApiResponse } from '@/helpers/api/response/IResponse';

type SvgProps = React.ComponentProps<'svg'>;

const LockIcon = (props: SvgProps) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

export default function ConfirmForgotPasswordPage() { 
  const searchParams = useSearchParams();
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const inputClass = "block w-full pl-10 pr-4 py-2.5 text-base border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out";

  const labelClass = "block text-base font-medium text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Lấy email và token từ query string
    const email = searchParams.get('email');
    const token = searchParams.get('token');

    if (!email || !token) {
      alert("Thiếu thông tin email hoặc token. Vui lòng kiểm tra lại link!");
      return;
    }

    // Validate password
    if (!newPassword || !confirmPassword) {
      alert("Vui lòng nhập đầy đủ mật khẩu mới và xác nhận mật khẩu!");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Mật khẩu mới và xác nhận mật khẩu không khớp!");
      return;
    }

    const requestData = {
      email: email,
      token: token,
      password: newPassword,
      password_confirmation: confirmPassword
    };

    try {
      const response = await post("/auth/reset-password", requestData) as IApiResponse<unknown>;
      const { isSuccess, error } = handleResponse(response);

      if (isSuccess) {
        alert("Đổi mật khẩu thành công, vui lòng đăng nhập lại.");
        router.push('/member/login');
      } else {
        // Kiểm tra nếu là lỗi INVALID_RESET_TOKEN
        if (error?.code === 'INVALID_RESET_TOKEN') {
          alert("Link đổi mật khẩu đã hết hạn hoặc không hợp lệ. Vui lòng yêu cầu lại forgot-password.");
        } else {
          const errorMessage = error?.message || "Có lỗi xảy ra khi đổi mật khẩu!";
          alert(errorMessage);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Có lỗi xảy ra khi đổi mật khẩu!");
    }
  };



  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-4 md:pt-8">
      <nav className="self-start px-4 md:px-16 text-sm text-gray-700">
        <ul className="flex space-x-2">
          <li>
            <a href="./" className="hover:underline text-blue-600">Trang chủ</a>
          </li>
          <li>•</li>
          <li>
            <a href="./" className="hover:underline text-blue-600">Tài khoản thành viên</a>
          </li>
        </ul>
      </nav>

      <div className="w-full max-w-xl mt-3 p-5 md:p-7 bg-white shadow-xl rounded-xl border border-gray-100">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Quên mật khẩu</h2>


        <form className="space-y-6" onSubmit={handleSubmit}>
          
        
          
          <div className="pt-2">
            <label htmlFor="newPassword" className={labelClass}>
              Mật khẩu mới
            </label>
            <div className="mt-1 relative rounded-lg shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                className={inputClass} 
                placeholder="Nhập mật khẩu mới"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="confirmNewPassword" className={labelClass}>
              Nhập lại mật khẩu mới
            </label>
            <div className="mt-1 relative rounded-lg shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                name="confirmNewPassword"
                id="confirmNewPassword"
                className={inputClass} 
                placeholder="Xác nhận mật khẩu mới"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>


          <div className="pt-2">
            <ButtonInput text="Xác nhận" type="submit" />
          </div>
        </form>

        <p className="mt-6 text-center text-base text-gray-600">
          <a href="./login" className="font-semibold text-blue-600 hover:text-blue-500 hover:underline">
            Quay lại Đăng nhập
          </a>
        </p>
      </div>
    </div>
  );
}
