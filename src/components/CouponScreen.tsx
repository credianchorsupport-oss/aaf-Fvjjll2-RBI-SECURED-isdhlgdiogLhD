import React, { useState } from 'react';

interface CouponScreenProps {
  onBack: () => void;
  onToast: (msg: string) => void;
}

interface Coupon {
  code: string;
  amount: string;
  desc: string;
  expiry: string;
  status: 'eff' | 'inv';
}

export const CouponScreen: React.FC<CouponScreenProps> = ({ onBack, onToast }) => {
  const [tab, setTab] = useState<'eff' | 'inv'>('eff');
  const [couponCode, setCouponCode] = useState('');
  const [coupons, setCoupons] = useState<Coupon[]>([
    {
      code: 'WELCOME50',
      amount: '₹50 OFF',
      desc: 'First loan fee waiver',
      expiry: '30/11/2026',
      status: 'eff',
    },
  ]);

  const handleRedeem = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = couponCode.trim().toUpperCase();
    if (!clean) {
      onToast('Please enter a coupon code');
      return;
    }
    if (coupons.some((c) => c.code === clean)) {
      onToast('Coupon already claimed');
      return;
    }
    const newCoupon: Coupon = {
      code: clean,
      amount: clean === 'FEEZERO' ? '100% OFF' : '₹200 OFF',
      desc: 'Special repayment discount voucher',
      expiry: '15/12/2026',
      status: 'eff',
    };
    setCoupons((prev) => [newCoupon, ...prev]);
    setCouponCode('');
    onToast('Coupon applied successfully!');
  };

  const filtered = coupons.filter((c) => c.status === tab);

  return (
    <div id="s4">
      <div className="phead">
        <button className="back" onClick={onBack} aria-label="Back to My page">
          <svg viewBox="0 0 10 18">
            <path d="M8.5 1.5L2 9l6.5 7.5" stroke="#111" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1>My Coupon</h1>
      </div>

      <div className={`ccard ${tab}`}>
        <div className="ctabs">
          <div className="tabwhite" />
          <button
            className={`ctab ${tab === 'eff' ? 'on' : ''}`}
            data-t="eff"
            onClick={() => setTab('eff')}
          >
            <span>Effective</span>
            <i />
          </button>
          <button
            className={`ctab ${tab === 'inv' ? 'on' : ''}`}
            data-t="inv"
            onClick={() => setTab('inv')}
          >
            <span>Invalid</span>
            <i />
          </button>
        </div>

        <div className="cbody">
          {tab === 'eff' && (
            <form onSubmit={handleRedeem} className="coupon-input-bar">
              <input
                type="text"
                placeholder="Enter coupon code (e.g. SKN200)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                aria-label="Coupon code input"
              />
              <button type="submit">Redeem</button>
            </form>
          )}

          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: 'calc(20*var(--u))' }}>
              <svg className="empty-coupon-box" viewBox="0 0 230 220" aria-hidden="true">
                <defs>
                  <linearGradient id="cb1" x1="0" y1="0" x2="1" y2="1">
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
                <path d="M22 112L116 134L116 205L30 166Z" fill="url(#cb1)" />
                <path d="M116 134L208 112L200 166L116 205Z" fill="#f2c531" />
                <path d="M22 112L8 128L30 140Z" fill="#fbe068" />
                <path d="M208 112L224 126L204 140Z" fill="#f6d04a" />
                <path d="M22 112L116 134L208 112" stroke="#fff3b0" strokeWidth="2" fill="none" />
              </svg>
              <p>No coupons</p>
            </div>
          ) : (
            <div style={{ width: '100%', marginTop: 'calc(16*var(--u))' }}>
              {filtered.map((c) => (
                <div key={c.code} className="coupon-item">
                  <div>
                    <div className="coupon-val">{c.amount}</div>
                    <div className="coupon-desc">{c.desc}</div>
                    <div style={{ fontSize: 'calc(11*var(--u))', color: '#999', marginTop: '2px' }}>
                      Code: {c.code} · Expires {c.expiry}
                    </div>
                  </div>
                  <span style={{ fontSize: 'calc(12*var(--u))', background: '#f5a018', color: '#fff', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>
                    Active
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
