'use client';
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import styles from './dashboard.module.css';
import { NearContext } from '@/wallets/near';
import { CarbonFootprintContract } from '@/config';

export default function Dashboard() {
  const { signedAccountId, wallet } = useContext(NearContext);
  const router = useRouter();
  const [tickets, setTickets] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    if (!signedAccountId) {
      router.push('/login');
    } else {
      fetchTickets();
    }
  }, [signedAccountId]);

  const fetchTickets = async () => {
    try {
      const userTickets = await wallet.viewMethod({
        contractId: CarbonFootprintContract,
        method: 'get_user_tickets',
        args: { account_id: signedAccountId }
      });
      setTickets(userTickets);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    setIsUploading(true);
    setUploadProgress(0);
  
    try {
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 500);
  
      const formData = new FormData();
      formData.append('file', file);
  
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
  
      if (!response.ok) {
        throw new Error('File upload failed');
      }
  
      const { fileUrl, parsedData } = await response.json();
      
      // Send parsed data to chat route for analysis
      const analysisResponse = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: parsedData }),
      });

      if (!analysisResponse.ok) {
        throw new Error('Analysis failed');
      }

      const carbonAnalysis = await analysisResponse.json();
      console.log(carbonAnalysis);
      
      clearInterval(interval);
      setUploadProgress(100);
  
      // Create ticket on blockchain with analysis data
      await wallet.callMethod({
        contractId: CarbonFootprintContract,
        method: 'create_ticket',
        args: {
          document_url: fileUrl,
          carbon_reduction: carbonAnalysis.total_reduction,
          percentage_reduction: carbonAnalysis.percentage_reduction,
          explanation: carbonAnalysis.explanation,
          account_id: signedAccountId
        }
      });
  
      await fetchTickets();
      setIsUploading(false);
      setUploadProgress(0);
    } catch (error) {
      console.error('Error uploading file:', error);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <h1>Welcome, {signedAccountId}</h1>
        <p>Submit and track your carbon reduction initiatives</p>
      </header>

      <main className={styles.mainContent}>
        <section className={styles.uploadSection}>
          <h2>Submit New Initiative</h2>
          <div className={styles.uploadCard}>
            <input
              type="file"
              id="documentUpload"
              onChange={handleFileUpload}
              accept=".pdf,.doc,.docx,.xlsx"
              className={styles.fileInput}
              disabled={isUploading}
            />
            <label htmlFor="documentUpload" className={styles.uploadLabel}>
              {isUploading ? (
                <div className={styles.uploadProgress}>
                  <div 
                    className={styles.progressBar}
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                  <span>{uploadProgress}%</span>
                </div>
              ) : (
                <>
                  <span className={styles.uploadIcon}>📄</span>
                  <span>Drop your documents here or click to browse</span>
                  <span className={styles.supportedFormats}>
                    Supported formats: PDF, DOC, DOCX, XLSX
                  </span>
                </>
              )}
            </label>
          </div>
        </section>

        <section className={styles.ticketsSection}>
          <h2>Your Initiatives</h2>
          <div className={styles.ticketsList}>
            {tickets.map((ticket) => (
              <div key={ticket.id} className={styles.ticketCard}>
                <div className={styles.ticketHeader}>
                  <h3>Ticket #{ticket.id}</h3>
                  <span className={styles.status} data-status={ticket.status}>
                    {ticket.status}
                  </span>
                </div>
                <div className={styles.ticketDetails}>
                  <p><strong>Submitted:</strong> {new Date(ticket.created_at).toLocaleDateString()}</p>
                  <p><strong>Carbon Reduction:</strong> {ticket.carbon_reduction || 'Pending Review'} MT</p>
                  <p><strong>Tokens Earned:</strong> {ticket.tokens_earned || '0'}</p>
                </div>
                <div className={styles.ticketActions}>
                  <button className={styles.viewButton}>View Details</button>
                </div>
              </div>
            ))}
            {tickets.length === 0 && (
              <div className={styles.noTickets}>
                <p>No initiatives submitted yet. Start by uploading your first document!</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
} 