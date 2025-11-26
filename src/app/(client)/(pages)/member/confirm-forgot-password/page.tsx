"use client"
import { useState } from 'react';
import React from 'react';
import ButtonInput from '@/app/(client)/components/Button/btn_input';

type SvgProps = React.ComponentProps<'svg'>;

const LockIcon = (props: SvgProps) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

export default function ConfirmForgotPasswordPage() {
  const [code, setCode] = useState(['', '', '', '', '']); 
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const inputClass = "block w-full pl-10 pr-4 py-2.5 text-base border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out";

  const labelClass = "block text-base font-medium text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500";
  
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    const newCode = [...code];

    newCode[index] = value.slice(-1); 
    setCode(newCode);
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

        <p className="text-center text-gray-600 mb-6">
          Vui lòng nhập mã xác nhận 5 chữ số đã được gửi tới email của bạn.
        </p>

        <form className="space-y-6">
          
          <div>
            <label className={labelClass.replace("after:ml-0.5 after:text-red-500", "")}>
              Mã xác nhận (5 chữ số)
            </label>
            <div className="mt-1 flex space-x-3 justify-between max-w-sm mx-auto">
              {code.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(e, index)}
                  className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                  style={{ caretColor: '#00ff99' }}
                />
              ))}
            </div>
          </div>
          
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
