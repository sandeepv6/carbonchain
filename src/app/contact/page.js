'use client';
import { useState } from 'react';
import styles from './contact.module.css';
import Footer from '@/components/footer';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      // TODO: Implement your form submission logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      setSubmitStatus({
        type: 'success',
        message: 'Thank you for your message. We will get back to you soon!'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'An error occurred. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <section className={styles.contactSection}>
          <div className={styles.contactContent}>
            <div className={styles.contactInfo}>
              <h1>Get in Touch</h1>
              <p>Have questions about Carbon Chain? We're here to help!</p>
              
              <div className={styles.infoCards}>
                <div className={styles.infoCard}>
                  <div className={styles.iconWrapper}>
                    <span className={styles.icon}>📍</span>
                  </div>
                  <h3>Visit Us</h3>
                  <p>123 Green Street<br />Eco City, EC 12345</p>
                </div>

                <div className={styles.infoCard}>
                  <div className={styles.iconWrapper}>
                    <span className={styles.icon}>📧</span>
                  </div>
                  <h3>Email Us</h3>
                  <p>info@carbonchain.com<br />support@carbonchain.com</p>
                </div>

                <div className={styles.infoCard}>
                  <div className={styles.iconWrapper}>
                    <span className={styles.icon}>📞</span>
                  </div>
                  <h3>Call Us</h3>
                  <p>+1 (555) 123-4567<br />Mon - Fri, 9am - 6pm</p>
                </div>

                <div className={styles.infoCard}>
                  <div className={styles.iconWrapper}>
                    <span className={styles.icon}>⏰</span>
                  </div>
                  <h3>Working Hours</h3>
                  <p>Monday - Friday<br />9:00 AM - 6:00 PM EST</p>
                </div>
              </div>
            </div>

            <div className={styles.contactForm}>
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                  />
                </div>

                {submitStatus.message && (
                  <div className={`${styles.submitStatus} ${styles[submitStatus.type]}`}>
                    {submitStatus.message}
                  </div>
                )}

                <button 
                  type="submit" 
                  className={styles.submitButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
} 