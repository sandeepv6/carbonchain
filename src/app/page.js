'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './app.module.css';
import globalStyles from './globals.css';
import Footer from '@/components/footer';
import { TypeAnimation } from 'react-type-animation';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [text, setText] = useState('');
  const fullText = 'Incentivizing a Carbon-Neutral Future';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={`${styles.container} ${styles.carbonBackground}`}>
      {/* Floating Atoms */}
      {[...Array(20)].map((_, index) => (
        <div
          key={index}
          className={styles.atom}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>
            <TypeAnimation
              sequence={[
                'Incentivizing', 1000,
                'Empowering', 1000,
                'Motivating', 1000,
              ]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
            />
          </h1>
          <h1>Carbon-Neutral Future</h1>
          <p>Rewarding companies that lead the fight against climate change through blockchain-powered transparency and tokenized incentives.</p>
          <div className={styles.heroButtons}>
            <Link href="/login" className={globalStyles.primaryButton}>
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