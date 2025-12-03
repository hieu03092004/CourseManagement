'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';;

export default function EmailVerifiedPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      console.warn('Không có token trong URL, chỉ verify email, không auto login.');
      return;
    }

    const checkUser = async () => {
      const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

      const res = await fetch(`${apiDomain}/auth/me`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        // Redirect sau khi auto login
        router.push('/member/login');
      } else {
        const err = await res.json().catch(() => null);
        console.error('ME error', err);
      }
    };

    checkUser();
  }, [searchParams, router]);

  return (
    <div>
      <h1>Email đã được xác thực</h1>
      <p>Đang chuyển hướng về trang đăng nhập...</p>
    </div>
  );
}