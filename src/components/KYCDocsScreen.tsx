import React, { useState } from 'react';

interface KYCDocsScreenProps {
  onBack: () => void;
  initialData: {
    facePhoto: string;
    panPhoto: string;
  };
  onSave: (data: { facePhoto: string; panPhoto: string }) => void;
}

export const KYCDocsScreen: React.FC<KYCDocsScreenProps> = ({
  onBack,
  initialData,
  onSave,
}) => {
  const [facePhoto, setFacePhoto] = useState(
    initialData.facePhoto || '/public/assets/aistudio/image_2ff997ae.png'
  );
  const [panPhoto, setPanPhoto] = useState(
    initialData.panPhoto || '/public/assets/aistudio/image_2ace9886.png'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      facePhoto,
      panPhoto,
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
        <h1 className="text-lg font-bold text-gray-900 font-serif">KYC Documents</h1>
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

      <form onSubmit={handleSubmit} className="mx-4 space-y-4">
        {/* Upload Your Face Photo */}
        <div className="bg-white/90 backdrop-blur rounded-3xl p-5 shadow-lg border border-white space-y-4 text-center">
          <div className="text-left">
            <h3 className="font-bold text-gray-900 text-sm font-serif">Upload Your Face Photo</h3>
            <p className="text-xs text-gray-500 mt-0.5">Please upload a clear front-facing photo.</p>
          </div>

          <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-amber-300 shadow-md bg-amber-50">
            <div className="w-full h-full flex items-center justify-center text-3xl">👤</div>
            <div className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold shadow text-xs">
              ✓
            </div>
          </div>

          {/* Rules / Guidelines */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            <div className="bg-amber-50/70 p-2 rounded-xl border border-amber-100 text-center">
              <div className="text-sm">👤</div>
              <span className="text-[11px] font-semibold text-gray-700 block mt-1">No Glare</span>
              <span className="text-[10px] text-red-500 font-bold">✕</span>
            </div>
            <div className="bg-amber-50/70 p-2 rounded-xl border border-amber-100 text-center">
              <div className="text-sm">🧢</div>
              <span className="text-[11px] font-semibold text-gray-700 block mt-1">No Hats</span>
              <span className="text-[10px] text-red-500 font-bold">✕</span>
            </div>
            <div className="bg-amber-50/70 p-2 rounded-xl border border-amber-100 text-center">
              <div className="text-sm">😷</div>
              <span className="text-[11px] font-semibold text-gray-700 block mt-1">No Masks</span>
              <span className="text-[10px] text-red-500 font-bold">✕</span>
            </div>
          </div>
        </div>

        {/* Upload Your PAN Card */}
        <div className="bg-white/90 backdrop-blur rounded-3xl p-5 shadow-lg border border-white space-y-4 text-center">
          <div className="text-left">
            <h3 className="font-bold text-gray-900 text-sm font-serif">Upload Your PAN Card</h3>
            <p className="text-xs text-gray-500 mt-0.5">Please upload the front side of your PAN</p>
          </div>

          <div className="relative w-full h-40 rounded-2xl overflow-hidden border-2 border-dashed border-amber-300 bg-amber-50/50 flex items-center justify-center shadow-inner">
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-100/40 to-yellow-50/40 flex flex-col items-center justify-center p-4">
              <div className="text-2xl mb-1">🪪</div>
              <span className="text-xs font-bold text-gray-700">PAN Card Front Uploaded</span>
            </div>
            <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold shadow text-xs">
              ✓
            </div>
          </div>

          {/* Rules / Guidelines */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            <div className="bg-amber-50/70 p-2 rounded-xl border border-amber-100 text-center">
              <span className="text-[11px] font-semibold text-gray-700 block">No Skewing</span>
            </div>
            <div className="bg-amber-50/70 p-2 rounded-xl border border-amber-100 text-center">
              <span className="text-[11px] font-semibold text-gray-700 block">No Blur</span>
            </div>
            <div className="bg-amber-50/70 p-2 rounded-xl border border-amber-100 text-center">
              <span className="text-[11px] font-semibold text-gray-700 block">No Glare</span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm shadow-md active:scale-[0.98] transition-all cursor-pointer"
        >
          Submit All KYC &amp; Verify
        </button>
      </form>
    </div>
  );
};
