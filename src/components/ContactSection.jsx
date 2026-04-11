import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaFacebookF } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ContactSection = () => {
  return (
    <section id="contact" className="section-padding" style={{ backgroundColor: 'var(--color-white)' }}>
      <div className="container grid grid-cols-2 md:grid-cols-1 gap-8 items-center">
        
        {/* Contact Info */}
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
        >
          <h2 className="text-4xl" style={{ marginBottom: '1.5rem' }}>Contact & Location</h2>
          
          <div className="flex flex-col gap-6 font-medium">
            <div className="flex items-start gap-4">
              <div style={{ padding: '12px', backgroundColor: 'var(--color-light)', borderRadius: '50%', color: 'var(--color-accent)' }}>
                <FaMapMarkerAlt size={20} />
              </div>
              <div>
                <h4 className="text-xl mb-1">Address</h4>
                <p className="opacity-80 leading-relaxed">
                  E-2, Medipolis, New Doctor House,<br />
                  Deesa Highway, Palanpur, Gujarat
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div style={{ padding: '12px', backgroundColor: 'var(--color-light)', borderRadius: '50%', color: 'var(--color-accent)' }}>
                <FaPhoneAlt size={20} />
              </div>
              <div>
                <h4 className="text-xl mb-1">Phone</h4>
                <a href="tel:+919099113388" className="opacity-80 color-accent hover:underline">
                  +91 90991 13388
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div style={{ padding: '12px', backgroundColor: 'var(--color-light)', borderRadius: '50%', color: 'var(--color-accent)' }}>
                <FaEnvelope size={20} />
              </div>
              <div>
                <h4 className="text-xl mb-1">Email</h4>
                <a href="mailto:info@divinehealth.co.in" className="opacity-80">
                  info@divinehealth.co.in
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div style={{ padding: '12px', backgroundColor: 'var(--color-light)', borderRadius: '50%', color: 'var(--color-accent)' }}>
                <FaClock size={20} />
              </div>
              <div>
                <h4 className="text-xl mb-1">Hours</h4>
                <p className="opacity-80 font-bold color-emergency">
                  Open 24×7, All Days
                </p>
              </div>
            </div>

            {/* Social */}
            <div className="mt-4 flex gap-4">
              <a href="#" aria-label="Facebook" style={{ padding: '12px', backgroundColor: '#1877F2', borderRadius: '50%', color: '#fff' }}>
                <FaFacebookF size={20} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Map */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           style={{ borderRadius: 'var(--border-radius)', overflow: 'hidden', height: '400px', boxShadow: 'var(--shadow-soft)' }}
        >
          <iframe 
            title="Divine Health Care Map Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3637.33!2d72.25!3d24.17!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDEwJzEyLjAiTiA3MsKwMTUnMDAuMCJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>

      </div>
    </section>
  );
};

export default ContactSection;
