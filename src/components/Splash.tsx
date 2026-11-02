import React, { useEffect, useState } from 'react';

interface SplashProps {
  onFinished: () => void;
}

export const Splash: React.FC<SplashProps> = ({ onFinished }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setFadeOut(true);
    }, 1800);

    const timer2 = setTimeout(() => {
      setRemoved(true);
      onFinished();
    }, 2250);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onFinished]);

  if (removed) return null;

  return (
    <div id="splash" className={fadeOut ? 'out' : ''} aria-hidden={fadeOut}>
      <div className="logo">SKN</div>
      <div className="sname">Sasural ka nati</div>
    </div>
  );
};
