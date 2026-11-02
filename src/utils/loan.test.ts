import test from 'node:test';
import assert from 'node:assert/strict';
import {
  num,
  money,
  parseDate,
  formatDate,
  dueOf,
  lateInfo,
  kind,
  view,
  LoanOrder,
} from './loan';

test('num parses currency strings to numeric integers', () => {
  assert.equal(num('₹11,000'), 11000);
  assert.equal(num('₹4,300'), 4300);
  assert.equal(num('0'), 0);
  assert.equal(num(''), 0);
});

test('money formats integer numbers to Indian Rupee strings', () => {
  assert.equal(money(11000), '₹11,000');
  assert.equal(money(150000), '₹1,50,000');
  assert.equal(money(800), '₹800');
});

test('parseDate and formatDate handle DD/MM/YYYY dates', () => {
  const d = parseDate('23/10/2026');
  assert.equal(d.getFullYear(), 2026);
  assert.equal(d.getMonth(), 9); // October (0-indexed)
  assert.equal(d.getDate(), 23);
  assert.equal(formatDate(d), '23/10/2026');
});

test('dueOf calculates application date + 7 days', () => {
  const order = { ad: '23/10/2026', d: '23/10/2026' };
  assert.equal(dueOf(order), '30/10/2026');
});

test('lateInfo computes days overdue, daily 7% fee, and total sum', () => {
  const order: LoanOrder = {
    n: 'Zen Money',
    ic: 'zen',
    st: 'Pending Repayment',
    k: 'pend',
    al: 'Repayment Amount',
    amt: '₹10,000',
    no: '12345',
    dl: 'Due Date',
    d: '20/10/2026',
    ad: '20/10/2026', // Due: 27/10/2026
  };

  // On due date: 0 days overdue
  const onDue = lateInfo(order, new Date(2026, 9, 27));
  assert.equal(onDue.days, 0);
  assert.equal(onDue.fee, 0);
  assert.equal(onDue.total, 10000);

  // 3 days past due date (30/10/2026): 3 days overdue, 7% daily fee = 700 * 3 = 2100
  const threeDaysLate = lateInfo(order, new Date(2026, 9, 30));
  assert.equal(threeDaysLate.days, 3);
  assert.equal(threeDaysLate.perDay, 700);
  assert.equal(threeDaysLate.fee, 2100);
  assert.equal(threeDaysLate.total, 12100);
});

test('kind accurately transitions to "od" (overdue) when past due', () => {
  const order: LoanOrder = {
    n: 'Zen Money',
    ic: 'zen',
    st: 'Pending Repayment',
    k: 'pend',
    al: 'Repayment Amount',
    amt: '₹10,000',
    no: '12345',
    dl: 'Due Date',
    d: '20/10/2026',
    ad: '20/10/2026',
  };

  assert.equal(kind(order, new Date(2026, 9, 26)), 'pend');
  assert.equal(kind(order, new Date(2026, 9, 27)), 'pend');
  assert.equal(kind(order, new Date(2026, 9, 28)), 'od');
});

test('repaid, rejected, and under review orders never transition to overdue', () => {
  const paidOrder: LoanOrder = {
    n: 'Pocket Credit',
    ic: 'pocket',
    st: 'Repaid',
    k: 'paid',
    al: 'Loan amount',
    amt: '₹4,300',
    no: '4789102026100609102030877',
    dl: 'Application Date',
    d: '06/10/2026',
  };
  assert.equal(kind(paidOrder, new Date(2026, 10, 15)), 'paid');

  const revOrder: LoanOrder = {
    n: 'Joy Wallet',
    ic: 'joy',
    st: 'Under Review',
    k: 'rev',
    al: 'Loan amount',
    amt: '₹7,000',
    no: '47891020261021165759123',
    dl: 'Application Date',
    d: '21/10/2026',
  };
  assert.equal(kind(revOrder, new Date(2026, 10, 15)), 'rev');
});
