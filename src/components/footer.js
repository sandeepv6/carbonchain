import Link from 'next/link';
import styles from '@/app/app.module.css';

export default function Footer() {
    return (
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
    );
}