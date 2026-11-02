import React from 'react';

interface NavigationProps {
  activeTab: 'home' | 'repay' | 'my';
  onSelectTab: (tab: 'home' | 'repay' | 'my') => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onSelectTab }) => {
  return (
    <nav className="bottom-nav" aria-label="Main Navigation">
      <button
        className={activeTab === 'home' ? 'on' : ''}
        onClick={() => onSelectTab('home')}
        aria-label="Home screen"
      >
        <svg viewBox="0 0 48 48">
          <path className="n1" d="M17 12Q24 4 31 12L29 17Q40 22 40 33Q40 42 24 42Q8 42 8 33Q8 22 19 17Z" />
          <ellipse className="n2" cx="34" cy="38" rx="10" ry="4" />
          <ellipse className="n3" cx="34" cy="34" rx="10" ry="4" />
          <rect className="n4" x="18" y="10" width="12" height="4" rx="2" />
        </svg>
        <span>Home</span>
      </button>

      <button
        className={activeTab === 'repay' ? 'on' : ''}
        onClick={() => onSelectTab('repay')}
        aria-label="Repay screen"
      >
        <svg viewBox="0 0 48 48">
          <rect className="r1i" x="20" y="6" width="20" height="30" rx="3" />
          <path className="r2i" d="M8 24h14v18H8z" />
          <path d="M14 36h12" stroke="#fff" strokeWidth="3" />
        </svg>
        <span>Repay</span>
      </button>

      <button
        className={activeTab === 'my' ? 'on' : ''}
        onClick={() => onSelectTab('my')}
        aria-label="My account screen"
      >
        <svg viewBox="0 0 48 48">
          <circle className="my" cx="24" cy="24" r="19" />
          <circle cx="18" cy="24" r="3" fill="#fff" />
          <circle cx="30" cy="24" r="3" fill="#fff" />
        </svg>
        <span>My</span>
      </button>
    </nav>
  );
};
