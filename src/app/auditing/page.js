import styles from './auditing.module.css';

export default function Auditing() {
  return (
        <div className={styles.flowchart}>
          <div className={styles.flowstep}>
            <h3>1️⃣ Submit Your Evidence</h3>
            <p>Users upload forms, videos, or images as proof of their ecological actions.</p>
            <p>The system provides guidelines to ensure submissions meet verification standards.</p>
          </div>
          <div className={styles.arrow}>↓</div>
          <div className={styles.flowstep}>
            <h3>2️⃣ AI Analysis</h3>
            <p>An AI model analyzes the submission to detect validity, completeness, and potential anomalies.</p>
            <p>The AI generates a preliminary score based on various environmental impact factors.</p>
          </div>
          <div className={styles.arrow}>↓</div>
          <div className={styles.flowstep}>
            <h3>3️⃣ Human Auditor Review</h3>
            <p>A professional auditor reviews the AI-generated report.</p>
            <p>The auditor verifies whether the submission meets ecological impact standards.</p>
            <p>If required, the auditor may request additional information from the user.</p>
          </div>
          <div className={styles.arrow}>↓</div>
          <div className={styles.flowstep}>
            <h3>4️⃣ Approval & Token Distribution</h3>
            <p>Once verified, the user receives carbon credits/tokens.</p>
            <p>These tokens can be used for offsetting emissions, trading, or supporting eco-friendly projects.</p>
          </div>
        </div>
  );
}
