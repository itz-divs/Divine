import { motion } from 'framer-motion';
import { FaCalendarCheck, FaPhoneAlt, FaChevronDown } from 'react-icons/fa';

const Hero = () => {
  const words = "Your Health, Our Priority".split(" ");

  const handleScrollTarget = (e, targetId) => {
    e.preventDefault();
    const el = document.querySelector(targetId);
    if(el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      background: 'linear-gradient(135deg, var(--color-lightest) 0%, var(--color-mid) 100%)',
      position: 'relative',
      padding: '4rem 0'
    }}>
      <div className="container grid grid-cols-2 md:grid-cols-1 items-center gap-6">
        {/* Left Content */}
        <div style={{ zIndex: 2 }}>
          <div className="flex gap-2" style={{ marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <span style={{ padding: '4px 12px', background: 'rgba(255,255,255,0.7)', borderRadius: '20px', fontSize: 'var(--text-xs)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>🏥 24/7 ICU</span>
            <span style={{ padding: '4px 12px', background: 'rgba(255,255,255,0.7)', borderRadius: '20px', fontSize: 'var(--text-xs)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>👨‍⚕️ Expert Doctors</span>
            <span style={{ padding: '4px 12px', background: 'rgba(255,255,255,0.7)', borderRadius: '20px', fontSize: 'var(--text-xs)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>🩺 Multispecialty</span>
          </div>

          <h1 className="font-serif text-5xl" style={{ lineHeight: 1.2, marginBottom: '1rem', color: 'var(--color-text)' }}>
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{ display: 'inline-block', marginRight: '0.25em' }}
              >
                {word}
              </motion.span>
            ))}
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg"
            style={{ marginBottom: '2rem', color: 'var(--color-text)', opacity: 0.8, maxWidth: '500px' }}
          >
            Providing world-class 24/7 multispecialty healthcare, ICU, and surgical excellence right here in Palanpur, Gujarat.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex gap-4 flex-wrap"
          >
            <a href="#appointment" onClick={(e) => handleScrollTarget(e, '#appointment')} className="btn btn-primary text-base">
              <FaCalendarCheck /> Book Appointment
            </a>
            <a href="tel:+919099113388" className="btn btn-outline text-base">
              <FaPhoneAlt /> Emergency Call
            </a>
          </motion.div>
        </div>

        {/* Right Content / Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
          style={{ position: 'relative', zIndex: 1 }}
        >
           <div style={{
             width: '100%',
             maxWidth: '500px',
             aspectRatio: '1',
             background: 'radial-gradient(circle, var(--color-light) 0%, transparent 70%)',
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center',
             borderRadius: '50%',
             position: 'relative'
           }}>
             {/* Using a placeholder aesthetic visual since actual SVG is missing, using CSS shapes to mock an abstract hospital icon */}
             <div style={{
               width: '200px',
               height: '200px',
               background: 'var(--color-white)',
               borderRadius: '30px',
               boxShadow: 'var(--shadow-hover)',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               position: 'relative'
             }}>
               <div style={{ position: 'absolute', width: '40px', height: '120px', backgroundColor: 'var(--color-accent)', borderRadius: '20px' }}></div>
               <div style={{ position: 'absolute', width: '120px', height: '40px', backgroundColor: 'var(--color-accent)', borderRadius: '20px' }}></div>
             </div>
             
             {/* Floating elements */}
             <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }} style={{ position: 'absolute', top: '10%', right: '15%', fontSize: '2rem', background: '#fff', borderRadius: '50%', padding: '10px', boxShadow: 'var(--shadow-soft)'}}>🩺</motion.div>
             <motion.div animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 1 }} style={{ position: 'absolute', bottom: '15%', left: '10%', fontSize: '2rem', background: '#fff', borderRadius: '50%', padding: '10px', boxShadow: 'var(--shadow-soft)'}}>💊</motion.div>
           </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'var(--color-accent)',
          fontSize: '1.5rem',
          zIndex: 2
        }}
      >
        <a href="#about" onClick={(e) => handleScrollTarget(e, '#about')}>
          <FaChevronDown />
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
