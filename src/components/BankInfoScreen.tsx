import React, { useState } from 'react';

interface BankInfoScreenProps {
  onBack: () => void;
  initialData: {
    ifsc: string;
    account: string;
    confirmAccount: string;
    bankName: string;
    state: string;
    district: string;
    branch: string;
  };
  onSave: (data: {
    ifsc: string;
    account: string;
    confirmAccount: string;
    bankName: string;
    state: string;
    district: string;
    branch: string;
  }) => void;
}

export const BankInfoScreen: React.FC<BankInfoScreenProps> = ({
  onBack,
  initialData,
  onSave,
}) => {
  const [ifsc, setIfsc] = useState(initialData.ifsc || 'PUNB0023510');
  const [account, setAccount] = useState(initialData.account || '02352191006858');
  const [confirmAccount, setConfirmAccount] = useState(
    initialData.confirmAccount || '0235 2191 0068 58'
  );

  // Forget IFSC Modal state
  const [showForgetIfsc, setShowForgetIfsc] = useState(false);
  const [bankName, setBankName] = useState(initialData.bankName || 'Punjab National Bank');
  const [state, setState] = useState(initialData.state || 'Maharashtra');
  const [district, setDistrict] = useState(initialData.district || 'Mumbai');
  const [branch, setBranch] = useState(initialData.branch || 'Andheri West');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ifsc,
      account,
      confirmAccount,
      bankName,
      state,
      district,
      branch,
    });
  };

  return (
    <div className="min-h-screen bg-[#f1f7d2] pb-12 font-sans select-none text-gray-900 relative">
      {/* Top Navigation */}
      <div className="flex items-center justify-between px-4 pt-5 pb-3">
        <button
          type="button"
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-white/80 flex items-center justify-center shadow-sm cursor-pointer hover:bg-white transition-all"
        >
          <svg className="w-5 h-5 text-gray-800" viewBox="0 0 10 18" fill="none">
            <path
              d="M8.5 1.5L2 9l6.5 7.5"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className="text-lg font-bold text-gray-900 font-serif">Bank Info</h1>
        <div className="w-9 h-9" />
      </div>

      {/* Loan Amount Slider / Badge Header */}
      <div className="mx-4 mb-4 bg-gradient-to-r from-amber-100/80 to-yellow-50/80 p-3.5 rounded-2xl border border-amber-200/60 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-amber-400 flex items-center justify-center text-white font-bold text-xs shadow">
            ₹
          </div>
          <span className="text-xs font-semibold text-gray-700">Credit Limit</span>
        </div>
        <div className="text-sm font-bold text-amber-800 font-mono">₹50,000 — ₹150,000</div>
      </div>

      {/* Form Card matching screenshot */}
      <form onSubmit={handleSubmit} className="mx-4 bg-white/90 backdrop-blur rounded-3xl p-5 shadow-lg border border-white space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            IFSC Code
          </label>
          <input
            type="text"
            value={ifsc}
            onChange={(e) => setIfsc(e.target.value.toUpperCase())}
            placeholder="PUNB0023510"
            required
            className="w-full px-3.5 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Bank Account
          </label>
          <input
            type="password"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            placeholder="••••••••••••••••"
            required
            className="w-full px-3.5 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Confirm Bank Account
          </label>
          <input
            type="text"
            value={confirmAccount}
            onChange={(e) => setConfirmAccount(e.target.value)}
            placeholder="0235 2191 0068 58"
            required
            className="w-full px-3.5 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="text-right">
          <button
            type="button"
            onClick={() => setShowForgetIfsc(true)}
            className="text-xs font-semibold text-amber-600 hover:text-amber-700 cursor-pointer inline-flex items-center gap-1"
          >
            <span>Forget IFSC</span>
            <span className="text-[10px]">›</span>
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm shadow-md active:scale-[0.98] transition-all cursor-pointer mt-2"
        >
          Submit
        </button>
      </form>

      {/* Tips footer */}
      <div className="mx-6 mt-6 text-xs text-gray-600 space-y-1">
        <p className="font-bold text-gray-800">Tips:</p>
        <p className="leading-relaxed">
          Please make sure your bank information is correct. It will be used for credit limit verification and related account validation after approval.
        </p>
      </div>

      {/* Forget IFSC Modal matching screenshot 5 */}
      {showForgetIfsc && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl space-y-4 animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900 font-serif">Forget IFSC</h3>
              <button
                type="button"
                onClick={() => setShowForgetIfsc(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Bank name
                </label>
                <select
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="Punjab National Bank">Punjab National Bank</option>
                  <option value="HDFC Bank">HDFC Bank</option>
                  <option value="State Bank of India">State Bank of India</option>
                  <option value="ICICI Bank">ICICI Bank</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  State
                </label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Gujarat">Gujarat</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  District
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="Mumbai">Mumbai</option>
                  <option value="Pune">Pune</option>
                  <option value="Nagpur">Nagpur</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Branch
                </label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="Andheri West">Andheri West</option>
                  <option value="Bandra East">Bandra East</option>
                  <option value="Borivali West">Borivali West</option>
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setIfsc('PUNB0023510');
                setShowForgetIfsc(false);
              }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm shadow-md active:scale-[0.98] transition-all cursor-pointer"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
