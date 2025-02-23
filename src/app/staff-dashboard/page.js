'use client';
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import styles from './staff-dashboard.module.css';
import { NearContext } from '@/wallets/near';
import { CarbonFootprintContract } from '@/config';

export default function StaffDashboard() {
  const { signedAccountId, wallet } = useContext(NearContext);
  const router = useRouter();
  const [pendingTickets, setPendingTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!signedAccountId) {
      router.push('/login');
    } else {
      fetchPendingTickets();
    }
  }, [signedAccountId]);

  const fetchPendingTickets = async () => {
    try {
      const tickets = await wallet.viewMethod({
        contractId: CarbonFootprintContract,
        method: 'get_pending_tickets'
      });
      setPendingTickets(tickets);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  const handleVerifyTicket = async (ticketId) => {
    setIsProcessing(true);
    try {
      await wallet.callMethod({
        contractId: CarbonFootprintContract,
        method: 'verify_ticket',
        args: {
          ticket_id: ticketId,
          account_id: signedAccountId
        }
      });
      await fetchPendingTickets();
      setSelectedTicket(null);
    } catch (error) {
      console.error('Error verifying ticket:', error);
    }
    setIsProcessing(false);
  };

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <h1>Staff Dashboard</h1>
        <p>Review and verify carbon reduction initiatives</p>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.ticketGrid}>
          <section className={styles.ticketsList}>
            <h2>Pending Reviews</h2>
            <div className={styles.ticketsContainer}>
              {pendingTickets.map((ticket) => (
                <div 
                  key={ticket.id} 
                  className={`${styles.ticketCard} ${selectedTicket?.id === ticket.id ? styles.selected : ''}`}
                  onClick={() => setSelectedTicket(ticket)}
                >
                  <div className={styles.ticketHeader}>
                    <h3>Ticket #{ticket.id}</h3>
                    <span className={styles.submitter}>{ticket.accountId}</span>
                  </div>
                  <div className={styles.ticketMeta}>
                    <p>Submitted: {new Date(ticket.timestamp).toLocaleDateString()}</p>
                    <p>Carbon Reduction: {ticket.carbonReduction} MT</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.ticketDetails}>
            {selectedTicket ? (
              <div className={styles.detailsCard}>
                <h2>Review Details</h2>
                <div className={styles.aiAnalysis}>
                  <h3>AI Analysis</h3>
                  <p><strong>Carbon Reduction:</strong> {selectedTicket.carbonReduction} MT</p>
                  <p><strong>Percentage Reduction:</strong> {selectedTicket.percentageReduction}%</p>
                  <p><strong>Explanation:</strong> {selectedTicket.explanation}</p>
                </div>
                <div className={styles.verificationForm}>
                  {/* <h3>Verification</h3> */}
                  <div className={styles.formActions}>
                    <button 
                      className={styles.approveButton}
                      onClick={() => handleVerifyTicket(selectedTicket.id)}
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Processing...' : 'Approve & Verify'}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.noSelection}>
                <p>Select a ticket to review</p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
} 