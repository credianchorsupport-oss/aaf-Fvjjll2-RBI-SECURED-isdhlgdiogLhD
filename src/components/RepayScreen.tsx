import React from 'react';
import { LoanOrder, kind, lateInfo, num, money, dueOf } from '../utils/loan';
import { ICONS, INFO_ICON } from './Icons';

interface RepayScreenProps {
  orders: LoanOrder[];
  onOpenOrderHistory: () => void;
  onOpenDetail: (index: number) => void;
  onOpenAmount: (order: LoanOrder) => void;
  onRepayNow: (order: LoanOrder, index: number) => void;
}

export const RepayScreen: React.FC<RepayScreenProps> = ({
  orders,
  onOpenOrderHistory,
  onOpenDetail,
  onOpenAmount,
  onRepayNow,
}) => {
  // Filter for pending repayment or overdue orders
  const repayableIndices: number[] = [];
  let totalDue = 0;

  orders.forEach((o, i) => {
    const kd = kind(o);
    if (kd === 'pend' || kd === 'od') {
      repayableIndices.push(i);
      const L = lateInfo(o);
      const amt = kd === 'od' ? L.total : num(o.amt);
      totalDue += amt;
    }
  });

  return (
    <div id="s7">
      <h1>Repay</h1>

      <div className="tcard">
        <div className="lb">Total Amount Due</div>
        <div className="amt2" id="rtotal">{money(totalDue)}</div>
        <svg className="wallet" viewBox="0 0 210 260" aria-hidden="true">
          <defs>
            <linearGradient id="wl" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#fbb25a" />
              <stop offset="1" stopColor="#e57f26" />
            </linearGradient>
            <linearGradient id="wf" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f7a24c" />
              <stop offset="1" stopColor="#ea8a2e" />
            </linearGradient>
          </defs>
          <g transform="rotate(32 160 70)">
            <rect x="112" y="34" width="104" height="64" rx="9" fill="#4fbd62" />
            <rect x="120" y="42" width="88" height="48" rx="6" fill="#7fd98c" />
            <circle cx="164" cy="66" r="14" fill="#4aa95a" />
          </g>
          <path d="M24 108Q16 94 34 94L132 112Q168 118 178 140L188 218Q190 244 162 248L58 258Q30 260 28 234Z" fill="url(#wl)" />
          <path d="M112 156Q112 140 132 142L196 148Q212 150 210 168L206 196Q204 212 186 210L128 204Q112 202 112 186Z" fill="url(#wf)" />
          <circle cx="156" cy="178" r="17" fill="#f1efec" />
          <ellipse cx="46" cy="44" rx="34" ry="31" fill="#f4b02a" transform="rotate(-18 46 44)" />
          <ellipse cx="44" cy="42" rx="23" ry="20" fill="#fbd25a" transform="rotate(-18 44 42)" />
        </svg>
        <button className="pbtn" id="ohist" onClick={onOpenOrderHistory}>
          Order History
        </button>
      </div>

      <div className="notice">
        <h4>Repayment Safety Notice</h4>
        <svg className="tri" viewBox="0 0 60 54" aria-hidden="true">
          <defs>
            <linearGradient id="tg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffbf3d" />
              <stop offset="1" stopColor="#f26a1b" />
            </linearGradient>
          </defs>
          <path d="M30 4L57 49H3Z" fill="url(#tg)" stroke="#f89a35" strokeWidth="5" strokeLinejoin="round" />
          <rect x="27" y="18" width="6" height="17" rx="3" fill="#fff" />
          <circle cx="30" cy="42" r="3.4" fill="#fff" />
        </svg>
        <div className="nrow">
          <i>
            <svg viewBox="0 0 24 24">
              <rect x="4" y="3" width="16" height="18" rx="4" fill="#e8403a" />
              <rect x="9" y="8" width="6" height="8" rx="1.5" fill="#fff" />
            </svg>
          </i>
          <span>Only repay through the official app</span>
        </div>
        <div className="nrow x">
          <i>
            <svg viewBox="0 0 24 24">
              <path d="M5 5l14 14M19 5L5 19" stroke="#e5252a" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </i>
          <span>Do not trust any refund or UPI request from others</span>
        </div>
        <div className="nrow">
          <i>
            <svg viewBox="0 0 24 24">
              <path d="M12 3L22 20H2Z" fill="#f6c21a" stroke="#f6c21a" strokeWidth="2" strokeLinejoin="round" />
              <rect x="11" y="9" width="2" height="6" fill="#222" />
              <circle cx="12" cy="17.5" r="1.2" fill="#222" />
            </svg>
          </i>
          <span>Never share repayment screenshots with anyone</span>
        </div>
      </div>

      <div id="rlist">
        {repayableIndices.length === 0 ? (
          <div
            style={{
              background: '#fff',
              borderRadius: 'calc(20*var(--u))',
              padding: 'calc(24*var(--u))',
              textAlign: 'center',
              marginTop: 'calc(12*var(--u))',
            }}
          >
            <p style={{ margin: 0, font: '600 calc(16*var(--u)) var(--serif)', color: '#3a2410' }}>
              No pending repayments!
            </p>
            <p style={{ margin: '8px 0 0', fontSize: 'calc(13*var(--u))', color: '#666' }}>
              All your loans are up to date. Keep maintaining a good credit rating!
            </p>
          </div>
        ) : (
          repayableIndices.map((i) => {
            const o = orders[i];
            const kd = kind(o);
            const L = lateInfo(o);
            const isOd = kd === 'od';
            const currentAmount = isOd ? L.total : num(o.amt);

            return (
              <div
                key={o.no}
                className={`zcard ${isOd ? 'odc' : ''}`}
                data-i={i}
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  if (target.closest('button')) return;
                  onOpenDetail(i);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenDetail(i);
                  }
                }}
              >
                <div className="zhead">
                  <div className="zname">
                    {ICONS[o.ic]}
                    <span>{o.n}</span>
                  </div>
                  <button
                    className="pbtn repaynow"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRepayNow(o, i);
                    }}
                    aria-label={`Repay now for ${o.n}`}
                  >
                    Repay Now
                  </button>
                </div>

                <div className="ibox">
                  <div className="irow r1">
                    <span>Repayment Amount</span>
                    <div className="amt3">
                      {money(currentAmount)}
                      <button
                        className="rinfo"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenAmount(o);
                        }}
                        aria-label={`Amount details for ${o.n}`}
                      >
                        {INFO_ICON}
                      </button>
                    </div>
                  </div>

                  <div className="irow r2">
                    <span>Order Number</span>
                    <b className="ov">{o.no}</b>
                  </div>

                  <div className="irow r3">
                    <span>Due Date</span>
                    <b>{dueOf(o)}</b>
                  </div>

                  {isOd && (
                    <div className="irow r4">
                      <span>Late Fee ({L.days} {L.days === 1 ? 'day' : 'days'})</span>
                      <b>{money(L.fee)}</b>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
