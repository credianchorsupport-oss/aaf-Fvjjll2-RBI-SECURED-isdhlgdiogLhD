import React from 'react';

export const ICONS: Record<string, React.ReactNode> = {
  joy: (
    <svg viewBox="0 0 26 26">
      <rect width="26" height="26" rx="6" fill="#1f7fe8" />
      <path d="M5 14a8 8 0 0 1 16 0z" fill="#f7b21f" />
      <path d="M13 6v8" stroke="#e08c10" strokeWidth="1.6" />
      <path d="M9 18Q13 21 17 18" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
  ),
  trust: (
    <svg viewBox="0 0 26 26">
      <rect width="26" height="26" rx="6" fill="#1d6df0" />
      <rect x="5" y="6" width="12" height="5" rx="2" fill="#8fe0a0" />
      <rect x="5" y="8" width="16" height="12" rx="3" fill="#53c46d" />
      <circle cx="19" cy="14" r="1.6" fill="#fff" />
      <path d="M10 14l2 2 4-4" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  zen: (
    <svg viewBox="0 0 26 26">
      <defs>
        <linearGradient id="zg2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6c52ea" />
          <stop offset="1" stopColor="#8e66f6" />
        </linearGradient>
      </defs>
      <rect width="26" height="26" rx="6" fill="url(#zg2)" />
      <circle cx="13" cy="6.5" r="1.7" fill="#fff" />
      <path d="M13 9Q9.5 12.5 13 19Q16.5 12.5 13 9Z" fill="#efe8ff" />
      <path d="M12 11Q5 12 6.5 19Q11 19 13 17Z M14 11Q21 12 19.5 19Q15 19 13 17Z" fill="#fff" opacity=".92" />
      <path d="M5 18.5Q13 23 21 18.5Q13 20.5 5 18.5Z" fill="#fff" />
    </svg>
  ),
  rupee: (
    <svg viewBox="0 0 26 26">
      <rect width="26" height="26" rx="6" fill="#2160e8" />
      <circle cx="14" cy="12.5" r="6.5" fill="#f6b21f" />
      <text x="14" y="16.2" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff" fontFamily="Poppins,sans-serif">₹</text>
      <path d="M3 9h6M2 13h5M4 17h5" stroke="#f9d36a" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M10 21Q17 24 22 18" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
  ),
  insta: (
    <svg viewBox="0 0 26 26">
      <rect width="26" height="26" rx="6" fill="#139a73" />
      <circle cx="12.5" cy="12" r="7" fill="#f7b21c" />
      <path d="M13.5 6.5L9.5 13h3l-1 5 4.5-7h-3z" fill="#fff" />
      <path d="M16 15l1 6 1.5-1.5 2 1 .8-1-2-1 1.7-1z" fill="#fff" stroke="#139a73" strokeWidth=".6" />
    </svg>
  ),
  giga: (
    <svg viewBox="0 0 26 26">
      <rect width="26" height="26" rx="6" fill="#16b36b" />
      <ellipse cx="13" cy="19" rx="6.5" ry="2.6" fill="#f0b323" />
      <ellipse cx="13" cy="15.8" rx="6.5" ry="2.6" fill="#f6c43e" />
      <ellipse cx="13" cy="12.6" rx="6.5" ry="2.6" fill="#f0b323" />
      <path d="M13 3L18 10H8z" fill="#fff" />
    </svg>
  ),
  pocket: (
    <svg viewBox="0 0 26 26">
      <rect x="9" y="3" width="9" height="8" rx="1.5" fill="#4cc471" transform="rotate(-12 13 7)" />
      <circle cx="17.5" cy="9" r="3" fill="#f6b21f" />
      <path d="M5 10Q5 8 7 8H19Q21 8 21 10V21Q21 23 19 23H7Q5 23 5 21Z" fill="#1d5fd6" />
      <path d="M5 13H21" stroke="#3d86ff" strokeWidth="1.4" />
    </svg>
  ),
  nova: (
    <svg viewBox="0 0 26 26">
      <rect width="26" height="26" rx="7" fill="#17b384" />
      <circle cx="13" cy="13" r="8" fill="none" stroke="#fff" strokeWidth="2" />
      <text x="13" y="17" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff" fontFamily="Poppins,sans-serif">₹</text>
    </svg>
  ),
};

export const INFO_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="#a9a9a9" strokeWidth="2" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 7v6M12 16.5v.5" strokeLinecap="round" />
  </svg>
);

export const HOURGLASS_ILLUSTRATION = (
  <svg viewBox="0 0 270 290" aria-hidden="true">
    <defs>
      <linearGradient id="hg1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#9bbd85" />
        <stop offset="1" stopColor="#7ea66b" />
      </linearGradient>
      <linearGradient id="hg2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffd05a" />
        <stop offset="1" stopColor="#f6a124" />
      </linearGradient>
    </defs>
    <circle cx="150" cy="150" r="118" fill="#a9c490" />
    <circle cx="150" cy="150" r="98" fill="#d4e4c5" />
    <path d="M150 62v22M150 216v22M62 150h22M216 150h22" stroke="#b7cfa6" strokeWidth="5" strokeLinecap="round" />
    <ellipse cx="135" cy="266" rx="80" ry="17" fill="#6f9a5c" />
    <ellipse cx="135" cy="258" rx="80" ry="17" fill="url(#hg1)" />
    <path d="M78 40H192C192 100 156 128 156 148C156 168 192 196 192 252H78C78 196 114 168 114 148C114 128 78 100 78 40Z" fill="#fff" fillOpacity=".55" stroke="#c9dad3" strokeWidth="3" />
    <path d="M108 70H162C160 100 146 114 141 134H129C124 114 110 100 108 70Z" fill="url(#hg2)" />
    <path d="M135 134V190" stroke="#f7a62a" strokeWidth="4" />
    <path d="M96 246C108 214 120 196 135 190C150 196 162 214 174 246Z" fill="url(#hg2)" />
    <ellipse cx="135" cy="32" rx="78" ry="16" fill="#6f9a5c" />
    <ellipse cx="135" cy="24" rx="78" ry="16" fill="url(#hg1)" />
    <circle cx="12" cy="108" r="12" fill="#b7b6ec" />
    <circle cx="228" cy="240" r="40" fill="#f08414" />
    <circle cx="228" cy="234" r="40" fill="#fba72f" />
    <circle cx="228" cy="234" r="29" fill="#f4921f" />
    <path d="M228 216v20l12 8" stroke="#fff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export const FAILED_ILLUSTRATION = (
  <svg viewBox="0 0 340 290" aria-hidden="true">
    <defs>
      <linearGradient id="fp" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#f4f6ff" />
        <stop offset="1" stopColor="#c9d3f6" />
      </linearGradient>
      <linearGradient id="fs" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#ff5a52" />
        <stop offset="1" stopColor="#cf2229" />
      </linearGradient>
    </defs>
    <circle cx="22" cy="150" r="14" fill="#cfd5f2" />
    <circle cx="318" cy="130" r="19" fill="#d83a3a" />
    <g transform="rotate(5 180 130)">
      <path d="M96 40L146 6H252Q264 6 264 18V236Q264 248 252 248H108Q96 248 96 236Z" fill="url(#fp)" stroke="#dfe5fb" strokeWidth="2" />
      <path d="M168 58l24-15 24 15zM172 66v22M192 66v22M212 66v22M166 94h52" stroke="#9fb0ee" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M138 124h104M138 150h104M138 176h84" stroke="#aebdf0" strokeWidth="9" strokeLinecap="round" />
    </g>
    <g transform="rotate(-8 90 208)">
      <rect x="26" y="186" width="130" height="50" rx="10" fill="#f7f8ff" stroke="#e24a4a" strokeWidth="3" />
      <text x="91" y="221" textAnchor="middle" fontSize="26" fontWeight="800" fill="#e23b3b" fontFamily="Poppins,sans-serif">FAILED</text>
    </g>
    <path d="M282 164L324 180V224C324 254 306 272 282 284C258 272 240 254 240 224V180Z" fill="url(#fs)" />
    <path d="M264 206l36 36M300 206l-36 36" stroke="#fff" strokeWidth="12" strokeLinecap="round" />
  </svg>
);

export const PAID_ILLUSTRATION = (
  <svg viewBox="0 0 360 300" aria-hidden="true">
    <defs>
      <linearGradient id="gg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#6fdc7e" />
        <stop offset="1" stopColor="#2fa745" />
      </linearGradient>
    </defs>
    <circle cx="176" cy="132" r="96" fill="none" stroke="#5ecb6b" strokeWidth="16" strokeDasharray="470 130" transform="rotate(-30 176 132)" />
    <path d="M262 28l-4 40-34-18z" fill="#4fbf5e" />
    <path d="M70 160l-6 -40 36 16z" fill="#4fbf5e" />
    <circle cx="176" cy="132" r="68" fill="url(#gg)" />
    <path d="M142 134l24 24 44-52" stroke="#fff" strokeWidth="16" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <ellipse cx="32" cy="204" rx="28" ry="38" fill="#f6a824" transform="rotate(-25 32 204)" />
    <ellipse cx="324" cy="76" rx="28" ry="34" fill="#f6a824" transform="rotate(20 324 76)" />
    <path d="M206 192H286L280 296H212Z" fill="#fff" stroke="#dfe7ee" strokeWidth="2" />
    <circle cx="246" cy="236" r="18" fill="none" stroke="#3fb554" strokeWidth="5" />
    <path d="M237 236l7 7 12-14" stroke="#3fb554" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const OVERDUE_ILLUSTRATION = (
  <svg viewBox="0 0 270 290" aria-hidden="true">
    <defs>
      <linearGradient id="og1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ff7a63" />
        <stop offset="1" stopColor="#e5412f" />
      </linearGradient>
    </defs>
    <circle cx="60" cy="60" r="34" fill="#e5412f" />
    <circle cx="210" cy="60" r="34" fill="#e5412f" />
    <path d="M70 250l-20 30M200 250l20 30" stroke="#c9301f" strokeWidth="12" strokeLinecap="round" />
    <circle cx="135" cy="150" r="108" fill="url(#og1)" />
    <circle cx="135" cy="150" r="86" fill="#fff3f0" />
    <path d="M135 78v18M135 204v18M63 150h18M189 150h18" stroke="#f0b5ac" strokeWidth="6" strokeLinecap="round" />
    <path d="M135 150V98M135 150l36 22" stroke="#c9301f" strokeWidth="10" strokeLinecap="round" />
    <circle cx="135" cy="150" r="9" fill="#c9301f" />
    <path d="M214 168L258 246H170Z" fill="#ffb02e" stroke="#ffb02e" strokeWidth="10" strokeLinejoin="round" />
    <rect x="209" y="192" width="10" height="30" rx="5" fill="#fff" />
    <circle cx="214" cy="234" r="6" fill="#fff" />
  </svg>
);

export const REVIEW_ILLUSTRATION = (
  <svg viewBox="0 0 270 290" aria-hidden="true">
    <defs>
      <linearGradient id="rg1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#fed268" />
        <stop offset="1" stopColor="#f6a018" />
      </linearGradient>
    </defs>
    <circle cx="135" cy="135" r="96" fill="#fff3d6" />
    <circle cx="135" cy="135" r="76" fill="url(#rg1)" />
    <rect x="95" y="80" width="80" height="110" rx="12" fill="#fff" />
    <circle cx="135" cy="115" r="16" fill="#fdf0cd" />
    <rect x="110" y="145" width="50" height="6" rx="3" fill="#e8d8be" />
    <rect x="115" y="160" width="40" height="5" rx="2.5" fill="#e8d8be" />
    <path d="M165 170L195 200M180 185A18 18 0 1 1 155 160" stroke="#f6a018" strokeWidth="8" strokeLinecap="round" fill="none" />
  </svg>
);
