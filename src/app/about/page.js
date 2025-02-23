import styles from '../app.module.css'
import Link from 'next/link'
import globalStyles from '../globals.css'
import Footer from '@/components/footer'
export default function About() {
    return (
        <>
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
        <Link href="/login" className={globalStyles.primaryButton}>
          Get Started Today
        </Link>
      </section>

      <Footer />
        </>
    )
}