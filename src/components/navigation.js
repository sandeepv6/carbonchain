import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useContext } from 'react';
import styles from '../app/app.module.css';
import { useRouter } from 'next/navigation';

import { NearContext } from '@/wallets/near';
import NearLogo from '/public/Logo.png';

export const Navigation = () => {
  const { signedAccountId, wallet } = useContext(NearContext);
  const router = useRouter();
  const [action, setAction] = useState(() => { });
  const [label, setLabel] = useState('Loading...');
  const [isStaff, setIsStaff] = useState(false);

  useEffect(() => {
    if (!wallet) return;

    // Check if the user is staff (you can modify this condition based on your needs)
    const checkIfStaff = () => {
      return signedAccountId === 'karanjotsingh.testnet'; // Replace with your staff account check
    };

    if (signedAccountId) {
      setIsStaff(checkIfStaff());
      setAction(() => async () => {
        await wallet.signOut();
        router.push('/');
      });
      setLabel('Logout');
    } else {
      setIsStaff(false);
      setAction(() => wallet.signIn);
      setLabel('Login');
    }
  }, [signedAccountId, wallet, router]);

  return (
    <nav className={`${styles.nav}`}>
      <div className={styles.navContent}>
        <Link href="/" className={styles.logoContainer}>
          <Image
            src="/Logo.png"
            alt="Carbon Chain"
            width={40}
            height={40}
            className={styles.logo}
          />
          <span className={styles.logoText}>Carbon Chain</span>
        </Link>

        <div className={styles.navLinks}>
          {/* Show dashboard link only when logged in */}
          {signedAccountId && (
            <Link 
              href={isStaff ? "/staff-dashboard" : "/dashboard"}
              className={styles.dashboardLink}
            >
              {isStaff ? "Staff Dashboard" : "Dashboard"}
            </Link>
          )}
          <Link href="/about">About</Link>
          <Link href="/how-it-works">How It Works</Link>
          <Link href="/contact">Contact</Link>
          
          
          <button 
            className={styles.loginButton} 
            onClick={action}
          >
            {label}
          </button>
        </div>
      </div>
    </nav>
  );
};