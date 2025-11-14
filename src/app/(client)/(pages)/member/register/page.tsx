"use client"
import { useState } from 'react';
import React from 'react';
import Link from 'next/link';
import { post } from '../../../../(admin)/ultils/request';
import { useRouter } from 'next/navigation';
import BreadCump from '@/app/(client)/components/BreadCump/BreadCump';
type SvgProps = React.ComponentProps<'svg'>;

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

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router=useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    userName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  // Base class (pr-4 for non-password fields)
  const baseInputClass = "block w-full pl-10 pr-4 py-2.5 text-base border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out";

  // Class for password fields (pr-10 for the eye button)
  const passwordInputClass = "block w-full pl-10 pr-10 py-2.5 text-base border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out";

  const labelClass = "block text-base font-medium text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let resgiterStatus = true;

    if (formData.password !== formData.confirmPassword) {
      alert('Mật khẩu xác nhận không chính xác');
      // resgiterStatus = false;
      return;
    }

    const dataToSend = {
      fullName: formData.fullName,
      userName: formData.userName,
      email: formData.email,
      phone: formData.phone,
      passwordHash: formData.password
    };

    try {
      //console.log(dataToSend);
      resgiterStatus=true;
      if(resgiterStatus){
        router.push('/member/login');
      }
      // const result = await post('api/register', dataToSend);

      // if (result.success || result.id) {
      //   console.log('Registration successful:', result);
      //   alert('Đăng ký thành công!');
      // } else {
      //   console.error('Registration failed:', result);
      //   alert('Đăng ký thất bại: ' + (result.message || 'Lỗi không xác định'));
      // }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Đã xảy ra lỗi khi đăng ký');
    }
  };

  const breadcrumbItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Tài khoản thành viên", href: "/member", active: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <BreadCump items={breadcrumbItems} />

      <div className="flex flex-col items-center px-4">
        <div className="w-full max-w-xl mt-4 p-5 md:p-8 bg-white shadow-xl rounded-xl border border-gray-100">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Đăng ký</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className={labelClass}>
                Họ và tên
              </label>
              <div className="mt-1 relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="fullName"
                  id="name"
                  className={baseInputClass}
                  placeholder="Họ và tên"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="account" className={labelClass}>
                Tài khoản
              </label>
              <div className="mt-1 relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="userName"
                  id="account"
                  className={baseInputClass}
                  placeholder="Tài khoản"
                  value={formData.userName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className={labelClass}>
                Email
              </label>
              <div className="mt-1 relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={baseInputClass}
                  placeholder="example@gmail.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className={labelClass}>
                Số điện thoại
              </label>
              <div className="mt-1 relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  className={baseInputClass}
                  placeholder="0987654321"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  className={passwordInputClass}
                  value={formData.password}
                  onChange={handleInputChange}
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

            <div>
              <label htmlFor="confirmPassword" className={labelClass}>
                Xác nhận mật khẩu
              </label>
              <div className="mt-1 relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  className={passwordInputClass}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(prev => !prev)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out focus:outline-none"
                >
                  {showConfirmPassword ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-md text-xl font-semibold text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
              style={{ backgroundColor: '#00ff99', color: 'white' }}
            >
              Đăng ký
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-base text-gray-600">
          Bạn đã có tài khoản?{' '}
          <Link href="/member/login" className="font-semibold text-blue-600 hover:text-blue-500 hover:underline">
            Đăng nhập
          </Link>
        </p>
        </div>
      </div>
    </div>
  );
}
