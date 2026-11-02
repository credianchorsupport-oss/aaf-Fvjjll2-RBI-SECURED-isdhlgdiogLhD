import React from 'react';

interface PrivacyScreenProps {
  onBack: () => void;
}

export const PrivacyScreen: React.FC<PrivacyScreenProps> = ({ onBack }) => {
  return (
    <div id="s6">
      <div className="phead">
        <button className="back" onClick={onBack} aria-label="Back to My page">
          <svg viewBox="0 0 10 18">
            <path d="M8.5 1.5L2 9l6.5 7.5" stroke="#111" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1>Privacy Policy</h1>
      </div>

      <div className="pol">
        <h2>Privacy Policy</h2>
        <p>This Privacy Policy explains how Sasural ka nati (“we,” “us,” or “our”) collects, uses, protects, and discloses your information when you access or use our mobile application and related services.</p>
        <p>By installing, registering, or using Sasural ka nati, you acknowledge that you have read and understood this policy. If you do not agree with these terms, please refrain from using our App.</p>

        <h3>1. Data We Collect About You</h3>
        <p>Upon obtaining your consent, we collect, transmit, and store personal data about you on our secure servers in order to provide services to you or carry out service-related activities. Please note that we collect and process only the minimal amount of data necessary to provide services to you. Such data includes:</p>

        <h3>A. Personal Information</h3>
        <p>When you complete KYC (Know Your Customer) verification, we may ask you to provide:</p>
        <p>Full name, date of birth, mobile phone number, bank card information, occupation, income details, and government-issued identification documents.</p>

        <h3>B. Device Information</h3>
        <p>We collect device model, operating system version, application version, screen resolution, network connection status, IP address, crash logs, and performance metrics. This information is used solely to verify device identity, prevent identity theft, and ensure the security of your transactions.</p>

        <h3>C. List of Installed Apps</h3>
        <p>To prevent fraud and determine an appropriate credit limit for you, we need to access the list of applications installed on your device. We collect only app names and category metadata; we never access or read your personal data within other applications.</p>

        <h3>D. Approximate Location Information</h3>
        <p>We collect your approximate location data to confirm service availability in your area, mitigate risks, and guard against unauthorized login attempts. We do not collect or track precise location data.</p>

        <h3>E. Camera Permissions</h3>
        <p>When you voluntarily perform identity verification or upload files, we may request access to your device’s camera to capture identity documents and photos for liveness detection.</p>

        <h3>F. SMS Data</h3>
        <p>With your explicit consent, we may process SMS records related to financial transactions to assess cash flow, verify income, and support credit evaluation and fraud detection.</p>
        <p>We process only finance-related SMS messages (such as transaction alerts and bank notifications). We never access, read, store, or monitor your personal text messages, private conversations, or the content of non-financial SMS messages. All data is encrypted and securely transmitted to our secure server.</p>
        <p>This allows us to use your real transaction history—rather than relying only on self-reported figures—as a basis for determining the credit limit that best fits your financial situation.</p>

        <h3>2. How We Use Your Information</h3>
        <p>We process your data solely for operational, verification, and legal compliance purposes, specifically including:</p>
        <p>Creating and managing your Sasural ka nati account.</p>
        <p>Verifying identity, completing mandatory KYC (Know Your Customer) processes, and assessing eligibility for credit limits.</p>
        <p>Supporting billing processing, repayment tracking, and account management.</p>
        <p>Detecting and preventing fraud, unauthorized access, and security threats.</p>
        <p>Providing technical troubleshooting and customer support services.</p>
        <p>Fulfilling legal obligations, regulatory requirements, and risk management responsibilities.</p>

        <h3>3. Information Sharing and Disclosure</h3>
        <p>We only share data with third parties under strict confidentiality standards in the following scenarios:</p>
        <p>Service Providers: Vendor partners assisting with identity verification, KYC, cloud storage, security infrastructure, diagnostic analytics, and customer support.</p>
        <p>Legal Compliance: Authorities, regulators, or courts when required by law, subpoena, valid legal process, or to prevent fraudulent activity.</p>

        <h3>4. Data Security and Retention</h3>
        <p>Security Safeguards</p>
        <p>We deploy robust organizational and technical safeguards—including encryption in transit (HTTPS/TLS) to our secure servers—to protect your personal information against unauthorized access, loss, or alteration.</p>
        <p>Retention Period</p>
        <p>We retain personal data only as long as necessary to fulfill the purposes outlined in this policy, service your account, resolve disputes, or comply with statutory retention requirements under applicable financial and privacy laws. Expired or unneeded data is securely deleted or anonymized.</p>

        <h3>5. User Rights and Data Deletion</h3>
        <p>You have control over your data. Depending on your jurisdiction, you may:</p>
        <p>Request access to, correction of, or updating of your personal information.</p>
        <p>Revoke previously granted permissions (e.g., Camera or Location) via your Android device settings.</p>
        <p>Request the deletion of your Sasural ka nati account and associated data.</p>
        <p>If you wish to delete your account and associated data, you can contact us directly by sending an email to yea.demo.gmailhea@gmail.com.</p>
        <p>Requests are generally processed within 15 business days. Please note that certain transaction records or KYC logs may be retained temporarily where required by anti-money laundering (AML) or fraud prevention laws.</p>

        <h3>6. Age Restriction</h3>
        <p>Sasural ka nati is strictly intended for individuals aged 18 years or older. We do not knowingly collect or process personal data from minors under 18. If we discover that a minor’s data has been collected, we will take immediate steps to remove it.</p>

        <h3>7. Policy Updates</h3>
        <p>We may update this Privacy Policy from time to time to reflect functional updates, regulatory changes, or revised operational practices. Updated versions will be posted within the App. Your continued use of Sasural ka nati signifies your acknowledgment of the revised Privacy Policy.</p>

        <h3>8. Contact Us</h3>
        <p>If you have questions, concerns, or privacy requests regarding this Privacy Policy, please reach out to our privacy team at:</p>
        <p>Email: yea.demo.gmailhea@gmail.com</p>
      </div>
    </div>
  );
};
