import React from 'react';

interface LoginPendingScreenProps {
  customerName: string;
  onCheckStatus: () => void;
  onOpenAdmin: () => void;
}

export const LoginPendingScreen: React.FC<LoginPendingScreenProps> = ({
  customerName,
  onCheckStatus,
  onOpenAdmin,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7ee55] via-[#e3f27a] to-[#d6ec84] flex flex-col items-center justify-center p-6 font-sans select-none text-center">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white space-y-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shadow-inner">
          <svg className="w-10 h-10 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              className="opacity-25"
            />
            <path
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              className="opacity-75"
            />
          </svg>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900 font-serif">
            Verification Under Review
          </h2>
          <p className="text-sm text-gray-600">
            Dear <span className="font-semibold text-gray-900">{customerName || 'Customer'}</span>, your Bank Info, Basic Info, and KYC documents have been successfully submitted.
          </p>
        </div>

        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-800 space-y-1 text-left">
          <p className="font-bold">Admin Verification Status:</p>
          <p>Please wait while the admin verifies your credentials. Once approved, you will be automatically logged in to access your instant credit and loan limit.</p>
        </div>

        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={onCheckStatus}
            className="w-full py-3.5 rounded-2xl bg-[#3b49df] hover:bg-[#2f3bc0] text-white font-bold text-sm shadow-md transition-all active:scale-[0.98] cursor-pointer"
          >
            Check Approval Status
          </button>

          <button
            type="button"
            onClick={onOpenAdmin}
            className="w-full py-3 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs shadow cursor-pointer transition-all"
          >
            🔑 Open Admin Dashboard (Approve User)
          </button>
        </div>
      </div>
    </div>
  );
};
