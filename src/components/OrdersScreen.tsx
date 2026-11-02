import React from 'react';
import { LoanOrder, view } from '../utils/loan';
import { ICONS } from './Icons';

interface OrdersScreenProps {
  orders: LoanOrder[];
  title: string;
  onBack: () => void;
  onOpenDetail: (index: number) => void;
}

export const OrdersScreen: React.FC<OrdersScreenProps> = ({
  orders,
  title,
  onBack,
  onOpenDetail,
}) => {
  return (
    <div id="s8">
      <div className="phead">
        <button className="back" id="backo" onClick={onBack} aria-label="Back">
          <svg viewBox="0 0 10 18">
            <path d="M8.5 1.5L2 9l6.5 7.5" stroke="#111" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 id="otitle">{title}</h1>
      </div>

      <div id="olist">
        {orders.map((o, i) => {
          const v = view(o);
          const isRev = v.k === 'rev';

          return (
            <div
              key={o.no}
              className={`oc ${v.k}`}
              data-i={i}
              role="button"
              tabIndex={0}
              onClick={() => onOpenDetail(i)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpenDetail(i);
                }
              }}
            >
              <div className="oh">
                <span className="ol">{ICONS[o.ic]}</span>
                <b className="onm">{o.n}</b>
                <i className="spill">{v.st}</i>
              </div>

              <div className="ob">
                <div className="orow o1">
                  <span>{v.al}</span>
                  <b>{v.amt}</b>
                </div>
                <div className="orow o2">
                  <span>Order Number</span>
                  <b className="ov">{o.no}</b>
                </div>
                <div className="orow o3">
                  <span>{v.dl}</span>
                  <b>{v.d}</b>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
