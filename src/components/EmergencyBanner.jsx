import { useState, useEffect } from 'react';
import { FaPhoneAlt, FaTimes } from 'react-icons/fa';

const EmergencyBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const dismissed = localStorage.getItem('emergencyBannerDismissed');
    if (dismissed === 'true') {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('emergencyBannerDismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div style={{
      backgroundColor: 'var(--color-mid)',
      color: 'var(--color-text)',
      padding: '0.5rem 1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: 'var(--text-sm)',
      fontWeight: '600',
      zIndex: 100,
      position: 'relative'
    }}>
      <div className="container flex items-center justify-center gap-2" style={{ width: '100%' }}>
        <span className="pulse-dot" style={{ marginRight: '8px' }}></span>
        <span>24/7 Emergency & ICU Available — Call </span>
        <a href="tel:+919099113388" className="color-emergency flex items-center gap-2" style={{ textDecoration: 'underline' }}>
          <FaPhoneAlt /> +91 90991 13388
        </a>
      </div>
      <button onClick={handleDismiss} style={{ padding: '4px', color: 'var(--color-text)' }} aria-label="Dismiss Emergency Banner">
        <FaTimes />
      </button>
    </div>
  );
};

export default EmergencyBanner;
