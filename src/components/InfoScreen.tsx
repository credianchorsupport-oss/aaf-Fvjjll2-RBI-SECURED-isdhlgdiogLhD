import React from 'react';

interface InfoScreenProps {
  onBack: () => void;
  onCardClick: (cardType: 'bank' | 'basic' | 'kyc') => void;
}

export const InfoScreen: React.FC<InfoScreenProps> = ({ onBack, onCardClick }) => {
  return (
    <div id="s5">
      <div className="phead">
        <button className="back" onClick={onBack} aria-label="Back to My page">
          <svg viewBox="0 0 10 18">
            <path d="M8.5 1.5L2 9l6.5 7.5" stroke="#111" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1>My Information</h1>
      </div>

      <div className="intro">
        <p>
          We commit to using your
          <br />
          information solely for the purpose of
          <br />
          determining your credit limit.
        </p>
      </div>

      <svg className="ill" viewBox="0 0 300 310" aria-hidden="true">
        <defs>
          <linearGradient id="sh" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#4fbf5a" />
            <stop offset="1" stopColor="#2a8d3b" />
          </linearGradient>
          <linearGradient id="lk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffd23d" />
            <stop offset="1" stopColor="#f3ad1b" />
          </linearGradient>
        </defs>
        <g transform="rotate(5 195 85)">
          <rect x="125" y="14" width="150" height="150" rx="12" fill="#f4efdc" stroke="#e3dcc2" />
          <rect x="175" y="2" width="50" height="24" rx="9" fill="#f7c948" />
          <rect x="146" y="50" width="26" height="26" rx="6" fill="#4caf50" />
          <rect x="146" y="92" width="26" height="26" rx="6" fill="#4caf50" />
          <path d="M152 63l6 6 9-12M152 105l6 6 9-12" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M186 58h70M186 70h50M186 100h70M186 112h50" stroke="#9fd08a" strokeWidth="7" strokeLinecap="round" />
        </g>
        <path d="M44 74V52Q44 20 74 20Q104 20 104 52V74" stroke="#b9b2a0" strokeWidth="12" fill="none" />
        <rect x="28" y="64" width="92" height="86" rx="14" fill="url(#lk)" />
        <circle cx="74" cy="100" r="10" fill="#3b2a0c" />
        <rect x="70" y="102" width="8" height="24" rx="3" fill="#3b2a0c" />
        <rect x="0" y="140" width="190" height="112" rx="12" fill="#f4efd8" stroke="#e3dcc2" />
        <circle cx="38" cy="178" r="15" fill="#4caf50" />
        <path d="M12 224Q12 198 38 198Q64 198 64 224Z" fill="#4caf50" />
        <path d="M84 168h74M84 184h52" stroke="#f1c64a" strokeWidth="7" strokeLinecap="round" />
        <path d="M84 202h74M84 218h60" stroke="#a9d68e" strokeWidth="7" strokeLinecap="round" />
        <path d="M215 126L286 150V212C286 262 255 292 215 308C175 292 144 262 144 212V150Z" fill="url(#sh)" stroke="#e8f4dc" strokeWidth="6" />
        <path d="M180 214L208 242L252 186" stroke="#fff" strokeWidth="16" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <div className="ipanel">
        <div
          className="icard"
          role="button"
          tabIndex={0}
          onClick={() => onCardClick('bank')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onCardClick('bank');
            }
          }}
        >
          <div className="ihead">
            <svg viewBox="0 0 26 26">
              <path d="M13 2L2.5 8.5h21z" fill="#4fd69b" />
              <circle cx="13" cy="6.6" r="1.7" fill="#d9fbe9" />
              <rect x="4" y="10.5" width="3.4" height="9" rx="1" fill="#6fe3ae" />
              <rect x="11.3" y="10.5" width="3.4" height="9" rx="1" fill="#6fe3ae" />
              <rect x="18.6" y="10.5" width="3.4" height="9" rx="1" fill="#6fe3ae" />
              <rect x="2" y="20.5" width="22" height="3.5" rx="1.5" fill="#4fd69b" />
            </svg>
            <b>Bank Info</b>
            <svg className="ok" viewBox="0 0 24 24" fill="none" stroke="#12b04a" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 1 1-4.2-7.6" />
              <path d="M7.5 12l3.5 3.5 9-10" />
            </svg>
          </div>
          <p>Ensure accuracy</p>
        </div>

        <div
          className="icard"
          role="button"
          tabIndex={0}
          onClick={() => onCardClick('basic')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onCardClick('basic');
            }
          }}
        >
          <div className="ihead">
            <svg viewBox="0 0 26 26">
              <rect x="9" y="2" width="8" height="4" rx="1.5" fill="#f6b45c" />
              <rect x="2" y="4.5" width="22" height="18" rx="3.5" fill="#fbd28a" />
              <circle cx="8.5" cy="11.5" r="2.6" fill="#fff4de" />
              <path d="M4.5 18Q4.5 14.5 8.5 14.5Q12.5 14.5 12.5 18Z" fill="#fff4de" />
              <path d="M14.5 11h6M14.5 15h6" stroke="#fff4de" strokeWidth="2" strokeLinecap="round" />
              <circle cx="21" cy="21" r="3.6" fill="#f6b45c" />
            </svg>
            <b>Basic Info</b>
            <svg className="ok" viewBox="0 0 24 24" fill="none" stroke="#12b04a" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 1 1-4.2-7.6" />
              <path d="M7.5 12l3.5 3.5 9-10" />
            </svg>
          </div>
          <p>Estimated to take 2 minutes</p>
        </div>

        <div
          className="icard"
          role="button"
          tabIndex={0}
          onClick={() => onCardClick('kyc')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onCardClick('kyc');
            }
          }}
        >
          <div className="ihead">
            <svg viewBox="0 0 26 26" fill="none">
              <path d="M2.5 8V4.5Q2.5 2.5 4.5 2.5H8M18 2.5H21.5Q23.5 2.5 23.5 4.5V8M23.5 18v3.5Q23.5 23.5 21.5 23.5H18M8 23.5H4.5Q2.5 23.5 2.5 21.5V18" stroke="#ef8f80" strokeWidth="2" strokeLinecap="round" />
              <circle cx="13" cy="13.5" r="6.6" fill="#f9a99c" />
              <circle cx="10.6" cy="12.8" r="1" fill="#fff" />
              <circle cx="15.4" cy="12.8" r="1" fill="#fff" />
              <path d="M10.5 16Q13 18 15.5 16" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <b>KYC Documents</b>
            <svg className="ok" viewBox="0 0 24 24" fill="none" stroke="#12b04a" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 1 1-4.2-7.6" />
              <path d="M7.5 12l3.5 3.5 9-10" />
            </svg>
          </div>
          <p>Estimated to take 1 minutes</p>
        </div>
      </div>

      <p className="note">*Your data is stored securely on our server and after verified we will not share this to you.</p>
    </div>
  );
};
