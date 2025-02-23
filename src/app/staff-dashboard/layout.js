'use client';
import { useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { NearContext } from '@/wallets/near';

export default function StaffDashboardLayout({ children }) {
  const { signedAccountId } = useContext(NearContext);
  const router = useRouter();

  useEffect(() => {
    if (!signedAccountId) {
      router.push('/login');
    } else if (signedAccountId !== 'karanjotsingh.testnet') {
      router.push('/dashboard');
    }
  }, [signedAccountId, router]);

  return children;
} 