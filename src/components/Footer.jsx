import { FaPhoneAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'var(--color-deep-solid)', color: '#fff', paddingTop: '4rem', paddingBottom: '2rem' }}>
      <div className="container grid grid-cols-3 md:grid-cols-1 gap-8" style={{ marginBottom: '3rem' }}>
        
        {/* Col 1 */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="font-serif text-3xl font-bold">✦ Divine</span>
            <div className="flex flex-col" style={{ lineHeight: 1 }}>
              <span className="text-sm font-bold tracking-wide">Health Care</span>
              <span className="text-xs text-[#ffaaaa]"> & ICU</span>
            </div>
          </div>
          <p className="text-sm" style={{ opacity: 0.8, lineHeight: 1.6, maxWidth: '300px' }}>
            Your Health, Our Priority. Providing 24/7 world-class intensive care, surgical excellence, and multispecialty support.
          </p>
        </div>

        {/* Col 2 */}
        <div>
          <h4 className="text-xl font-bold mb-4 font-serif">Quick Links</h4>
          <ul className="flex flex-col gap-2 text-sm" style={{ opacity: 0.9 }}>
            <li><a href="#home" className="hover:underline">Home</a></li>
            <li><a href="#services" className="hover:underline">Services</a></li>
            <li><a href="#doctors" className="hover:underline">Doctors</a></li>
            <li><a href="#appointment" className="hover:underline">Book Appointment</a></li>
            <li><a href="#about" className="hover:underline">About Us</a></li>
          </ul>
        </div>

        {/* Col 3 */}
        <div>
          <h4 className="text-xl font-bold mb-4 font-serif">Emergency Contact</h4>
          <div className="flex items-center gap-2 mb-2 p-3 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
             <span className="pulse-dot" style={{ backgroundColor: '#ffaaaa' }}></span>
             <span className="font-bold">24/7 Emergency Line</span>
          </div>
          <a href="tel:+919099113388" className="text-2xl font-bold flex items-center gap-2" style={{ color: '#fff' }}>
             <FaPhoneAlt size={20} /> +91 90991 13388
          </a>
        </div>

      </div>

      <div className="container border-t pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <p className="text-center text-sm" style={{ opacity: 0.6 }}>
          © {new Date().getFullYear()} Divine Health Care & ICU. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
