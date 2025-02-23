'use client';
import { useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';
import { NearContext } from '@/wallets/near';

export default function Login() {
  const { signedAccountId, wallet } = useContext(NearContext);
  const router = useRouter();
  
  useEffect(() => {
    if (signedAccountId) {
      // Check if user is staff
      if (signedAccountId === 'karanjotsingh.testnet') {
        router.push('/staff-dashboard');
      } else {
        router.push('/dashboard');
      }
    }
  }, [signedAccountId, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await wallet.signIn();
    } catch (err) {
      console.error('Auth error:', err);
    }
  };

  return (
    <main className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <h1>Login</h1>
          <p>Welcome to Carbon Chain</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <button 
            type="submit" 
            className={styles.connectWallet}
          >
            Connect NEAR Wallet
          </button>
        </form>
      </div>
    </main>
  );
} 