import React from 'react';

interface MyScreenProps {
  onOpenOrders: () => void;
  onOpenInfo: () => void;
  onOpenCoupon: () => void;
  onOpenPrivacy: () => void;
  onOpenContact: () => void;
  onCheckUpdate: () => void;
  onLogout: () => void;
  userName?: string;
  userPhone?: string;
}

export const MyScreen: React.FC<MyScreenProps> = ({
  onOpenOrders,
  onOpenInfo,
  onOpenCoupon,
  onOpenPrivacy,
  onOpenContact,
  onCheckUpdate,
  onLogout,
  userName = 'DEMO USER',
  userPhone = '0000000000',
}) => {
  return (
    <div id="s3">
      <div className="who">
        <div className="logo">SKN</div>
        <div>
          <b>{userName}</b>
          <span>{userPhone}</span>
        </div>
      </div>

      <div className="two">
        <div
          className="mc"
          id="cardorder"
          role="button"
          tabIndex={0}
          onClick={onOpenOrders}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onOpenOrders();
            }
          }}
        >
          <svg viewBox="0 0 40 44">
            <defs>
              <linearGradient id="oa" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#ffc24a" />
                <stop offset="1" stopColor="#f58a1c" />
              </linearGradient>
            </defs>
            <rect x="4" y="6" width="32" height="36" rx="7" fill="url(#oa)" />
            <rect x="14" y="2" width="12" height="7" rx="3" fill="#d8d0c8" />
            <rect x="9" y="13" width="22" height="14" rx="4" fill="#fff4e0" />
            <path d="M15 20l4 4 7-8" stroke="#f58a1c" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="9" y="31" width="9" height="3" rx="1.5" fill="#ffe2b0" />
            <rect x="9" y="36" width="14" height="3" rx="1.5" fill="#ffe2b0" />
          </svg>
          <span>My order</span>
          <svg className="chev" viewBox="0 0 8 14">
            <path d="M1 1l6 6-6 6" fill="none" stroke="#8a8a8a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div
          className="mc"
          id="cardinfo"
          role="button"
          tabIndex={0}
          onClick={onOpenInfo}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onOpenInfo();
            }
          }}
        >
          <svg viewBox="0 0 40 44">
            <circle cx="15" cy="10" r="8" fill="#f79a2e" />
            <path d="M2 41Q2 22 15 21Q28 22 28 41Z" fill="#f58a1c" />
            <path d="M13 22l2 5-2 12h4l-2-12 2-5z" fill="#fff0dc" />
            <rect x="21" y="22" width="16" height="20" rx="3" fill="#fff" stroke="#f3d3a8" />
            <rect x="25" y="19" width="8" height="5" rx="2" fill="#f6c985" />
            <path d="M24 29h10M24 33h10M24 37h7" stroke="#e8d6bc" strokeWidth="2" />
          </svg>
          <span>My Info</span>
          <svg className="chev" viewBox="0 0 8 14">
            <path d="M1 1l6 6-6 6" fill="none" stroke="#8a8a8a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div className="menu">
        <div
          className="row"
          id="rowcoupon"
          role="button"
          tabIndex={0}
          onClick={onOpenCoupon}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onOpenCoupon();
            }
          }}
        >
          <div className="ci">
            <svg viewBox="0 0 24 24">
              <path d="M2 6h20v4a2 2 0 0 0 0 4v4H2v-4a2 2 0 0 0 0-4z" fill="#f9922a" />
              <text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff" fontFamily="Poppins,sans-serif">₹</text>
            </svg>
          </div>
          <span>My Coupon</span>
          <svg className="chev" viewBox="0 0 8 14">
            <path d="M1 1l6 6-6 6" fill="none" stroke="#8a8a8a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div
          className="row"
          id="rowprivacy"
          role="button"
          tabIndex={0}
          onClick={onOpenPrivacy}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onOpenPrivacy();
            }
          }}
        >
          <div className="ci">
            <svg viewBox="0 0 24 24">
              <path d="M5 2h9l5 5v15H5z" fill="#f9922a" />
              <path d="M14 2v5h5z" fill="#fcc577" />
              <path d="M9 14h6M9 18h6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <span>Privacy Policy</span>
          <svg className="chev" viewBox="0 0 8 14">
            <path d="M1 1l6 6-6 6" fill="none" stroke="#8a8a8a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div
          className="row"
          id="rowcontact"
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
          <div className="ci">
            <svg viewBox="0 0 24 24">
              <path d="M6.5 3.5l3 .5 1 4-2 1.5a11 11 0 0 0 5 5L15 12.5l4 1 .5 3a2 2 0 0 1-2 2A14 14 0 0 1 4.5 5.5a2 2 0 0 1 2-2z" fill="#f9922a" />
              <path d="M14 5a6 6 0 0 1 5 5M14 8a3 3 0 0 1 2 2" stroke="#f9922a" fill="none" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
          <span>Contact us</span>
          <svg className="chev" viewBox="0 0 8 14">
            <path d="M1 1l6 6-6 6" fill="none" stroke="#8a8a8a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div
          className="row"
          id="rowupdate"
          role="button"
          tabIndex={0}
          onClick={onCheckUpdate}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onCheckUpdate();
            }
          }}
        >
          <div className="ci">
            <svg viewBox="0 0 24 24">
              <rect x="3" y="3" width="18" height="18" rx="4.5" fill="#f9922a" />
              <path d="M12 17V8M8 11.5l4-4 4 4" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span>Check Update</span>
          <b className="ver">v1.0.0</b>
          <svg className="chev" viewBox="0 0 8 14">
            <path d="M1 1l6 6-6 6" fill="none" stroke="#8a8a8a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div
        className="logout"
        role="button"
        tabIndex={0}
        onClick={onLogout}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onLogout();
          }
        }}
        aria-label="Log out"
      >
        <div className="row">
          <div className="ci">
            <svg viewBox="0 0 24 24">
              <path d="M12 3v8" stroke="#f0506e" strokeWidth="2.4" strokeLinecap="round" />
              <path d="M7 6.5a8 8 0 1 0 10 0" stroke="#f0506e" fill="none" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
          </div>
          <span>Log out</span>
        </div>
        <svg className="chev" viewBox="0 0 8 14">
          <path d="M1 1l6 6-6 6" fill="none" stroke="#8a8a8a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
};
