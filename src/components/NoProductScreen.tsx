import React from 'react';

interface NoProductScreenProps {
  onBack: () => void;
  onOpenContact: () => void;
}

export const NoProductScreen: React.FC<NoProductScreenProps> = ({ onBack, onOpenContact }) => {
  return (
    <div id="s2">
      <div style={{ padding: 'calc(10*var(--u)) calc(18*var(--u)) 0', display: 'flex', alignItems: 'center' }}>
        <button className="back" onClick={onBack} aria-label="Back to home" style={{ position: 'static', transform: 'none' }}>
          <svg viewBox="0 0 10 18">
            <path d="M8.5 1.5L2 9l6.5 7.5" stroke="#111" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="empty">
        <svg className="box" viewBox="0 0 230 220" aria-hidden="true">
          <defs>
            <linearGradient id="bl" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#fde97a" />
              <stop offset="1" stopColor="#f6d03c" />
            </linearGradient>
          </defs>
          <path d="M100 100Q112 52 166 42" stroke="#b4b4b4" strokeWidth="1.6" strokeDasharray="3 4" fill="none" />
          <ellipse cx="190" cy="34" rx="17" ry="8" fill="#a9a9a9" transform="rotate(-12 190 34)" />
          <path d="M176 30L168 16L186 26Z" fill="#c3c3c3" />
          <path d="M204 28L216 22L208 36Z" fill="#a0a0a0" />
          <path d="M58 86L170 86L208 112L116 134L22 112Z" fill="#e6b624" />
          <path d="M58 86L100 96L116 134L22 112Z" fill="#f0c53a" />
          <path d="M22 112L116 134L116 205L30 166Z" fill="url(#bl)" />
          <path d="M116 134L208 112L200 166L116 205Z" fill="#f2c531" />
          <path d="M22 112L8 128L30 140Z" fill="#fbe068" />
          <path d="M208 112L224 126L204 140Z" fill="#f6d04a" />
          <path d="M22 112L116 134L208 112" stroke="#fff3b0" strokeWidth="2" fill="none" />
        </svg>
        <p>
          Your qualification has been reviewed, and there is no loan product that meets your requirements for the time being. There will be new products every week, please continue to pay attention.
        </p>
        <div
          className="help"
          id="contact2"
          role="button"
          tabIndex={0}
          onClick={onOpenContact}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onOpenContact();
            }
          }}
        >
          <svg viewBox="0 0 56 52">
            <path d="M6 24L28 4L50 24V46Q50 50 46 50H10Q6 50 6 46Z" fill="#fde3e0" />
            <rect x="12" y="20" width="32" height="22" rx="10" fill="#fff" />
            <rect x="16" y="25" width="24" height="12" rx="6" fill="#1b2a3b" />
            <circle cx="23" cy="31" r="2.5" fill="#54e0ff" />
            <circle cx="33" cy="31" r="2.5" fill="#54e0ff" />
            <circle cx="48" cy="14" r="3.5" fill="#ff7a3a" />
          </svg>
          <span>Contact US</span>
        </div>
      </div>
    </div>
  );
};
