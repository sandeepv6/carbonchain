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

  const handleVerifyTicket = async (ticketId, carbonReduction) => {
    setIsProcessing(true);
    try {
      await wallet.callMethod({
        contractId: CarbonFootprintContract,
        method: 'verify_ticket',
        args: {
          ticket_id: ticketId,
          carbon_reduction: carbonReduction,
          tokens_to_mint: calculateTokens(carbonReduction)
        }
      });
      await fetchPendingTickets();
      setSelectedTicket(null);
    } catch (error) {
      console.error('Error verifying ticket:', error);
    }
    setIsProcessing(false);
  };

  const calculateTokens = (carbonReduction) => {
    // Example: 1 token per metric ton of carbon reduced
    return carbonReduction;
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
                    <span className={styles.submitter}>{ticket.account_id}</span>
                  </div>
                  <div className={styles.ticketMeta}>
                    <p>Submitted: {new Date(ticket.created_at).toLocaleDateString()}</p>
                    <p>AI Estimated Reduction: {ticket.ai_estimation} MT</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.ticketDetails}>
            {selectedTicket ? (
              <div className={styles.detailsCard}>
                <h2>Review Details</h2>
                <div className={styles.documentPreview}>
                  <iframe 
                    src={selectedTicket.document_url} 
                    title="Document Preview"
                  ></iframe>
                </div>
                <div className={styles.aiAnalysis}>
                  <h3>AI Analysis</h3>
                  <pre>{JSON.stringify(selectedTicket.ai_analysis, null, 2)}</pre>
                </div>
                <div className={styles.verificationForm}>
                  <h3>Verification</h3>
                  <div className={styles.formGroup}>
                    <label>Verified Carbon Reduction (MT)</label>
                    <input 
                      type="number" 
                      defaultValue={selectedTicket.ai_estimation}
                      min="0"
                      step="0.1"
                    />
                  </div>
                  <div className={styles.formActions}>
                    <button 
                      className={styles.approveButton}
                      onClick={() => handleVerifyTicket(selectedTicket.id, selectedTicket.ai_estimation)}
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Processing...' : 'Approve & Mint Tokens'}
                    </button>
                    <button className={styles.rejectButton}>
                      Request Revision
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