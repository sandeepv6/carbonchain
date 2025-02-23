'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './app.module.css';
import globalStyles from './globals.css';
import Footer from '@/components/footer';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.container}>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Incentivizing a Carbon-Neutral Future</h1>
          <p>Rewarding companies that lead the fight against climate change through blockchain-powered transparency and tokenized incentives.</p>
          <div className={styles.heroButtons}>
            <Link href="/register" className={globalStyles.primaryButton}>
              Join the Movement
            </Link>
            <Link href="/how-it-works" className={globalStyles.secondaryButton}>
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}