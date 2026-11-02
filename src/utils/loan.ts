export interface LoanOrder {
  n: string; // product name
  ic: string; // icon slug
  st: string; // display status
  k: 'pend' | 'rej' | 'paid' | 'rev' | 'od' | 'pp'; // status key
  al: string; // amount label
  amt: string; // formatted amount
  no: string; // order number
  dl: string; // date label
  d: string; // date string (DD/MM/YYYY)
  ad?: string; // application date string (DD/MM/YYYY)
  repaidAt?: string; // repayment timestamp
}

export const PERIOD = 7; // days
export const LATE_RATE = 0.07; // 7% daily

export function num(t: string | number): number {
  return parseInt(String(t).replace(/[^\d]/g, ''), 10) || 0;
}

export function money(n: number): string {
  return '₹' + n.toLocaleString('en-IN');
}

export function parseDate(s: string): Date {
  if (!s) return new Date();
  const clean = s.trim();
  if (clean.includes('-')) {
    const parts = clean.split('-');
    if (parts[0].length === 4) {
      return new Date(+parts[0], +parts[1] - 1, +parts[2]);
    }
    return new Date(+parts[2], +parts[1] - 1, +parts[0]);
  }
  const a = clean.split('/');
  if (a.length === 3) {
    if (a[0].length === 4) {
      return new Date(+a[0], +a[1] - 1, +a[2]);
    }
    return new Date(+a[2], +a[1] - 1, +a[0]);
  }
  return new Date(clean);
}

export function formatDate(d: Date): string {
  const day = ('0' + d.getDate()).slice(-2);
  const month = ('0' + (d.getMonth() + 1)).slice(-2);
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

export function dueOf(o: { ad?: string; d: string }): string {
  const d = parseDate(o.ad || o.d);
  d.setDate(d.getDate() + PERIOD);
  return formatDate(d);
}

export interface LateCalculation {
  loan: number;
  days: number;
  perDay: number;
  fee: number;
  total: number;
}

export function lateInfo(o: LoanOrder, refDate?: Date): LateCalculation {
  const loan = num(o.amt);
  let days = 0;
  if (o.k === 'pend' || o.k === 'od') {
    const t = refDate ? new Date(refDate.getFullYear(), refDate.getMonth(), refDate.getDate()) : new Date();
    const todayZero = new Date(t.getFullYear(), t.getMonth(), t.getDate());
    const dueDate = parseDate(dueOf(o));
    days = Math.max(0, Math.round((todayZero.getTime() - dueDate.getTime()) / 86400000));
  }
  const perDay = Math.round(loan * LATE_RATE);
  const fee = perDay * days;
  return {
    loan,
    days,
    perDay,
    fee,
    total: loan + fee,
  };
}

export function kind(o: LoanOrder, refDate?: Date): 'pend' | 'rej' | 'paid' | 'rev' | 'od' | 'pp' {
  if (o.k === 'pend' || o.k === 'od') {
    return lateInfo(o, refDate).days > 0 ? 'od' : 'pend';
  }
  return o.k;
}

export function view(o: LoanOrder, refDate?: Date) {
  const k = kind(o, refDate);
  if (k === 'pend') {
    return {
      k,
      st: 'Pending Repayment',
      al: 'Repayment Amount',
      amt: o.amt,
      dl: 'Due Date',
      d: dueOf(o),
    };
  }
  if (k === 'od') {
    return {
      k,
      st: 'Overdue',
      al: 'Loan amount',
      amt: o.amt,
      dl: 'Application Date',
      d: o.ad || o.d,
    };
  }
  return {
    k,
    st: o.st,
    al: o.al,
    amt: o.amt,
    dl: o.dl,
    d: o.d,
  };
}

export const INITIAL_ORDERS: LoanOrder[] = [
  {
    n: 'Zen Money',
    ic: 'zen',
    st: 'Pending Repayment',
    k: 'pend',
    al: 'Repayment Amount',
    amt: '₹11,000',
    no: '47891020261023215813784521',
    dl: 'Due Date',
    d: '23/10/2026',
    ad: '23/10/2026',
  },
  {
    n: 'Rupee Express',
    ic: 'rupee',
    st: 'Pending Repayment',
    k: 'pend',
    al: 'Repayment Amount',
    amt: '₹8,800',
    no: '4789102026102509584670312',
    dl: 'Due Date',
    d: '25/10/2026',
    ad: '25/10/2026',
  },
  {
    n: 'Rupee Express',
    ic: 'rupee',
    st: 'Rejected',
    k: 'rej',
    al: 'Loan amount',
    amt: '₹8,000',
    no: '47891020261021165754510087',
    dl: 'Application Date',
    d: '21/10/2026',
  },
  {
    n: 'Insta Paisa',
    ic: 'insta',
    st: 'Rejected',
    k: 'rej',
    al: 'Loan amount',
    amt: '₹7,800',
    no: '4789102026102509584780455',
    dl: 'Application Date',
    d: '25/10/2026',
  },
  {
    n: 'Giga Money',
    ic: 'giga',
    st: 'Rejected',
    k: 'rej',
    al: 'Loan amount',
    amt: '₹4,300',
    no: '4789102026102509584730219',
    dl: 'Application Date',
    d: '25/10/2026',
  },
  {
    n: 'Trust Wallet',
    ic: 'trust',
    st: 'Rejected',
    k: 'rej',
    al: 'Loan amount',
    amt: '₹4,300',
    no: '4789102026102116580850231',
    dl: 'Application Date',
    d: '21/10/2026',
  },
  {
    n: 'Pocket Credit',
    ic: 'pocket',
    st: 'Repaid',
    k: 'paid',
    al: 'Loan amount',
    amt: '₹4,300',
    no: '4789102026100609102030877',
    dl: 'Application Date',
    d: '06/10/2026',
  },
  {
    n: 'Nova Loan',
    ic: 'nova',
    st: 'Repaid',
    k: 'paid',
    al: 'Loan amount',
    amt: '₹4,300',
    no: '4789102026100609102140563',
    dl: 'Application Date',
    d: '06/10/2026',
  },
  {
    n: 'Nova Loan',
    ic: 'nova',
    st: 'Under Review',
    k: 'rev',
    al: 'Loan amount',
    amt: '₹7,000',
    no: '4789102026102116575284410',
    dl: 'Application Date',
    d: '21/10/2026',
  },
  {
    n: 'Joy Wallet',
    ic: 'joy',
    st: 'Under Review',
    k: 'rev',
    al: 'Loan amount',
    amt: '₹7,000',
    no: '47891020261021165759123',
    dl: 'Application Date',
    d: '21/10/2026',
  },
];

export const STATUS_DETAILS: Record<string, { t: string; msg: string }> = {
  pend: { t: 'Pending Repayment', msg: '' },
  rej: { t: 'Rejected', msg: 'sorry,application quota is full,please come back tomorrow!' },
  paid: { t: 'Repaid', msg: 'Your repayment has been successfully completed' },
  pp: { t: 'Pending Payment', msg: 'Will be paid to your account within 1 working day.' },
  rev: { t: 'Under Review', msg: 'Your loan application is currently under manual risk evaluation. Results will be notified soon.' },
  od: { t: 'Overdue', msg: 'Your repayment is overdue. A late fee of 7% of the loan amount is added every day.' },
};
