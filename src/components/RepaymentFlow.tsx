import React, { useState, useEffect } from 'react';
import { LoanOrder, num, money, dueOf, lateInfo } from '../utils/loan';
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
  const initialAppDate = (order.ad || order.d).replace(/\//g, '-');
  const [receivedDate, setReceivedDate] = useState<string>(initialAppDate);
  const [page, setPage] = useState<'main' | 'renew' | 'gateway'>('main');
  const [gatewayCaller, setGatewayCaller] = useState<'main' | 'renew'>('main');

  // Gateway state
  const upiId = adminConfig?.upiId || 'paytm.s3u8921@pty';
  const customerName = adminConfig?.customerName || 'BHAVIK KAMLESH SANGHVI';
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [utrInput, setUtrInput] = useState('');
  const [utrError, setUtrError] = useState('');
  const [showUtrSuccessModal, setShowUtrSuccessModal] = useState(false);
  const [submittedUtr, setSubmittedUtr] = useState('');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [gatewayAmount, setGatewayAmount] = useState<number>(0);
  const [timerSeconds, setTimerSeconds] = useState((adminConfig?.linkTimeMinutes || 10) * 60 - 103);
  const [isHindi, setIsHindi] = useState(false);

  // Dynamic calculations based on receivedDate
  const principal = num(order.amt);

  const calculateDynamicDates = (recDateStr: string) => {
    // recDateStr in DD-MM-YYYY or DD/MM/YYYY
    const parts = recDateStr.replace(/\//g, '-').split('-');
    const recDate = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
    const dueDate = new Date(recDate);
    dueDate.setDate(dueDate.getDate() + 7);

    const dueDay = String(dueDate.getDate()).padStart(2, '0');
    const dueMonth = String(dueDate.getMonth() + 1).padStart(2, '0');
    const dueDateFormatted = `${dueDay}-${dueMonth}-${dueDate.getFullYear()}`;

    // Current date for overdue comparison
    const now = new Date();
    const todayZero = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const dueDateZero = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());
    const diffTime = todayZero.getTime() - dueDateZero.getTime();
    const diffDays = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));

    const overdueDays = diffDays;
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
  };

  const currentCalc = calculateDynamicDates(receivedDate);

  // Countdown timer for Gateway
  useEffect(() => {
    if (page !== 'gateway') return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [page]);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m} : ${s < 10 ? '0' : ''}${s}`;
  };

  const handleEditReceivedDate = () => {
    const entered = window.prompt(
      'Enter Amount Received Date (DD-MM-YYYY):',
      receivedDate
    );
    if (entered && /^\d{2}[-/]\d{2}[-/]\d{4}$/.test(entered.trim())) {
      setReceivedDate(entered.trim().replace(/\//g, '-'));
    }
  };

  const handleOpenGateway = (amount: number, fromPage: 'main' | 'renew') => {
    setGatewayAmount(amount);
    setGatewayCaller(fromPage);
    setPage('gateway');
    window.scrollTo(0, 0);
  };

  const handleGatewayBack = () => {
    setShowCancelModal(true);
  };

  const handleConfirmExitGateway = () => {
    setShowCancelModal(false);
    if (gatewayCaller === 'renew') {
      setPage('renew');
    } else {
      setPage('main');
    }
  };

  const handleCopyUpi = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(upiId);
    }
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
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
    onPaymentSuccess(order, gatewayAmount, submittedUtr);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-[#ededed] min-h-screen flex flex-col relative select-none pb-28 text-neutral-900 font-sans">
      {/* ================= PAGE 1: REPAY MAIN PAGE ================= */}
      {page === 'main' && (
        <div id="mainRepayPage" className="flex flex-col flex-1">
          <header className="bg-white px-4 py-3.5 flex items-center justify-between border-b border-gray-100 shadow-xs sticky top-0 z-20">
            <button
              type="button"
              onClick={onBack}
              className="p-1 -ml-1 text-gray-800 hover:text-black focus:outline-none cursor-pointer"
              aria-label="Go back"
            >
              <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <h1 className="font-serif-clean font-bold text-lg text-gray-900 tracking-tight text-center flex-1 pr-5" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
              Repay
            </h1>
          </header>

          <main className="flex-1 px-4 pt-4 pb-6 space-y-3.5">
            {/* Brand Header */}
            <div className="flex items-center gap-3 pt-1 px-0.5">
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-b from-[#765bf5] via-[#654af0] to-[#5136e4] p-2.5 shadow-sm flex items-center justify-center shrink-0">
                {ICONS[order.ic] || (
                  <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-white">
                    <path d="M20 78 C35 88, 65 88, 80 78 C65 82, 35 82, 20 78 Z" fill="rgba(255, 255, 255, 0.45)" />
                    <path d="M50 18 C56 38, 58 56, 50 72 C42 56, 44 38, 50 18 Z" fill="currentColor" />
                    <path d="M50 72 C35 62, 30 44, 38 30 C45 44, 48 58, 50 72 Z" fill="rgba(255, 255, 255, 0.92)" />
                    <path d="M50 72 C65 62, 70 44, 62 30 C55 44, 52 58, 50 72 Z" fill="rgba(255, 255, 255, 0.92)" />
                  </svg>
                )}
              </div>
              <div>
                <span className="font-serif-clean font-bold text-xl text-neutral-900 tracking-tight block" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
                  {adminConfig?.appName || order.n}
                </span>
                <span className="text-xs text-gray-500 font-medium">Fast & Secure UPI Repayment</span>
              </div>
            </div>

            {/* Repayment Details Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100/90 pt-5 pb-2 px-5">
              <h2 className="text-center font-serif-clean text-[15.5px] text-gray-700 tracking-wide font-normal" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
                Repayment Amount
              </h2>

              <div className="text-center mt-1 mb-4">
                <span id="repaymentAmountText" className="font-serif-clean font-bold text-[34px] leading-tight text-[#2b2eb8] tracking-tight" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
                  ₹ {currentCalc.totalRemaining.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="space-y-3.5 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-normal text-[13.5px]">Name</span>
                  <span className="text-gray-700 font-medium text-[13.5px] tracking-wider uppercase truncate max-w-[210px] text-right">
                    {customerName}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-normal text-[13.5px]">Bank Address</span>
                  <span className="text-gray-700 font-medium text-[13px] tracking-wide uppercase truncate max-w-[210px]">
                    {adminConfig?.bankAddress || 'HDFC BANK, ANDHERI (W), MUMBAI'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-normal text-[13.5px]">Received amount</span>
                  <span className="text-gray-700 font-medium text-[13.5px]">
                    ₹ {principal.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-normal text-[13.5px]">Loan Amount</span>
                  <span className="text-gray-700 font-medium text-[13.5px]">
                    ₹ {principal.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-normal text-[13.5px]">Amount Paid</span>
                  <span id="amountPaidText" className="text-gray-700 font-medium text-[13.5px]">
                    ₹ 0
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-normal text-[13.5px]">Over Due</span>
                  <span id="overDueText" className="text-rose-600 font-medium text-[13.5px]">
                    {currentCalc.overdueDays} Days
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-normal text-[13.5px]">Late Fee</span>
                  <span id="overdueFeesText" className="text-gray-700 font-medium text-[13.5px]">
                    ₹ {currentCalc.lateFee.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="border-b border-dashed border-gray-200/90 my-2.5" />

                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-normal text-[13.5px]">Amount Received Date</span>
                  <div className="flex items-center gap-1.5">
                    <span id="receivedDateText" className="text-gray-700 font-medium text-[13.5px]">
                      {receivedDate}
                    </span>
                    <button
                      type="button"
                      onClick={handleEditReceivedDate}
                      className="text-indigo-600 hover:text-indigo-800 text-xs font-semibold px-1 py-0.5 border border-indigo-200 rounded cursor-pointer"
                    >
                      Edit
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-normal text-[13.5px]">Due Date</span>
                  <span id="dueDateText" className="text-gray-700 font-medium text-[13.5px]">
                    {currentCalc.dueDateFormatted}
                  </span>
                </div>

                <div className="border-b border-dashed border-gray-200/90 pt-1" />
              </div>

              <div className="flex justify-center -mt-1 pt-1 pb-1">
                <button type="button" className="p-1 rounded-full text-indigo-500 hover:text-indigo-700">
                  <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Tips Section */}
            <section className="mt-4 font-serif-clean text-[15.5px] leading-[1.45] select-text" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
              <h3 className="font-semibold text-neutral-900 text-[17px] mb-3">Tips:</h3>
              <div className="space-y-3.5">
                <p>
                  <strong className="text-[#ea1515] font-bold">! ! ! One UPI</strong> <span className="text-neutral-900">can only transfer money</span> <strong className="text-[#ea1515] font-bold">ONCE.</strong>
                </p>
                <p>
                  <strong className="text-[#ea1515] font-bold">! ! ! DO NOT CHANGE</strong> <span className="text-neutral-900">the payment</span> <strong className="text-[#ea1515] font-bold">AMOUNT & UPI.</strong>
                </p>
                <p>
                  <strong className="text-[#ea1515] font-bold">! ! ! DO NOT</strong> <span className="text-neutral-900">transfer money in the</span> <strong className="text-[#ea1515] font-bold">UPI</strong> <span className="text-neutral-900">friend</span> <strong className="text-[#ea1515] font-bold">CHAT</strong> <span className="text-neutral-900">window again.</span>
                </p>
                <p>
                  <span className="text-neutral-900">Otherwise, the order</span> <strong className="text-[#ea1515] font-bold">CANNOT be completed.</strong>
                </p>
                <p>
                  <span className="text-neutral-900">After payment is completed, please</span> <strong className="text-[#ea1515] font-bold">fill in the UTR.</strong>
                </p>
              </div>
            </section>
          </main>

          {/* Bottom Sticky Navigation Bar */}
          <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-30">
            <div className="bg-white rounded-t-[30px] shadow-[0_-6px_25px_rgba(0,0,0,0.07)] border-t border-gray-100/80 px-6 pt-5 pb-6">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setPage('renew');
                    window.scrollTo(0, 0);
                  }}
                  className="flex-1 py-3.5 px-4 rounded-full border-2 border-[#2b2eb8] bg-white text-[#2b2eb8] font-serif-clean font-semibold text-[17px] tracking-wide hover:bg-indigo-50/60 active:scale-[0.98] transition-all cursor-pointer text-center"
                  style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
                >
                  Renew
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenGateway(currentCalc.totalRemaining, 'main')}
                  className="flex-1 py-3.5 px-4 rounded-full bg-[#2b2eb8] text-white font-serif-clean font-semibold text-[17px] tracking-wide hover:bg-[#23269e] active:scale-[0.98] transition-all cursor-pointer text-center shadow-md"
                  style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
                >
                  Repay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= PAGE 2: RENEW PAYMENT PAGE ================= */}
      {page === 'renew' && (
        <div id="renewPage" className="flex flex-col flex-1">
          <header className="bg-white px-4 py-3.5 flex items-center justify-between border-b border-gray-100 shadow-xs sticky top-0 z-20">
            <button
              type="button"
              onClick={() => {
                setPage('main');
                window.scrollTo(0, 0);
              }}
              className="p-1 -ml-1 text-gray-800 hover:text-black focus:outline-none cursor-pointer"
              aria-label="Go back"
            >
              <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <h1 className="font-serif-clean font-bold text-lg text-gray-900 tracking-tight text-center flex-1 pr-5" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
              Renew Payment
            </h1>
          </header>

          <main className="flex-1 px-4 pt-4 pb-6 space-y-3.5">
            <div className="flex items-center gap-3 pt-1 px-0.5">
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-b from-[#765bf5] via-[#654af0] to-[#5136e4] p-2.5 shadow-sm flex items-center justify-center shrink-0">
                {ICONS[order.ic] || (
                  <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-white">
                    <path d="M20 78 C35 88, 65 88, 80 78 C65 82, 35 82, 20 78 Z" fill="rgba(255, 255, 255, 0.45)" />
                    <path d="M50 18 C56 38, 58 56, 50 72 C42 56, 44 38, 50 18 Z" fill="currentColor" />
                    <path d="M50 72 C35 62, 30 44, 38 30 C45 44, 48 58, 50 72 Z" fill="rgba(255, 255, 255, 0.92)" />
                  </svg>
                )}
              </div>
              <span className="font-serif-clean font-bold text-xl text-neutral-900 tracking-tight" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
                {adminConfig?.appName || order.n}
              </span>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100/90 pt-5 pb-2 px-5">
              <h2 className="text-center font-serif-clean text-[15.5px] text-gray-700 tracking-wide font-normal" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
                Repayment Amount
              </h2>

              <div className="text-center mt-1 mb-4">
                <span id="renewRepayAmountText" className="font-serif-clean font-bold text-[34px] leading-tight text-[#2b2eb8] tracking-tight" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
                  ₹ {currentCalc.renewAmount.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="space-y-3.5 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-normal text-[13.5px]">Name</span>
                  <span className="text-gray-700 font-medium text-[13.5px] tracking-wider uppercase truncate max-w-[210px] text-right">
                    {customerName}
                  </span>
                </div>

                <div className="border-b border-gray-100/60 my-1" />

                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-normal text-[13.5px]">Loan Amount</span>
                  <span className="text-gray-700 font-medium text-[13.5px]">
                    ₹ {principal.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="border-b border-gray-100/60 my-1" />

                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-normal text-[13.5px]">Late Fee</span>
                  <span id="renewOverdueAmountText" className="text-gray-700 font-medium text-[13.5px]">
                    ₹ {currentCalc.lateFee.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="border-b border-gray-100/60 my-1" />

                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-normal text-[13.5px]">Renewal Day</span>
                  <span className="text-gray-700 font-medium text-[13.5px]">
                    7 Day
                  </span>
                </div>

                <div className="border-b border-gray-100/60 my-1" />

                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-normal text-[13.5px]">Renewal Fee</span>
                  <span id="renewFeeText" className="text-gray-700 font-medium text-[13.5px]">
                    ₹ {currentCalc.renewalFee.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="flex justify-center mt-2 pb-1">
                <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                </svg>
              </div>
            </div>

            <div className="pt-1 px-1">
              <button
                type="button"
                onClick={() => handleOpenGateway(currentCalc.renewAmount, 'renew')}
                className="w-full py-3.5 px-6 rounded-full bg-[#282bb6] hover:bg-[#202399] active:scale-[0.98] text-white font-serif-clean font-semibold text-[17px] tracking-wide transition-all shadow-md text-center cursor-pointer"
                style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
              >
                Repay Now &nbsp;→&nbsp; Gateway
              </button>
            </div>

            <div className="pt-2">
              <section className="font-serif-clean text-[15.5px] leading-[1.45] select-text" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
                <h3 className="font-semibold text-neutral-900 text-[17px] mb-3">Tips:</h3>
                <div className="space-y-3.5">
                  <p>
                    <strong className="text-[#ea1515] font-bold">! ! ! One UPI</strong> <span className="text-neutral-900">can only transfer money</span> <strong className="text-[#ea1515] font-bold">ONCE.</strong>
                  </p>
                  <p>
                    <strong className="text-[#ea1515] font-bold">! ! ! DO NOT CHANGE</strong> <span className="text-neutral-900">the payment</span> <strong className="text-[#ea1515] font-bold">AMOUNT & UPI.</strong>
                  </p>
                  <p>
                    <strong className="text-[#ea1515] font-bold">! ! ! DO NOT</strong> <span className="text-neutral-900">transfer money in the</span> <strong className="text-[#ea1515] font-bold">UPI</strong> <span className="text-neutral-900">friend</span> <strong className="text-[#ea1515] font-bold">CHAT</strong> <span className="text-neutral-900">window again.</span>
                  </p>
                  <p>
                    <span className="text-neutral-900">Otherwise, the order</span> <strong className="text-[#ea1515] font-bold">CANNOT be completed.</strong>
                  </p>
                  <p>
                    <span className="text-neutral-900">After payment is completed, please</span> <strong className="text-[#ea1515] font-bold">fill in the UTR.</strong>
                  </p>
                </div>
              </section>
            </div>
          </main>
        </div>
      )}

      {/* ================= PAGE 3: PAYMENT GATEWAY (Matches Screenshots) ================= */}
      {page === 'gateway' && (
        <div id="gatewayPage" className="flex flex-col flex-1 bg-white">
          <header className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100 sticky top-0 z-20">
            <button
              type="button"
              onClick={handleGatewayBack}
              className="p-1 -ml-1 text-gray-800 hover:text-black focus:outline-none cursor-pointer"
              aria-label="Back"
            >
              <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <h1 className="font-serif-clean font-bold text-lg text-gray-900 tracking-tight text-center flex-1 pr-5" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
              Repay
            </h1>
          </header>

          {/* Purple Timer Bar */}
          <div className="bg-[#531f8f] text-white px-4 py-2 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2 text-[15px] font-mono font-medium">
              <svg className="w-4 h-4 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span id="gatewayTimer">{formatTimer(timerSeconds)}</span>
            </div>
            <button
              type="button"
              onClick={() => setIsHindi(!isHindi)}
              className="px-2.5 py-0.5 rounded-full border border-white/60 hover:bg-white/10 text-xs font-serif text-white cursor-pointer"
            >
              {isHindi ? 'English' : 'हिंदी'}
            </button>
          </div>

          <main className="flex-1 px-4 pt-3 pb-8 space-y-3.5 bg-gray-50/40">
            {/* Big Payable Amount */}
            <div className="text-center pt-2 pb-1">
              <span id="gatewayAmountText" className="font-serif-clean font-bold text-[34px] leading-tight text-[#4a1c8f] tracking-tight" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
                ₹ {Number(gatewayAmount).toFixed(2)}
              </span>
            </div>

            {/* 1. Scan QR Code to Pay */}
            <div className="bg-white rounded-xl border border-gray-200/90 shadow-2xs overflow-hidden">
              <div className="bg-[#f5f1fc] px-4 py-2.5 flex items-center gap-2 border-b border-purple-100/60">
                <svg className="w-4 h-4 text-[#4a1c8f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                  <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                  <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                  <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                </svg>
                <h3 className="font-serif-clean font-bold text-[15px] text-gray-800" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
                  Scan QR Code to Pay
                </h3>
              </div>
              <div className="p-5 flex justify-center bg-white">
                <div className="w-48 h-48 bg-white p-2 border border-gray-100 rounded-lg flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-black fill-current">
                    <rect x="5" y="5" width="28" height="28" fill="none" stroke="black" strokeWidth="5" />
                    <rect x="11" y="11" width="16" height="16" />
                    <rect x="67" y="5" width="28" height="28" fill="none" stroke="black" strokeWidth="5" />
                    <rect x="73" y="11" width="16" height="16" />
                    <rect x="5" y="67" width="28" height="28" fill="none" stroke="black" strokeWidth="5" />
                    <rect x="11" y="73" width="16" height="16" />
                    <rect x="42" y="14" width="6" height="6" />
                    <rect x="52" y="14" width="6" height="12" />
                    <rect x="44" y="48" width="12" height="12" />
                    <rect x="58" y="36" width="8" height="8" />
                    <rect x="68" y="80" width="8" height="8" />
                  </svg>
                </div>
              </div>
            </div>

            {/* 2. Pay via UPI App */}
            <div className="bg-white rounded-xl border border-gray-200/90 shadow-2xs overflow-hidden">
              <div className="bg-[#f5f1fc] px-4 py-2.5 flex items-center gap-2 border-b border-purple-100/60">
                <svg className="w-4 h-4 text-[#4a1c8f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                </svg>
                <h3 className="font-serif-clean font-bold text-[15px] text-gray-800" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
                  Pay via UPI App
                </h3>
              </div>
              <div className="p-3.5 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleCopyUpi}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border border-gray-300 hover:border-sky-500 bg-white cursor-pointer active:scale-98 transition-all"
                >
                  <span className="font-black text-[15px] text-[#002e6e]">pay<span className="text-[#00baf2]">tm</span></span>
                  <span className="font-serif-clean font-bold text-[16px] text-gray-800" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>Paytm</span>
                </button>
                <button
                  type="button"
                  onClick={handleCopyUpi}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border border-gray-300 hover:border-purple-500 bg-white cursor-pointer active:scale-98 transition-all"
                >
                  <div className="w-6 h-6 rounded-full bg-[#5f259f] text-white flex items-center justify-center font-bold text-xs">पे</div>
                  <span className="font-serif-clean font-bold text-[16px] text-gray-800" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>PhonePe</span>
                </button>
              </div>
            </div>

            {/* 3. Manual Transfer */}
            <div className="bg-white rounded-xl border border-gray-200/90 shadow-2xs overflow-hidden">
              <div className="bg-[#f5f1fc] px-4 py-2.5 flex items-center justify-between border-b border-purple-100/60">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#4a1c8f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                  <h3 className="font-serif-clean font-bold text-[15px] text-gray-800" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
                    Manual Transfer
                  </h3>
                </div>
                <span className="bg-[#ef2b2d] text-white font-medium text-[11px] px-2.5 py-0.5 rounded-full">
                  🔥 Recommended
                </span>
              </div>
              <div className="p-4 space-y-2">
                <span className="font-serif-clean font-semibold text-[14px] text-gray-800 block" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
                  UPI ID
                </span>
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white px-3 py-1.5">
                  <span className="font-mono text-[14px] text-gray-800 font-medium flex-1 truncate pr-2">{upiId}</span>
                  <button
                    id="copyUpiBtn"
                    type="button"
                    onClick={handleCopyUpi}
                    className="bg-[#531f8f] hover:bg-[#431777] text-white font-sans font-bold text-[12px] px-3.5 py-1.5 rounded uppercase cursor-pointer transition-colors shrink-0"
                  >
                    {copiedUpi ? 'COPIED' : 'COPY'}
                  </button>
                </div>
                <p className="text-[12px] text-[#e0750c]">Get new UPI every time, do not save.</p>
              </div>
            </div>

            {/* 4. 12-digit UTR Input */}
            <div className="bg-white rounded-xl border border-gray-200/90 shadow-2xs p-4 space-y-3">
              <h3 className="font-serif-clean font-bold text-[15px] text-gray-800" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
                12-digit UTR
              </h3>
              <form onSubmit={handleUtrSubmit} className="space-y-2.5">
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white px-3 py-2.5">
                  <span className="text-red-500 font-bold mr-1">*</span>
                  <span className="font-serif-clean font-semibold text-[13.5px] text-gray-800 mr-3" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
                    UTR
                  </span>
                  <input
                    id="gatewayUtrInput"
                    type="text"
                    inputMode="numeric"
                    maxLength={12}
                    placeholder="Enter 12-digit UTR"
                    value={utrInput}
                    onChange={(e) => setUtrInput(e.target.value.replace(/\D/g, '').slice(0, 12))}
                    className="flex-1 outline-none text-[13px] text-gray-800 placeholder-gray-400 font-sans tracking-wide"
                  />
                </div>
                {utrError && <p className="text-[12px] text-red-600 font-medium">{utrError}</p>}
                <p className="text-[12px] text-[#e0750c]">Complete payment first, then enter UTR here.</p>
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-full bg-[#531f8f] hover:bg-[#431777] active:scale-[0.98] text-white font-serif-clean font-semibold text-[16px] tracking-wide transition-all shadow-md text-center cursor-pointer"
                  style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
                >
                  Submit UTR
                </button>
              </form>
            </div>

            {/* 5. Warning Pink Box */}
            <div className="bg-[#fff3f3] border border-rose-200/80 rounded-xl p-3.5 space-y-1">
              <p className="font-serif-clean italic font-bold text-[14px] text-[#f04860] leading-snug" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
                1.Please make sure you have installed the app.
              </p>
              <p className="font-serif-clean italic font-bold text-[14px] text-[#f04860] leading-snug" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
                2.Don't pay for the same link repeatedly.
              </p>
            </div>

            {/* 6. Notice Box */}
            <div className="bg-white rounded-xl border border-gray-200/80 shadow-2xs p-4 space-y-2">
              <h4 className="font-serif-clean font-bold text-[15px] text-gray-800" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
                Notice:
              </h4>
              <p className="font-serif-clean text-[13.5px] text-gray-600 leading-relaxed" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
                1. Please select the payment method you need and make sure your phone has the corresponding wallet software installed.
              </p>
            </div>
          </main>
        </div>
      )}

      {/* ================= MODAL: Cancel Repayment? ================= */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-xs bg-white rounded-2xl p-6 text-center shadow-xl">
            <div className="w-14 h-14 mx-auto rounded-full bg-amber-50 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <h3 className="font-serif-clean font-bold text-[18px] text-gray-900 mb-2" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
              Cancel Repayment?
            </h3>
            <p className="text-[13px] text-gray-600 mb-5 leading-relaxed">
              Are you sure you want to exit? Your session is active and payment link will expire in {formatTimer(timerSeconds)}.
            </p>
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => setShowCancelModal(false)}
                className="w-full py-3 px-4 rounded-full bg-[#531f8f] hover:bg-[#431777] text-white font-semibold text-[14.5px] cursor-pointer shadow-sm transition-all"
              >
                Continue Payment
              </button>
              <button
                type="button"
                onClick={handleConfirmExitGateway}
                className="w-full py-2.5 px-4 rounded-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium text-[14px] cursor-pointer transition-all"
              >
                Exit &amp; Go Back
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: UTR Submitted Successfully ================= */}
      {showUtrSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-xs bg-white rounded-2xl p-6 text-center shadow-xl">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="font-serif-clean font-bold text-[19px] text-gray-900 mb-1.5" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
              UTR Submitted Successfully
            </h3>
            <p className="text-[12.5px] text-gray-500 mb-1">
              Transaction Reference: <strong className="font-mono text-gray-800">{submittedUtr}</strong>
            </p>
            <p className="text-[13.5px] text-gray-700 mb-4 leading-snug">
              Your payment of <strong className="text-gray-900">₹{Number(gatewayAmount).toFixed(2)}</strong> is being verified with the bank.
            </p>
            {adminConfig && (
              <div className="mb-4 py-2 px-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center gap-2 text-xs font-semibold text-gray-700">
                {adminConfig.utrIcon === 'failed' && <span>❌</span>}
                {adminConfig.utrIcon === 'review' && <span>⚠️</span>}
                {adminConfig.utrIcon === 'success' && <span>✅</span>}
                <span>Status: {adminConfig.utrStatus}</span>
              </div>
            )}
            <button
              type="button"
              onClick={handleConfirmSuccessModal}
              className="w-full py-3 px-4 rounded-full bg-[#3b1263] hover:bg-[#2c0d4a] text-white font-semibold text-[15px] cursor-pointer shadow-md transition-all"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
