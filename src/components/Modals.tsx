import React, { useState } from 'react';
import { LoanOrder, kind, lateInfo, money } from '../utils/loan';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onToast: (msg: string) => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, onToast }) => {
  if (!isOpen) return null;

  const email = 'yea.demo.gmailhea@gmail.com';

  const handleCopy = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(
        () => onToast('Copied'),
        () => onToast('Press and hold the email to copy')
      );
    } else {
      onToast('Copied');
    }
  };

  return (
    <div id="modal" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="mbox" role="dialog" aria-label="Contact US">
        <div className="mtitle">Contact US</div>
        <svg className="rb" viewBox="0 0 100 112" aria-hidden="true">
          <defs>
            <linearGradient id="hx" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fcd0c0" />
              <stop offset="1" stopColor="#f7b8a4" />
            </linearGradient>
          </defs>
          <path d="M50 2L94 28V84L50 110L6 84V28Z" fill="url(#hx)" />
          <path d="M30 63L20 80" stroke="#fff" strokeWidth="5.5" strokeLinecap="round" />
          <circle cx="19" cy="83" r="5.5" fill="#ff7a2a" />
          <path d="M68 56L76 43" stroke="#fff" strokeWidth="5.5" strokeLinecap="round" />
          <circle cx="77" cy="40" r="6" fill="#ff6a1a" />
          <rect x="26" y="34" width="44" height="38" rx="13" fill="#fff" stroke="#e6e6f0" />
          <rect x="31" y="39" width="34" height="21" rx="9" fill="#0e1b2e" />
          <rect x="39" y="45" width="4" height="9" rx="2" fill="#19c3ff" />
          <rect x="53" y="45" width="4" height="9" rx="2" fill="#19c3ff" />
          <rect x="34" y="65" width="28" height="4" rx="2" fill="#ececf4" />
        </svg>

        <div className="mrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="#5b6573" strokeWidth="1.8" strokeLinejoin="round">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M3.5 6.5L12 13l8.5-6.5" />
          </svg>
          <span id="mail">{email}</span>
          <button id="copy" onClick={handleCopy} aria-label="Copy email">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinejoin="round">
              <rect x="8" y="8" width="12" height="12" rx="3" />
              <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
            </svg>
          </button>
        </div>
      </div>
      <button id="close" onClick={onClose} aria-label="Close contact dialog">
        <svg width="14" height="14" viewBox="0 0 14 14" stroke="#fff" strokeWidth="1.6" strokeLinecap="round">
          <path d="M2 2L12 12M12 2L2 12" />
        </svg>
      </button>
    </div>
  );
};

interface TipsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TipsModal: React.FC<TipsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div id="tips" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="tbox" role="dialog" aria-label="TIPS">
        <h3>TIPS</h3>
        <svg className="bell" viewBox="0 0 350 260" aria-hidden="true">
          <defs>
            <linearGradient id="bg1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#fff" />
              <stop offset="1" stopColor="#e6e2df" />
            </linearGradient>
            <linearGradient id="bg2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffd84a" />
              <stop offset="1" stopColor="#ffa81c" />
            </linearGradient>
          </defs>
          <circle cx="178" cy="122" r="120" fill="url(#bg1)" />
          <path d="M62 190L88 256L142 230Z" fill="#f1eeec" />
          <g transform="rotate(-10 178 135)">
            <path d="M120 156C120 94 145 58 178 58C211 58 236 94 236 156Z" fill="url(#bg2)" />
            <rect x="167" y="40" width="22" height="16" rx="7" fill="#ffc22e" />
            <ellipse cx="178" cy="162" rx="84" ry="22" fill="#ffb81e" />
            <ellipse cx="178" cy="164" rx="62" ry="13" fill="#f29a10" />
            <circle cx="178" cy="180" r="16" fill="#ffc42a" />
          </g>
          <path d="M44 150Q28 176 48 208M12 170Q5 186 17 202" stroke="#ffb11f" strokeWidth="9" strokeLinecap="round" fill="none" />
          <path d="M306 52Q324 70 318 98M338 62Q346 76 340 90" stroke="#ffb11f" strokeWidth="9" strokeLinecap="round" fill="none" />
        </svg>
        <p>Currently the latest version!</p>
        <button className="tok" id="tok" onClick={onClose}>
          OK
        </button>
      </div>
      <button id="tclose" onClick={onClose} aria-label="Close update tips">
        <svg width="14" height="14" viewBox="0 0 14 14" stroke="#fff" strokeWidth="1.6" strokeLinecap="round">
          <path d="M2 2L12 12M12 2L2 12" />
        </svg>
      </button>
    </div>
  );
};

interface AmountSheetProps {
  isOpen: boolean;
  order: LoanOrder | null;
  onClose: () => void;
}

export const AmountSheet: React.FC<AmountSheetProps> = ({ isOpen, order, onClose }) => {
  if (!isOpen || !order) return null;

  const k = kind(order);
  const L = lateInfo(order);
  const isLate = k === 'od';

  return (
    <div id="asheet" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`sheet ${isLate ? 'late' : ''}`} id="sheetbox" role="dialog" aria-label="Amount Details">
        <h3>Amount Details</h3>
        <button className="sx" id="sx" onClick={onClose} aria-label="Close amount details">
          <svg width="16" height="16" viewBox="0 0 16 16" stroke="#111" strokeWidth="2.2" strokeLinecap="round">
            <path d="M2 2L14 14M14 2L2 14" />
          </svg>
        </button>

        <svg className="scoin" viewBox="0 0 302 235" aria-hidden="true">
          <defs>
            <linearGradient id="cg1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ffe27a" />
              <stop offset="1" stopColor="#f0a928" />
            </linearGradient>
            <linearGradient id="cg2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#7fb04a" />
              <stop offset="1" stopColor="#4f8a2c" />
            </linearGradient>
          </defs>
          <path d="M20 80Q30 40 70 36Q86 90 70 150Q30 140 20 80Z" fill="url(#cg2)" />
          <path d="M282 108Q276 78 232 88Q216 130 232 170Q272 170 282 108Z" fill="url(#cg2)" />
          <ellipse cx="150" cy="212" rx="120" ry="16" fill="#fbe6b0" opacity=".6" />
          <ellipse cx="156" cy="108" rx="92" ry="88" fill="#e9a21f" transform="rotate(-22 156 108)" />
          <ellipse cx="150" cy="102" rx="92" ry="88" fill="url(#cg1)" transform="rotate(-22 150 102)" />
          <ellipse cx="148" cy="102" rx="72" ry="68" fill="#f7cc52" stroke="#f0b53a" strokeWidth="3" transform="rotate(-22 148 102)" />
          <text x="150" y="132" textAnchor="middle" fontSize="84" fontWeight="800" fill="#ec9a1f" fontFamily="Poppins,sans-serif" transform="rotate(-18 150 110)">₹</text>
          <ellipse cx="62" cy="206" rx="30" ry="9" fill="#f0a82a" />
          <ellipse cx="62" cy="199" rx="30" ry="9" fill="#f6c443" />
          <ellipse cx="62" cy="192" rx="30" ry="9" fill="#fbd45e" />
          <ellipse cx="232" cy="204" rx="32" ry="16" fill="#f0a82a" />
          <ellipse cx="232" cy="198" rx="32" ry="16" fill="#fbd45e" stroke="#f0b030" />
        </svg>

        <div className="srows">
          <div className="srow">
            <span>Line of credit</span>
            <b id="sl">{order.amt}</b>
          </div>
          {isLate && (
            <div className="srow lf" style={{ display: 'flex' }}>
              <span>Late fee</span>
              <b id="slf">{money(L.fee)}</b>
            </div>
          )}
          <div className="srow">
            <span>Amount Paid</span>
            <b id="sp">{k === 'paid' ? order.amt : '₹0'}</b>
          </div>
        </div>

        <button className="sok" id="sok" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

interface RepaymentModalProps {
  isOpen: boolean;
  order: LoanOrder | null;
  onClose: () => void;
  onConfirmPayment: (order: LoanOrder) => void;
}

export const RepaymentModal: React.FC<RepaymentModalProps> = ({
  isOpen,
  order,
  onClose,
  onConfirmPayment,
}) => {
  const [selectedChannel, setSelectedChannel] = useState<'gpay' | 'phonepe' | 'paytm' | 'qr'>('gpay');
  const [processing, setProcessing] = useState(false);

  if (!isOpen || !order) return null;

  const k = kind(order);
  const L = lateInfo(order);
  const repayAmount = k === 'od' ? L.total : L.loan;

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      onConfirmPayment(order);
    }, 1200);
  };

  return (
    <div id="asheet" onClick={(e) => e.target === e.currentTarget && !processing && onClose()}>
      <div className="pay-sheet" role="dialog" aria-label="Official Repayment Portal">
        <button
          className="sx"
          onClick={onClose}
          disabled={processing}
          aria-label="Close repayment portal"
          style={{ position: 'absolute', right: '18px', top: '16px' }}
        >
          <svg width="18" height="18" viewBox="0 0 16 16" stroke="#111" strokeWidth="2.2" strokeLinecap="round">
            <path d="M2 2L14 14M14 2L2 14" />
          </svg>
        </button>

        <div className="pay-title">Official Repayment Portal</div>

        <div className="pay-amt-box">
          <p className="lbl">Total Payable Amount for {order.n}</p>
          <div className="val">{money(repayAmount)}</div>
          <div style={{ fontSize: '11px', color: '#666', marginTop: '4px' }}>
            Order #{order.no.slice(0, 16)}...
          </div>
        </div>

        <div style={{ fontSize: '14px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>
          Select Repayment UPI Channel
        </div>

        <div className="upi-list">
          <div
            className={`upi-item ${selectedChannel === 'gpay' ? 'selected' : ''}`}
            onClick={() => setSelectedChannel('gpay')}
            role="button"
            tabIndex={0}
          >
            <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#eef3fd', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#4285f4' }}>
              G
            </div>
            <span>Google Pay UPI</span>
            <div className="upi-radio" />
          </div>

          <div
            className={`upi-item ${selectedChannel === 'phonepe' ? 'selected' : ''}`}
            onClick={() => setSelectedChannel('phonepe')}
            role="button"
            tabIndex={0}
          >
            <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#f2e8fa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#5f259f' }}>
              Pe
            </div>
            <span>PhonePe UPI</span>
            <div className="upi-radio" />
          </div>

          <div
            className={`upi-item ${selectedChannel === 'paytm' ? 'selected' : ''}`}
            onClick={() => setSelectedChannel('paytm')}
            role="button"
            tabIndex={0}
          >
            <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#e6f7fc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#00baf2' }}>
              ₹
            </div>
            <span>Paytm UPI / Netbanking</span>
            <div className="upi-radio" />
          </div>

          <div
            className={`upi-item ${selectedChannel === 'qr' ? 'selected' : ''}`}
            onClick={() => setSelectedChannel('qr')}
            role="button"
            tabIndex={0}
          >
            <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#fff2df', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#ea8a2e' }}>
              QR
            </div>
            <span>Dynamic UPI QR Code</span>
            <div className="upi-radio" />
          </div>
        </div>

        <button
          className="pay-btn-confirm"
          onClick={handlePay}
          disabled={processing}
        >
          {processing ? 'Processing Payment...' : `Pay ${money(repayAmount)} Now`}
        </button>
      </div>
    </div>
  );
};

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div id="modal" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="mbox" role="dialog" aria-label="Log Out Confirmation">
        <div className="mtitle" style={{ fontSize: '20px', fontWeight: 700, color: '#2a1500' }}>
          Log Out
        </div>
        <p style={{ margin: '16px 0 24px', fontSize: '15px', color: '#555', lineHeight: 1.5 }}>
          Are you sure you want to log out of your Sasural ka nati account?
        </p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              height: '46px',
              border: '1.5px solid #ccc',
              borderRadius: '23px',
              background: '#f8f8f8',
              font: '600 15px var(--sans)',
              color: '#444',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              flex: 1,
              height: '46px',
              border: '0',
              borderRadius: '23px',
              background: 'linear-gradient(90deg, #ff5e5e, #e03232)',
              font: '700 15px var(--sans)',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            Log Out
          </button>
        </div>
      </div>
      <button id="logout-close" onClick={onClose} aria-label="Close logout dialog">
        <svg width="14" height="14" viewBox="0 0 14 14" stroke="#fff" strokeWidth="1.6" strokeLinecap="round">
          <path d="M2 2L12 12M12 2L2 12" />
        </svg>
      </button>
    </div>
  );
};

interface InfoViewerModalProps {
  isOpen: boolean;
  type: 'bank' | 'basic' | 'kyc' | null;
  onClose: () => void;
}

export const InfoViewerModal: React.FC<InfoViewerModalProps> = ({ isOpen, type, onClose }) => {
  if (!isOpen || !type) return null;

  const titles = {
    bank: 'Verified Bank Details',
    basic: 'Basic Account Details',
    kyc: 'Verified KYC Documents',
  };

  return (
    <div id="modal" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="info-modal-box" role="dialog" aria-label={titles[type]}>
        <div className="info-modal-title">
          <span>{titles[type]}</span>
          <span style={{ fontSize: '12px', background: '#e2f4e2', color: '#2b8a3e', padding: '3px 8px', borderRadius: '12px' }}>
            Verified
          </span>
        </div>

        {type === 'bank' && (
          <div>
            <div className="info-field">
              <label>Bank Name</label>
              <div className="val">State Bank of India (SBI)</div>
            </div>
            <div className="info-field">
              <label>Account Number</label>
              <div className="val">**********6858</div>
            </div>
            <div className="info-field">
              <label>IFSC Code</label>
              <div className="val">SBIN0004521</div>
            </div>
            <div className="info-field">
              <label>Disbursement Status</label>
              <div className="val" style={{ color: '#2b8a3e' }}>Active & Ready for Instant Credit</div>
            </div>
          </div>
        )}

        {type === 'basic' && (
          <div>
            <div className="info-field">
              <label>Full Name</label>
              <div className="val">DEMO USER</div>
            </div>
            <div className="info-field">
              <label>Registered Mobile</label>
              <div className="val">+91 0000000000</div>
            </div>
            <div className="info-field">
              <label>Employment Status</label>
              <div className="val">Salaried Professional</div>
            </div>
            <div className="info-field">
              <label>Monthly Income</label>
              <div className="val">₹45,000 / month</div>
            </div>
          </div>
        )}

        {type === 'kyc' && (
          <div>
            <div className="info-field">
              <label>Aadhaar Card</label>
              <div className="val">XXXX-XXXX-9142 (UIDAI Verified)</div>
            </div>
            <div className="info-field">
              <label>PAN Card</label>
              <div className="val">ABCDE****K</div>
            </div>
            <div className="info-field">
              <label>Liveness Detection</label>
              <div className="val" style={{ color: '#2b8a3e' }}>Facial Match Passed (100%)</div>
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          style={{
            marginTop: '16px',
            width: '100%',
            height: '44px',
            border: 0,
            borderRadius: '22px',
            background: 'linear-gradient(90deg, #ffcc19, #ff8a0d)',
            font: '600 15px var(--sans)',
            color: '#16100a',
            cursor: 'pointer',
          }}
        >
          OK
        </button>
      </div>

      <button id="info-close" onClick={onClose} aria-label="Close info viewer">
        <svg width="14" height="14" viewBox="0 0 14 14" stroke="#fff" strokeWidth="1.6" strokeLinecap="round">
          <path d="M2 2L12 12M12 2L2 12" />
        </svg>
      </button>
    </div>
  );
};
