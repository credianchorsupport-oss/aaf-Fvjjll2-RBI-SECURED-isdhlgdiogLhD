import React from 'react';

interface HomeScreenProps {
  onGetCredit: () => void;
  onOpenContact: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onGetCredit, onOpenContact }) => {
  return (
    <>
      <div className="top">
        <div className="hero">
          <svg className="bag" viewBox="0 0 60 70">
            <path d="M20 12Q30 0 40 12L36 21Q50 29 53 47Q55 67 30 67Q5 67 7 47Q10 29 24 21Z" fill="#f4906c" />
            <rect x="20" y="17" width="20" height="6" rx="3" fill="#e2607c" />
          </svg>
          <svg className="coin" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="30" fill="#f2a31f" />
            <circle cx="32" cy="32" r="24" fill="#f9c24a" />
            <text x="32" y="43" textAnchor="middle" fontSize="30" fontWeight="700" fill="#e07c14" fontFamily="Poppins,sans-serif">₹</text>
          </svg>
          <div className="badge">INSTANT CREDIT</div>
          <div className="sub">Anytime, Anywhere</div>
        </div>

        <div className="card">
          <div className="pill">
            <div className="logo">SKN</div>
            <span>Sasural ka nati</span>
          </div>
          <div className="lbl">Maximum credit limit</div>
          <div className="amt">₹1,50,000</div>
          <div className="period">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.8">
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M3 10h18M8 3v4M16 3v4M8 14h2M12 14h2M16 14h2M8 17h2M12 17h2" />
            </svg>
            Period:&nbsp; 365 days
          </div>
          <div className="tiles">
            <div className="tile">
              <svg viewBox="0 0 60 60">
                <circle cx="28" cy="28" r="21" fill="#fff3d6" stroke="#f2a13a" strokeWidth="5" />
                <path d="M28 14v15l10 6" stroke="#e8892b" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                <rect x="30" y="36" width="26" height="17" rx="4" fill="#f6a21e" />
                <text x="43" y="49" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff" fontFamily="Poppins,sans-serif">24</text>
              </svg>
              <span>24/7 Support</span>
            </div>
            <div className="tile">
              <svg viewBox="0 0 60 60">
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#f9b548" />
                    <stop offset="1" stopColor="#ee7a2a" />
                  </linearGradient>
                </defs>
                <path d="M30 4L52 12V30C52 44 42 54 30 58C18 54 8 44 8 30V12Z" fill="url(#g1)" />
                <path d="M34 13L21 35H30L27 49L41 26H32Z" fill="#ffe45c" />
              </svg>
              <span>Easy And Fast</span>
            </div>
            <div className="tile">
              <svg viewBox="0 0 60 60">
                <path d="M30 4L52 12V30C52 44 42 54 30 58C18 54 8 44 8 30V12Z" fill="url(#g1)" />
                <path d="M19 30L27 38L42 21" stroke="#fff" strokeWidth="5.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Secure</span>
            </div>
          </div>
        </div>

        <div className="cta">
          <div className="tag">Low interest : 0.05%/day</div>
          <button className="btn" id="getcredit" onClick={onGetCredit}>
            Get Credit
            <svg width="26" height="18" viewBox="0 0 26 18" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 9h21M16 2l7 7-7 7" />
            </svg>
          </button>
          <div
            className="help"
            id="contact"
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

      <h2 className="cert">Certification process</h2>
      <div className="steps">
        <div className="step">
          <i>
            <svg viewBox="0 0 40 40">
              <path d="M10 6h14l6 6v10M10 6v28h12" />
              <path d="M15 16h10M15 22h6M24 34l2-6 10-10 4 4-10 10z" />
            </svg>
          </i>
          <span>Apply</span>
        </div>
        <div className="arrow" />
        <div className="step">
          <i>
            <svg viewBox="0 0 40 40">
              <path d="M20 5L33 10V21C33 29 27 34 20 36C13 34 7 29 7 21V10Z" />
              <path d="M14 20L19 25L27 15" />
            </svg>
          </i>
          <span>Certified</span>
        </div>
        <div className="arrow" />
        <div className="step">
          <i>
            <svg viewBox="0 0 40 40">
              <path d="M15 8Q20 2 25 8L23 12Q32 17 33 28Q33 36 20 36Q7 36 7 28Q8 17 17 12Z" />
              <path d="M15 22h10M15 27h10M17 22Q24 22 24 25Q24 28 17 29l6 4" />
            </svg>
          </i>
          <span>Finish</span>
        </div>
      </div>
    </>
  );
};
