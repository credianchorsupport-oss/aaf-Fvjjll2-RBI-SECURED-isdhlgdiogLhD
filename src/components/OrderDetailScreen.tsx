import React from 'react';
import { LoanOrder, kind, lateInfo, money, dueOf, STATUS_DETAILS, PERIOD } from '../utils/loan';
import {
  INFO_ICON,
  HOURGLASS_ILLUSTRATION,
  FAILED_ILLUSTRATION,
  PAID_ILLUSTRATION,
  OVERDUE_ILLUSTRATION,
  REVIEW_ILLUSTRATION,
} from './Icons';

interface OrderDetailScreenProps {
  order: LoanOrder;
  orderIndex: number;
  onBack: () => void;
  onOpenAmount: (order: LoanOrder) => void;
  onRepayNow: (order: LoanOrder, index: number) => void;
}

export const OrderDetailScreen: React.FC<OrderDetailScreenProps> = ({
  order,
  orderIndex,
  onBack,
  onOpenAmount,
  onRepayNow,
}) => {
  const k = kind(order);
  const L = lateInfo(order);
  const statusInfo = STATUS_DETAILS[k] || STATUS_DETAILS.pp;
  const appDate = order.ad || order.d;

  let illustration = HOURGLASS_ILLUSTRATION;
  if (k === 'od') illustration = OVERDUE_ILLUSTRATION;
  else if (k === 'rej') illustration = FAILED_ILLUSTRATION;
  else if (k === 'paid') illustration = PAID_ILLUSTRATION;
  else if (k === 'rev') illustration = REVIEW_ILLUSTRATION;

  const isRepayable = k === 'pend' || k === 'od';

  return (
    <div id="s9">
      <div className="phead">
        <button className="back" id="backd" onClick={onBack} aria-label="Back to previous screen">
          <svg viewBox="0 0 10 18">
            <path d="M8.5 1.5L2 9l6.5 7.5" stroke="#111" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1>Order Details</h1>
      </div>

      <div id="dbody">
        <div className="dcard">
          <div className="dill">{illustration}</div>
          <h2 className="dstat">{statusInfo.t}</h2>
          {statusInfo.msg && <p className="dmsg">{statusInfo.msg}</p>}

          <div className="dbox">
            <div className="dlab">
              {isRepayable ? 'Repayment Amount' : 'Line of credit'}
            </div>
            <div className="damt">
              {k === 'od' ? money(L.total) : order.amt}
              <button
                className="dinfo"
                id="dinfo"
                onClick={() => onOpenAmount(order)}
                aria-label="View amount details"
              >
                {INFO_ICON}
              </button>
            </div>

            <div className="drows">
              <div className="drow">
                <span>Order ID</span>
                <b className="font-mono">{order.no}</b>
              </div>
              {k === 'od' && (
                <>
                  <div className="drow due">
                    <span>Due Date</span>
                    <b>{dueOf(order)}</b>
                  </div>
                  <div className="drow">
                    <span>Days overdue</span>
                    <b>{L.days} {L.days === 1 ? 'day' : 'days'}</b>
                  </div>
                  <div className="drow">
                    <span>Loan amount</span>
                    <b>{order.amt}</b>
                  </div>
                  <div className="drow red">
                    <span>Late fee (7% a day)</span>
                    <b>{money(L.fee)}</b>
                  </div>
                  <div className="drow">
                    <span>Repayment amount</span>
                    <b>{money(L.total)}</b>
                  </div>
                </>
              )}

              {k === 'pend' && (
                <>
                  <div className="drow due">
                    <span>Due Date</span>
                    <b>{dueOf(order)}</b>
                  </div>
                  <div className="drow">
                    <span>Loan amount</span>
                    <b>{order.amt}</b>
                  </div>
                  <div className="drow">
                    <span>Repayment amount</span>
                    <b>{order.amt}</b>
                  </div>
                </>
              )}

              <div className="drow">
                <span>Period</span>
                <b>{PERIOD} days</b>
              </div>

              <div className="drow">
                <span>Application Date</span>
                <b>{appDate}</b>
              </div>

              <div className="drow last">
                <span>Recipient Account Number</span>
                <b>**********6858</b>
              </div>
            </div>
          </div>
        </div>

        {isRepayable && (
          <button
            className="pbtn rnow"
            onClick={() => onRepayNow(order, orderIndex)}
            aria-label={`Repay now for ${order.n}`}
          >
            Repay Now
          </button>
        )}
      </div>
    </div>
  );
};
