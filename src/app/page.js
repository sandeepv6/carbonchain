'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './app.module.css';
import globalStyles from '@/styles/globals.css';

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
      {/* Navigation */}
      <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.navContent}>
          <Link href="/" className={styles.logoContainer}>
            <Image
              src="/carbon-chain-logo.svg" // You'll need to add this logo
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
            <Link href="/login" className={styles.loginButton}>Login</Link>
          </div>
        </div>
      </nav>

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

      {/* Features Section */}
      <section className={styles.features}>
        <h2>Why Choose Carbon Chain?</h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🌱</div>
            <h3>Transparent Tracking</h3>
            <p>Immutable blockchain records ensure complete transparency in carbon reduction efforts.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🏆</div>
            <h3>Token Rewards</h3>
            <p>Earn tokens for verified carbon reduction achievements, creating real value from environmental responsibility.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📊</div>
            <h3>Verified Impact</h3>
            <p>Professional auditing process validates and quantifies your carbon reduction efforts.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🤝</div>
            <h3>Community Driven</h3>
            <p>Join a network of forward-thinking companies committed to environmental sustainability.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={styles.howItWorks}>
        <h2>How It Works</h2>
        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <h3>Register & Connect</h3>
            <p>Join our platform and connect your company's sustainability data.</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <h3>Measure & Verify</h3>
            <p>Our auditors assess and verify your carbon reduction initiatives.</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <h3>Earn Rewards</h3>
            <p>Receive tokens based on your verified carbon reduction achievements.</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>4</div>
            <h3>Track Progress</h3>
            <p>Monitor your impact through our transparent blockchain ledger.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <h2>Ready to Make a Difference?</h2>
        <p>Join leading companies in the fight against climate change.</p>
        <Link href="/register" className={styles.ctaButton}>
          Get Started Today
        </Link>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h4>Carbon Chain</h4>
            <p>Building a sustainable future through blockchain innovation.</p>
          </div>
          <div className={styles.footerSection}>
            <h4>Quick Links</h4>
            <Link href="/about">About Us</Link>
            <Link href="/how-it-works">How It Works</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className={styles.footerSection}>
            <h4>Resources</h4>
            <Link href="/documentation">Documentation</Link>
            <Link href="/case-studies">Case Studies</Link>
            <Link href="/blog">Blog</Link>
          </div>
          <div className={styles.footerSection}>
            <h4>Connect</h4>
            <Link href="/contact">Contact Us</Link>
            <Link href="/support">Support</Link>
            <div className={styles.socialLinks}>
              {/* Add social media icons/links here */}
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; 2024 Carbon Chain. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}