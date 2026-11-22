import React, { useState } from 'react';
import { LoanOrder } from '../utils/loan';

export interface AdminConfig {
  appName: string;
  appLogo: string;
  customerName: string;
  bankAddress: string;
  remainingAmount: number;
  loanAmount: number;
  receivedAmount: number;
  paidAmount: number;
  dueDate: string;
  receivedDate: string;
  overdueDays: number;
  lateFee: number;
  upiId: string;
  utrIcon: 'review' | 'failed' | 'success';
  utrStatus: string;
  linkTimeMinutes: number;
  activeGateway?: 'gateway1' | 'gateway2';
  gateway2Name?: string;
  gateway2UpiId?: string;
  gateway2Url?: string;
  verificationStatus?: 'pending' | 'approved';
  autoCalculator: boolean;
  fieldVisibility: {
    customerName: boolean;
    bankAddress: boolean;
    loanAmount: boolean;
    receivedAmount: boolean;
    amountPaid: boolean;
    dates: boolean;
    overdueDays: boolean;
    lateFee: boolean;
    remainingAmount: boolean;
    upiId: boolean;
  };
  userSubmission?: {
    ifsc: string;
    account: string;
    gender: string;
    education: string;
    monthlySalary: string;
    submittedAt: string;
  };
}

interface AdminPanelProps {
  currentConfig: AdminConfig;
  orders: LoanOrder[];
  onUpdateConfig: (newConfig: AdminConfig) => void;
  onUpdateOrders: (newOrders: LoanOrder[]) => void;
  onApplyAndOpenCustomer: (newConfig: AdminConfig) => void;
  onCloseAdmin: () => void;
  onApproveUser: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  currentConfig,
  orders,
  onUpdateConfig,
  onUpdateOrders,
  onApplyAndOpenCustomer,
  onCloseAdmin,
  onApproveUser,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [adminId, setAdminId] = useState('faysal');
  const [adminPassword, setAdminPassword] = useState('••••••••');
  const [loginError, setLoginError] = useState('');

  // Form states matching screenshots exactly
  const [appName, setAppName] = useState(currentConfig.appName || 'Zen Money');
  const [selectedLogo, setSelectedLogo] = useState(currentConfig.appLogo || 'Zen Money');
  const [autoCalc, setAutoCalc] = useState<boolean>(currentConfig.autoCalculator ?? true);

  const [customerName, setCustomerName] = useState(currentConfig.customerName || 'BHAVIK KAMLESH SANGHVI');
  const [bankAddress, setBankAddress] = useState(currentConfig.bankAddress || 'HDFC BANK, ANDHERI (W), MUMBAI - 746388853(ifsc:UHDK84738)');
  const [loanAmount, setLoanAmount] = useState<number>(currentConfig.loanAmount || 11000);
  const [receivedAmount, setReceivedAmount] = useState<number>(currentConfig.receivedAmount || 6600);
  const [amountPaid, setAmountPaid] = useState<number>(currentConfig.paidAmount || 0);
  const [receivedDate, setReceivedDate] = useState(currentConfig.receivedDate || '02-Nov-2026');
  const [dueDate, setDueDate] = useState(currentConfig.dueDate || '08-Nov-2026');
  const [overdueDays, setOverdueDays] = useState<number>(currentConfig.overdueDays || 2);
  const [lateFee, setLateFee] = useState<number>(currentConfig.lateFee || 1540);
  const [remainingAmount, setRemainingAmount] = useState<number>(currentConfig.remainingAmount || 12540);
  const [upi, setUpi] = useState(currentConfig.upiId || 'Q609224859@yb1');

  // Field visibility states (Show / Hide)
  const [visibility, setVisibility] = useState(
    currentConfig.fieldVisibility || {
      customerName: true,
      bankAddress: true,
      loanAmount: true,
      receivedAmount: true,
      amountPaid: true,
      dates: true,
      overdueDays: true,
      lateFee: true,
      remainingAmount: true,
      upiId: true,
    }
  );

  // All Customers state list
  const [customerList, setCustomerList] = useState([
    {
      id: 'cust_01',
      app: 'Zen Money',
      name: 'MANUAL OVERRIDE CUSTOMER',
      amount: '20,500',
      status: 'Pending' as const,
      utr: 'Awaiting customer payment & UTR',
    },
    {
      id: 'cust_02',
      app: 'Zen Money',
      name: 'BHAVIK KAMLESH SANGHVI',
      amount: '11,000',
      status: 'Pending' as const,
      utr: 'Awaiting customer payment & UTR',
    },
    {
      id: 'cust_03',
      app: 'Zen Money',
      name: 'BHAVIK KAMLESH SANGHVI',
      amount: '34,950',
      status: 'Pending' as const,
      utr: 'Awaiting customer payment & UTR',
    },
    {
      id: 'cust_04',
      app: 'Zen Money',
      name: 'BHAVIK KAMLESH SANGHVI',
      amount: '12,540',
      status: 'Checking / In Review' as const,
      utr: '889308889660',
    },
  ]);

  const toggleVisibility = (field: keyof typeof visibility) => {
    setVisibility((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminId.trim() || !adminPassword.trim()) {
      setLoginError('Admin ID এবং Password প্রদান করুন');
      return;
    }
    setLoginError('');
    setIsLoggedIn(true);
  };

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    const calculatedRemaining = loanAmount + lateFee - amountPaid;
    setRemainingAmount(calculatedRemaining);

    const updatedConfig: AdminConfig = {
      ...currentConfig,
      appName,
      appLogo: selectedLogo,
      customerName,
      bankAddress,
      loanAmount,
      receivedAmount,
      paidAmount: amountPaid,
      receivedDate,
      dueDate,
      overdueDays,
      lateFee,
      remainingAmount: calculatedRemaining,
      upiId: upi,
      autoCalculator: autoCalc,
      fieldVisibility: visibility,
    };

    onUpdateConfig(updatedConfig);
    alert('Customer & Link generated successfully with exact dashboard config!');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#f4f6f9] flex flex-col items-center justify-center p-4 font-sans select-none">
        <div className="w-full max-w-[400px] bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-100/70 flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-1">Admin Login</h2>
          <p className="text-sm text-gray-500 mb-6">Enter Admin Credentials</p>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Admin ID</label>
              <input
                type="text"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-indigo-200 bg-indigo-50/20 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-indigo-200 bg-indigo-50/20 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            {loginError && <p className="text-xs text-red-500">{loginError}</p>}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-[#3b49df] hover:bg-[#2f3bc0] text-white font-semibold text-sm cursor-pointer shadow-md"
            >
              Login
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between text-xs text-gray-400">
            <span>Admin Portal</span>
            <button
              type="button"
              onClick={onCloseAdmin}
              className="text-indigo-600 hover:underline cursor-pointer"
            >
              Return to App
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f4f8] py-6 px-3 flex justify-center font-sans text-gray-800">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-lg border border-gray-100 p-6 space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div>
            <h1 className="text-xl font-extrabold text-gray-900">Create Customer</h1>
            <p className="text-xs text-gray-400">Exact Admin Dashboard Control Panel</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onCloseAdmin}
              className="text-xs bg-indigo-50 text-indigo-700 font-semibold px-3 py-1.5 rounded-lg hover:bg-indigo-100 cursor-pointer"
            >
              Customer App View 📱
            </button>
            <button
              type="button"
              onClick={() => setIsLoggedIn(false)}
              className="text-xs bg-red-50 text-red-600 font-semibold px-3 py-1.5 rounded-lg hover:bg-red-100 cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>

        <form onSubmit={handleCreateCustomer} className="space-y-5 text-sm">
          {/* Customer Information Card */}
          <div className="space-y-4">
            <h2 className="font-extrabold text-gray-900 text-base">Customer Information</h2>

            {/* App Name & Logo Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="font-semibold text-gray-700">App Name &amp; Logo</span>
                <span>3 available</span>
              </div>
              <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  <span className="font-bold text-gray-900">{selectedLogo}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-bold text-[10px]">
                    ☁️ Active
                  </span>
                  <select
                    value={selectedLogo}
                    onChange={(e) => {
                      setSelectedLogo(e.target.value);
                      setAppName(e.target.value);
                    }}
                    className="bg-white border border-gray-300 rounded px-2 py-1 text-xs outline-none"
                  >
                    <option value="Zen Money">Zen Money</option>
                    <option value="Karta Loan">Karta Loan</option>
                    <option value="Zen Rupee">Zen Rupee</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => alert('+ Add Name with logo clicked')}
                  className="py-2 px-3 rounded-xl bg-indigo-50/80 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs border border-indigo-100 cursor-pointer text-center"
                >
                  + Add Name with logo
                </button>
                <button
                  type="button"
                  onClick={() => alert('Edit Name / Logo clicked')}
                  className="py-2 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs border border-gray-200 cursor-pointer text-center"
                >
                  ✏️ Edit Name / Logo
                </button>
                <button
                  type="button"
                  onClick={() => alert('Remove Logo clicked')}
                  className="py-2 px-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-xs border border-red-100 cursor-pointer text-center"
                >
                  🗑️ Remove Logo
                </button>
              </div>

              {/* Active App Preview Box */}
              <div className="p-3 rounded-2xl bg-white border border-gray-200 shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-sm font-bold shadow">
                    ☁️
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-bold text-xs text-gray-900">ACTIVE APP PREVIEW</span>
                    </div>
                    <div className="text-xs text-gray-700 font-semibold">{selectedLogo}</div>
                    <div className="text-[10px] text-gray-400 font-mono">/assets/{selectedLogo.toLowerCase().replace(/\s+/g, '-')}.svg</div>
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full font-bold">
                  ✓ Ready to Use
                </span>
              </div>
            </div>

            {/* Auto Calculator Banner */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-amber-500 text-base">⚡</span>
                  <span className="font-bold text-emerald-900 text-xs">Auto Calculator</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white font-bold text-[9px]">
                    ACTIVE ({autoCalc ? 'ON' : 'OFF'})
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setAutoCalc(true)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                      autoCalc ? 'bg-emerald-600 text-white shadow' : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    ON
                  </button>
                  <button
                    type="button"
                    onClick={() => setAutoCalc(false)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                      !autoCalc ? 'bg-red-600 text-white shadow' : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    OFF
                  </button>
                </div>
              </div>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                Auto-syncs 7-Day Term ({receivedDate} -- {dueDate}), 60% Received Amount, Overdue Days, 7% Daily Late Fee &amp; Remaining Amount.
              </p>
            </div>

            {/* Field 1: Customer Name */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-gray-700">Customer Name</label>
                <button
                  type="button"
                  onClick={() => toggleVisibility('customerName')}
                  className={`px-2.5 py-0.5 rounded text-[11px] font-bold cursor-pointer transition-all ${
                    visibility.customerName ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {visibility.customerName ? 'SHOW' : 'HIDE'}
                </button>
              </div>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm uppercase text-gray-900 font-semibold outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Field 2: Bank Address */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-gray-700">Bank Address</label>
                <button
                  type="button"
                  onClick={() => toggleVisibility('bankAddress')}
                  className={`px-2.5 py-0.5 rounded text-[11px] font-bold cursor-pointer transition-all ${
                    visibility.bankAddress ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {visibility.bankAddress ? 'SHOW' : 'HIDE'}
                </button>
              </div>
              <input
                type="text"
                value={bankAddress}
                onChange={(e) => setBankAddress(e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs uppercase text-gray-900 font-mono outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Field 3: Loan Amount */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-gray-700">Loan Amount</label>
                <button
                  type="button"
                  onClick={() => toggleVisibility('loanAmount')}
                  className={`px-2.5 py-0.5 rounded text-[11px] font-bold cursor-pointer transition-all ${
                    visibility.loanAmount ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {visibility.loanAmount ? 'SHOW' : 'HIDE'}
                </button>
              </div>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setLoanAmount(val);
                  if (autoCalc) setReceivedAmount(val * 0.6);
                }}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 font-mono font-bold outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Field 4: Received Amount */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <label className="font-semibold text-gray-700">Received amount</label>
                  <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
                    ⚡ 60% = ₹{loanAmount * 0.6}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => toggleVisibility('receivedAmount')}
                  className={`px-2.5 py-0.5 rounded text-[11px] font-bold cursor-pointer transition-all ${
                    visibility.receivedAmount ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {visibility.receivedAmount ? 'SHOW' : 'HIDE'}
                </button>
              </div>
              <input
                type="number"
                value={receivedAmount}
                onChange={(e) => setReceivedAmount(Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 font-mono font-bold outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500"
              />
              <p className="text-[10px] text-gray-400">40% interest deducted, Received Amount is 60% of Loan Amount.</p>
            </div>

            {/* Field 5: Amount Paid */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <label className="font-semibold text-gray-700">Amount Paid</label>
                  <span className="text-[10px] bg-gray-100 text-gray-600 font-bold px-1.5 py-0.5 rounded">Partial Payment</span>
                </div>
                <button
                  type="button"
                  onClick={() => toggleVisibility('amountPaid')}
                  className={`px-2.5 py-0.5 rounded text-[11px] font-bold cursor-pointer transition-all ${
                    visibility.amountPaid ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {visibility.amountPaid ? 'SHOW' : 'HIDE'}
                </button>
              </div>
              <input
                type="number"
                value={amountPaid}
                onChange={(e) => setAmountPaid(Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 font-mono outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500"
              />
              <p className="text-[10px] text-gray-400">If any customer paid partially, enter the paid amount here.</p>
            </div>

            {/* Field 6: Dates */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <label className="font-semibold text-gray-700">Dates</label>
                  <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-1.5 py-0.5 rounded">7-Day Term ({receivedDate} -- {dueDate})</span>
                </div>
                <button
                  type="button"
                  onClick={() => toggleVisibility('dates')}
                  className={`px-2.5 py-0.5 rounded text-[11px] font-bold cursor-pointer transition-all ${
                    visibility.dates ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {visibility.dates ? 'SHOW' : 'HIDE'}
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-gray-500 mb-0.5">Received Date (Start)</label>
                  <input
                    type="text"
                    value={receivedDate}
                    onChange={(e) => setReceivedDate(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 font-mono outline-none focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-500 mb-0.5">Due Date (7-Day Term)</label>
                  <input
                    type="text"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 font-mono outline-none focus:bg-white"
                  />
                </div>
              </div>
              <p className="text-[10px] text-gray-400">7-Day Loan Term: {receivedDate} to {dueDate}. When Auto Calculator is ON, entering either date auto-syncs the other.</p>
            </div>

            {/* Field 7 & 8: Over Due Days & Late Fee */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-semibold text-gray-700">Over Due (Days)</label>
                  <button
                    type="button"
                    onClick={() => toggleVisibility('overdueDays')}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                      visibility.overdueDays ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {visibility.overdueDays ? 'SHOW' : 'HIDE'}
                  </button>
                </div>
                <input
                  type="number"
                  value={overdueDays}
                  onChange={(e) => {
                    const days = Number(e.target.value);
                    setOverdueDays(days);
                    if (autoCalc) setLateFee(days * 0.07 * loanAmount);
                  }}
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-red-600 font-mono font-bold outline-none focus:bg-white"
                />
                <p className="text-[9px] text-gray-400">Counts delay days after Due Date</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1">
                    <label className="font-semibold text-gray-700">Late Fee (₹)</label>
                    <span className="text-[9px] bg-red-50 text-red-600 font-bold px-1 rounded">2d × 7% = ₹1,540</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleVisibility('lateFee')}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                      visibility.lateFee ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {visibility.lateFee ? 'SHOW' : 'HIDE'}
                  </button>
                </div>
                <input
                  type="number"
                  value={lateFee}
                  onChange={(e) => setLateFee(Number(e.target.value))}
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 font-mono font-bold outline-none focus:bg-white"
                />
                <p className="text-[9px] text-gray-400">7% per day on unpaid loan balance</p>
              </div>
            </div>

            {/* Field 9: Remaining Amount */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <label className="font-bold text-amber-900 text-sm">Remaining Amount</label>
                  <span className="px-2 py-0.5 bg-amber-200 text-amber-900 font-bold text-[10px] rounded">Auto Calculated</span>
                </div>
                <button
                  type="button"
                  onClick={() => toggleVisibility('remainingAmount')}
                  className={`px-2.5 py-0.5 rounded text-[11px] font-bold cursor-pointer ${
                    visibility.remainingAmount ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {visibility.remainingAmount ? 'SHOW' : 'HIDE'}
                </button>
              </div>
              <input
                type="number"
                value={loanAmount + lateFee - amountPaid}
                readOnly
                className="w-full px-3.5 py-3 bg-white border border-amber-300 rounded-xl text-lg text-amber-900 font-mono font-extrabold outline-none"
              />
              <div className="flex items-center justify-between text-[11px] text-gray-600 pt-1">
                <span>Formula: (Loan + Late Fee) - Paid</span>
                <span className="font-bold text-amber-900">({loanAmount} + {lateFee}) - {amountPaid} = ₹{loanAmount + lateFee - amountPaid}</span>
              </div>
              <div className="text-xs font-semibold text-indigo-700 flex items-center justify-between pt-1 border-t border-amber-200/60">
                <span>🔄 Renew Amount (40% of Remaining):</span>
                <span className="font-mono font-bold">₹{Math.round((loanAmount + lateFee - amountPaid) * 0.4)}</span>
              </div>
            </div>

            {/* Field 10: Payment UPI ID */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <label className="font-semibold text-gray-700">Payment UPI ID (Generating QR &amp; Copy Option)</label>
                </div>
                <button
                  type="button"
                  onClick={() => toggleVisibility('upiId')}
                  className={`px-2.5 py-0.5 rounded text-[11px] font-bold cursor-pointer transition-all ${
                    visibility.upiId ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {visibility.upiId ? 'SHOW' : 'HIDE'}
                </button>
              </div>
              <input
                type="text"
                value={upi}
                onChange={(e) => setUpi(e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 font-mono font-bold outline-none focus:bg-white"
              />
              <p className="text-[10px] text-gray-400">কাস্টমার পেজে এই UPI ঠিকানার QR কোড ডায়নামিক্যালি তৈরি হবে।</p>
            </div>
          </div>

          {/* Create Customer & Generate Link Primary Button */}
          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#3b49df] to-indigo-600 hover:from-[#2f3bc0] hover:to-indigo-700 text-white font-extrabold text-sm shadow-lg active:scale-[0.98] transition-all cursor-pointer text-center"
          >
            Create Customer &amp; Generate Link
          </button>
        </form>

        {/* All Customers Management Table matching second screenshot */}
        <div className="space-y-3 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-gray-900 text-base">All Customers</h3>
              <p className="text-xs text-gray-400">Manage customer links, review UTR submissions &amp; select payment verification results</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                Live Auto-Sync
              </span>
              <button
                type="button"
                onClick={() => alert('Refreshed!')}
                className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-700 cursor-pointer"
              >
                Refresh
              </button>
            </div>
          </div>

          {/* Table container */}
          <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden text-xs">
            <div className="grid grid-cols-12 bg-gray-100 p-2.5 font-bold text-gray-600 text-[10px] uppercase tracking-wider border-b border-gray-200">
              <div className="col-span-2">App</div>
              <div className="col-span-3">Customer</div>
              <div className="col-span-2">Amount</div>
              <div className="col-span-3">UTR &amp; Result Control</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>

            <div className="divide-y divide-gray-200 bg-white">
              {customerList.map((cust, idx) => (
                <div key={cust.id} className="grid grid-cols-12 p-3 items-center gap-1">
                  <div className="col-span-2 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">☁️</span>
                    <span className="font-semibold text-gray-900 truncate">{cust.app}</span>
                  </div>

                  <div className="col-span-3">
                    <div className="font-bold text-gray-900 truncate">{cust.name}</div>
                    <div className="text-[10px] text-gray-400">Loan: ₹{customerName === cust.name ? loanAmount : '11,000'}</div>
                  </div>

                  <div className="col-span-2 font-mono font-bold text-gray-800">
                    ₹{customerName === cust.name ? loanAmount + lateFee - amountPaid : cust.amount}
                  </div>

                  <div className="col-span-3 space-y-1">
                    <div className="text-[10px] font-mono bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 truncate">
                      {cust.utr}
                    </div>
                    <select
                      value={cust.status}
                      onChange={(e) => {
                        const newStatus = e.target.value as any;
                        setCustomerList((prev) =>
                          prev.map((c) => (c.id === cust.id ? { ...c, status: newStatus } : c))
                        );
                      }}
                      className="w-full px-2 py-1 bg-white border border-gray-300 rounded text-[11px] font-semibold text-gray-800 outline-none"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Checking / In Review">Checking / In Review</option>
                      <option value="Success">Success</option>
                      <option value="Failed">Failed</option>
                      <option value="UTR Mismatch">UTR Mismatch</option>
                      <option value="Bank Mismatch">Bank Mismatch</option>
                    </select>
                  </div>

                  <div className="col-span-2 flex items-center justify-end gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard?.writeText(window.location.origin + `/?customer=${cust.id}`);
                        alert(`Link copied for ${cust.name}!`);
                      }}
                      className="px-2 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded text-[10px] cursor-pointer"
                    >
                      Copy Link
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onApplyAndOpenCustomer({
                          ...currentConfig,
                          customerName: cust.name,
                        });
                      }}
                      className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded text-[10px] cursor-pointer"
                    >
                      View
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Remove customer ${cust.name}?`)) {
                          setCustomerList((prev) => prev.filter((c) => c.id !== cust.id));
                        }
                      }}
                      className="px-1.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded text-[10px] cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
