import React, { useState, useEffect } from 'react';
import { LoanOrder, INITIAL_ORDERS, lateInfo, money } from './utils/loan';
import { Splash } from './components/Splash';
import { Navigation } from './components/Navigation';
import { HomeScreen } from './components/HomeScreen';
import { NoProductScreen } from './components/NoProductScreen';
import { MyScreen } from './components/MyScreen';
import { CouponScreen } from './components/CouponScreen';
import { InfoScreen } from './components/InfoScreen';
import { PrivacyScreen } from './components/PrivacyScreen';
import { RepayScreen } from './components/RepayScreen';
import { OrdersScreen } from './components/OrdersScreen';
import { OrderDetailScreen } from './components/OrderDetailScreen';
import { RepaymentFlow } from './components/RepaymentFlow';
import { AdminPanel, AdminConfig } from './components/AdminPanel';
import {
  ContactModal,
  TipsModal,
  AmountSheet,
  LogoutModal,
  InfoViewerModal,
} from './components/Modals';

export type ViewType =
  | 'home'
  | 'nolist'
  | 'my'
  | 'coupon'
  | 'info'
  | 'privacy'
  | 'repay'
  | 'orders'
  | 'detail'
  | 'repay-flow'
  | 'admin';

export default function App() {
  const [view, setView] = useState<ViewType>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('admin') === '1' || window.location.pathname.includes('/admin')) {
        return 'admin';
      }
    }
    return 'home';
  });
  const [activeTab, setActiveTab] = useState<'home' | 'repay' | 'my'>('home');
  const [orders, setOrders] = useState<LoanOrder[]>(INITIAL_ORDERS);
  const [selectedOrderIndex, setSelectedOrderIndex] = useState<number>(0);
  const [ordersTitle, setOrdersTitle] = useState<string>('My Order');
  const [cameFrom, setCameFrom] = useState<'my' | 'repay'>('my');
  const [detailFrom, setDetailFrom] = useState<'orders' | 'repay'>('orders');

  // Repayment Flow state (new pages from user code)
  const [activeRepayOrder, setActiveRepayOrder] = useState<LoanOrder | null>(null);
  const [repayFlowOrigin, setRepayFlowOrigin] = useState<'repay' | 'detail'>('repay');

  // Admin configuration state (matches uploaded admin dashboard)
  const [adminConfig, setAdminConfig] = useState<AdminConfig>({
    appName: 'Zen Money',
    appLogo: 'Zen Money',
    customerName: 'BHAVIK KAMLESH SANGHVI',
    bankAddress: 'HDFC BANK, ANDHERI (W), MUMBAI',
    remainingAmount: 12540,
    loanAmount: 11000,
    paidAmount: 0,
    dueDate: '2026-11-02',
    receivedDate: '23-10-2026',
    upiId: 'kbin972-1@okhdfcbank',
    utrIcon: 'review',
    utrStatus: 'Under Review',
    linkTimeMinutes: 10,
  });

  // Check URL params for admin mode on initial load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === '1' || window.location.pathname.includes('/admin')) {
      setView('admin');
    }
  }, []);

  // Modals
  const [contactOpen, setContactOpen] = useState(false);
  const [tipsOpen, setTipsOpen] = useState(false);
  const [amountOrder, setAmountOrder] = useState<LoanOrder | null>(null);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [infoViewerType, setInfoViewerType] = useState<'bank' | 'basic' | 'kyc' | null>(null);

  // Toasts
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [gtoastMessage, setGtoastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 1600);
  };

  const showGtoast = (msg: string) => {
    setGtoastMessage(msg);
    setTimeout(() => {
      setGtoastMessage(null);
    }, 1600);
  };

  // Keyboard escape handler for modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setContactOpen(false);
        setTipsOpen(false);
        setAmountOrder(null);
        setLogoutOpen(false);
        setInfoViewerType(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Navigation handlers
  const handleSelectTab = (tab: 'home' | 'repay' | 'my') => {
    setActiveTab(tab);
    setView(tab);
    window.scrollTo(0, 0);
  };

  const handleGetCredit = () => {
    setView('nolist');
    window.scrollTo(0, 0);
  };

  const handleOpenOrders = (from: 'my' | 'repay', title: string) => {
    setCameFrom(from);
    setOrdersTitle(title);
    setView('orders');
    window.scrollTo(0, 0);
  };

  const handleOpenDetail = (index: number, from: 'orders' | 'repay') => {
    setSelectedOrderIndex(index);
    setDetailFrom(from);
    setView('detail');
    window.scrollTo(0, 0);
  };

  // Launching the new Repay Flow with the clicked product's exact details
  const handleRepayNow = (order: LoanOrder, origin: 'repay' | 'detail') => {
    setActiveRepayOrder(order);
    setRepayFlowOrigin(origin);
    setView('repay-flow');
    window.scrollTo(0, 0);
  };

  // Completing repayment when UTR is verified
  const handleRepaySuccess = (paidOrder: LoanOrder, amountPaid: number, utr: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.no === paidOrder.no) {
          return {
            ...o,
            st: 'Repaid',
            k: 'paid',
            al: 'Loan amount',
            repaidAt: new Date().toLocaleDateString('en-IN'),
          };
        }
        return o;
      })
    );

    showToast(`Payment of ₹${Number(amountPaid).toFixed(2)} verified (UTR: ${utr})!`);
    setActiveRepayOrder(null);
    setView('repay');
    setActiveTab('repay');
  };

  const handleInfoCardClick = (cardType: 'bank' | 'basic' | 'kyc') => {
    showGtoast('you can’t modify details🔒');
    setTimeout(() => {
      setInfoViewerType(cardType);
    }, 400);
  };

  const handleApplyAndOpenCustomer = (newConfig: AdminConfig) => {
    setAdminConfig(newConfig);

    const formatToSlash = (s: string) => {
      if (!s) return '02/11/2026';
      if (s.includes('/')) return s;
      const parts = s.split('-');
      if (parts[0].length === 4) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
      }
      return `${parts[0]}/${parts[1]}/${parts[2]}`;
    };

    setOrders((prev) => {
      const updated = [...prev];
      if (updated.length > 0) {
        updated[0] = {
          ...updated[0],
          n: newConfig.appName,
          amt: String(newConfig.remainingAmount),
          d: formatToSlash(newConfig.dueDate),
          ad: formatToSlash(newConfig.receivedDate),
        };
      }
      return updated;
    });
    showToast('Customer configuration applied!');
    setView('repay');
    setActiveTab('repay');
    window.scrollTo(0, 0);
  };

  const isNavVisible =
    (view === 'home' || view === 'nolist' || view === 'my' || view === 'repay') &&
    view !== 'admin';

  return (
    <>
      {view !== 'admin' && <Splash onFinished={() => {}} />}

      {/* Floating Mode Switcher for Quick Access */}
      <div className="fixed bottom-20 right-3 z-50 flex flex-col items-end gap-1 select-none">
        {view === 'admin' ? (
          <button
            type="button"
            id="switchToCustomerBtn"
            onClick={() => setView('repay')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900 text-white text-xs font-semibold shadow-lg hover:bg-neutral-800 active:scale-95 transition-all cursor-pointer border border-neutral-700"
          >
            <span>📱</span>
            <span>Customer View</span>
          </button>
        ) : (
          <button
            type="button"
            id="switchToAdminBtn"
            onClick={() => setView('admin')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-600 text-white text-xs font-semibold shadow-lg hover:bg-indigo-700 active:scale-95 transition-all cursor-pointer border border-indigo-400"
          >
            <span>⚙️</span>
            <span>Admin Panel</span>
          </button>
        )}
      </div>

      {view === 'admin' ? (
        <AdminPanel
          currentConfig={adminConfig}
          onUpdateConfig={(cfg) => setAdminConfig(cfg)}
          onApplyAndOpenCustomer={handleApplyAndOpenCustomer}
          onCloseAdmin={() => setView('repay')}
        />
      ) : view === 'repay-flow' && activeRepayOrder ? (
        <RepaymentFlow
          order={activeRepayOrder}
          adminConfig={adminConfig}
          onBack={() => {
            setView(repayFlowOrigin);
            window.scrollTo(0, 0);
          }}
          onPaymentSuccess={handleRepaySuccess}
        />
      ) : (
        <div id="app" className={`view-${view}`}>
          {view === 'home' && (
            <HomeScreen
              onGetCredit={handleGetCredit}
              onOpenContact={() => setContactOpen(true)}
            />
          )}

          {view === 'nolist' && (
            <NoProductScreen
              onBack={() => setView('home')}
              onOpenContact={() => setContactOpen(true)}
            />
          )}

          {view === 'my' && (
            <MyScreen
              onOpenOrders={() => handleOpenOrders('my', 'My Order')}
              onOpenInfo={() => setView('info')}
              onOpenCoupon={() => setView('coupon')}
              onOpenPrivacy={() => setView('privacy')}
              onOpenContact={() => setContactOpen(true)}
              onCheckUpdate={() => setTipsOpen(true)}
              onLogout={() => setLogoutOpen(true)}
            />
          )}

          {view === 'coupon' && (
            <CouponScreen
              onBack={() => setView('my')}
              onToast={showToast}
            />
          )}

          {view === 'info' && (
            <InfoScreen
              onBack={() => setView('my')}
              onCardClick={handleInfoCardClick}
            />
          )}

          {view === 'privacy' && (
            <PrivacyScreen onBack={() => setView('my')} />
          )}

          {view === 'repay' && (
            <RepayScreen
              orders={orders}
              onOpenOrderHistory={() => handleOpenOrders('repay', 'Order History')}
              onOpenDetail={(i) => handleOpenDetail(i, 'repay')}
              onOpenAmount={(o) => setAmountOrder(o)}
              onRepayNow={(o) => handleRepayNow(o, 'repay')}
            />
          )}

          {view === 'orders' && (
            <OrdersScreen
              orders={orders}
              title={ordersTitle}
              onBack={() => setView(cameFrom)}
              onOpenDetail={(i) => handleOpenDetail(i, 'orders')}
            />
          )}

          {view === 'detail' && orders[selectedOrderIndex] && (
            <OrderDetailScreen
              order={orders[selectedOrderIndex]}
              orderIndex={selectedOrderIndex}
              onBack={() => setView(detailFrom)}
              onOpenAmount={(o) => setAmountOrder(o)}
              onRepayNow={(o) => handleRepayNow(o, 'detail')}
            />
          )}
        </div>
      )}

      {isNavVisible && (
        <Navigation activeTab={activeTab} onSelectTab={handleSelectTab} />
      )}

      {/* Popups and Modals */}
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        onToast={showToast}
      />

      <TipsModal
        isOpen={tipsOpen}
        onClose={() => setTipsOpen(false)}
      />

      <AmountSheet
        isOpen={!!amountOrder}
        order={amountOrder}
        onClose={() => setAmountOrder(null)}
      />

      <LogoutModal
        isOpen={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        onConfirm={() => {
          setLogoutOpen(false);
          showToast('Logged out successfully');
          setView('home');
          setActiveTab('home');
        }}
      />

      <InfoViewerModal
        isOpen={!!infoViewerType}
        type={infoViewerType}
        onClose={() => setInfoViewerType(null)}
      />

      {/* Toast notifications */}
      <div id="toast" className={toastMessage ? 'on' : ''} role="status">
        {toastMessage}
      </div>
      <div id="gtoast" className={gtoastMessage ? 'on' : ''} role="status">
        {gtoastMessage}
      </div>
    </>
  );
}
