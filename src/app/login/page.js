'use client';
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';
import { NearContext } from '@/wallets/near';
import { AuthContract } from '@/config';

const STAFF_EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@(staff\.|admin\.)?company\.com$/;

export default function Login() {
  const { signedAccountId, wallet } = useContext(NearContext);
  const router = useRouter();
  
  const [isLogin, setIsLogin] = useState(true);
  const [identifier, setIdentifier] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (signedAccountId) {
      checkUserExists();
    }
  }, [signedAccountId]);

  const checkUserExists = async () => {
    if (!wallet) return;
    
    try {
      const userExists = await wallet.viewMethod({
        contractId: AuthContract,
        method: 'check_user_exists',
        args: { account_id: signedAccountId }
      });

      if (userExists) {
        router.push('/dashboard');
      }
    } catch (err) {
      console.error('Error checking user:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!signedAccountId) {
        await wallet.signIn();
        return;
      }

      if (isLogin) {
        // Login logic
        const user = await wallet.viewMethod({
          contractId: AuthContract,
          method: 'login_user',
          args: { identifier }
        });
        
        if (user) {
          router.push('/dashboard');
        } else {
          setError('Invalid credentials');
        }
      } else {
        // Signup logic
        const isStaff = STAFF_EMAIL_REGEX.test(email);
        
        await wallet.callMethod({
          contractId: AuthContract,
          method: 'register_user',
          args: {
            account_id: signedAccountId,
            email,
            username: identifier,
            is_staff: isStaff
          }
        });

        router.push('/dashboard');
      }
    } catch (err) {
      console.error('Auth error:', err);
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
          <p>
            {isLogin 
              ? 'Welcome back! Please login to continue.' 
              : 'Create an account to join Carbon Chain.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {!signedAccountId && (
            <button 
              type="button" 
              className={styles.connectWallet}
              onClick={() => wallet.signIn()}
            >
              Connect NEAR Wallet
            </button>
          )}

          <div className={styles.formGroup}>
            <label>
              {isLogin ? 'Email or Username' : 'Username'}
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                placeholder={isLogin ? "Enter email or username" : "Choose a username"}
              />
            </label>
          </div>

          {!isLogin && (
            <div className={styles.formGroup}>
              <label>
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                />
              </label>
            </div>
          )}

          {error && <div className={styles.error}>{error}</div>}

          <button 
            type="submit" 
            className={styles.submitButton} 
            disabled={loading || !signedAccountId}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm" />
            ) : signedAccountId ? (
              isLogin ? 'Login' : 'Sign Up'
            ) : (
              'Please connect wallet first'
            )}
          </button>
        </form>

        <div className={styles.switchMode}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            className={styles.switchButton}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </div>
      </div>
    </main>
  );
} 