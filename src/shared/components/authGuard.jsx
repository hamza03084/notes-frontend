'use client';

import {useEffect, useState} from 'react';
import {usePathname, useRouter} from 'next/navigation';

export default function AuthGuard({children}) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    const isAuthRoute = pathname.includes('/auth');

    if (!user && !isAuthRoute) {
      router.replace('/auth/login');
    } else if (user && isAuthRoute) {
      router.replace('/');
    }
  }, [pathname, router]);

  return children;
}
