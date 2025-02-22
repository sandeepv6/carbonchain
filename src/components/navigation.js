import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useContext } from 'react';
import styles from '../app/app.module.css';

import { NearContext } from '@/wallets/near';
import NearLogo from '/public/near-logo.svg';

export const Navigation = () => {
  const { signedAccountId, wallet } = useContext(NearContext);
  const [action, setAction] = useState(() => { });
  const [label, setLabel] = useState('Loading...');

  useEffect(() => {
    if (!wallet) return;

    if (signedAccountId) {
      setAction(() => wallet.signOut);
      setLabel(`Logout ${signedAccountId}`);
    } else {
      setAction(() => wallet.signIn);
      setLabel('Login');
    }
  }, [signedAccountId, wallet]);

  return (
    <nav className={`${styles.nav}`}>
      <div className={styles.navContent}>
        <Link href="/" className={styles.logoContainer}>
          <Image
            src="/carbon-chain-logo.svg"
            alt="Carbon Chain"
            width={40}
            height={40}
            className={styles.logo}
          />
          <span className={styles.logoText}>Carbon Chain</span>
        </Link>

        <div className={styles.navLinks}>
          <Link href="/about">About</Link>
          <Link href="/how-it-works">How It Works</Link>
          <Link href="/auditing">Auditing Process</Link>
          <Link href="/contact">Contact</Link>
          <button className="btn btn-secondary" onClick={action}>{label}</button>
        </div>
      </div>
    </nav>
  );
};