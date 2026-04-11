import { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaPhoneAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Doctors', href: '#doctors' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const element = document.querySelector(href);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // account for navbar height
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      width: '100%',
      zIndex: 50,
      backgroundColor: scrolled ? 'var(--color-white)' : 'var(--color-light)',
      boxShadow: scrolled ? 'var(--shadow-soft)' : 'none',
      transition: 'var(--transition)',
      padding: '1rem 0',
    }}>
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <a href="#home" onClick={(e) => handleScrollTo(e, '#home')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="font-serif color-accent text-2xl" style={{ fontWeight: 700 }}>✦ Divine</span>
          <div className="flex flex-col" style={{ lineHeight: 1.1 }}>
            <span className="font-sans font-bold" style={{ fontSize: 'var(--text-ms)', letterSpacing: '0.5px' }}>Health Care</span>
            <span className="font-sans color-emergency text-xs font-bold">& ICU</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <ul className="flex items-center gap-6" style={{ display: 'none' }} id="desktop-nav">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a href={link.href} onClick={(e) => handleScrollTo(e, link.href)} style={{
                fontWeight: 500,
                position: 'relative',
                textDecoration: 'none',
              }} className="nav-link">
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div style={{ display: 'none' }} id="desktop-cta">
          <a href="tel:+919099113388" className="btn" style={{
            backgroundColor: 'var(--color-accent)',
            color: '#fff',
          }}>
            <FaPhoneAlt /> +91 90991 13388
          </a>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} id="mobile-toggle" style={{ fontSize: '1.5rem', color: 'var(--color-text)' }}>
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              backgroundColor: 'var(--color-white)',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
            }}
          >
            <ul className="flex flex-col items-center gap-4" style={{ padding: '2rem 1rem' }}>
              {navLinks.map((link) => (
                <li key={link.name} style={{ width: '100%', textAlign: 'center' }}>
                  <a href={link.href} onClick={(e) => handleScrollTo(e, link.href)} style={{ display: 'block', padding: '0.5rem', fontWeight: 500 }}>
                    {link.name}
                  </a>
                </li>
              ))}
              <li style={{ marginTop: '1rem' }}>
                <a href="tel:+919099113388" className="btn btn-primary w-full flex justify-center">
                  <FaPhoneAlt /> Call Now
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx="true">{`
        @media (min-width: 1024px) {
          #desktop-nav, #desktop-cta { display: flex !important; }
          #mobile-toggle { display: none !important; }
        }
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -4px;
          left: 0;
          background-color: var(--color-accent);
          transition: width 0.3s ease;
        }
        .nav-link:hover::after, .nav-link.active::after {
          width: 100%;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
