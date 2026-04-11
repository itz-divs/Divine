import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const WhyChooseUs = () => {
  const { ref, controls, variants } = useScrollAnimation(0.3);

  const features = [
    "24×7 Emergency & ICU Facility",
    "Experienced Multispecialty Team",
    "Affordable & Transparent Pricing",
    "All Insurance Types Accepted"
  ];

  return (
    <section id="about" className="section-padding" style={{ backgroundColor: 'var(--color-light)' }}>
      <div className="container grid grid-cols-2 md:grid-cols-1 items-center gap-6" ref={ref}>
        {/* Left: Text Content */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={variants}
        >
          <span className="font-sans color-accent text-sm font-bold" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
            About Our Hospital
          </span>
          <h2 className="text-4xl" style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>
            Why Choose Us
          </h2>
          <p style={{ color: 'var(--color-text)', opacity: 0.8, marginBottom: '2rem', lineHeight: 1.6 }}>
            At Divine Health Care & ICU, we prioritize compassion and excellence. 
            Our facility is equipped with state-of-the-art infrastructure and a dedicated 
            team of specialists to provide you with the best possible treatment.
          </p>
          
          <ul className="flex flex-col gap-4">
            {features.map((feature, i) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 + 0.3, duration: 0.4 }}
                className="flex items-center gap-4 text-lg font-medium"
              >
                <FaCheckCircle className="color-accent" style={{ fontSize: '1.25rem' }} />
                {feature}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Right: Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center"
        >
           <div style={{
             width: '100%',
             maxWidth: '450px',
             aspectRatio: '3/4',
             backgroundColor: 'var(--color-mid)',
             borderRadius: 'var(--border-radius)',
             boxShadow: 'var(--shadow-hover)',
             position: 'relative',
             overflow: 'hidden'
           }}>
             {/* A placeholder for the image/illustration with nice soft curves */}
             <div style={{
               position: 'absolute',
               bottom: '-10%',
               right: '-10%',
               width: '80%',
               height: '80%',
               backgroundColor: 'var(--color-accent)',
               borderRadius: '50%',
               opacity: 0.2
             }}></div>
             <div style={{
               position: 'absolute',
               top: '10%',
               left: '-10%',
               width: '60%',
               height: '60%',
               backgroundColor: 'var(--color-white)',
               borderRadius: '50%',
               opacity: 0.4
             }}></div>
             
             <div className="flex flex-col items-center justify-center p-8 h-full text-center relative z-10">
               <span style={{ fontSize: '4rem', marginBottom: '1rem' }}>🤝</span>
               <h3 className="font-serif text-2xl color-text">Trust in Excellence</h3>
               <p className="mt-4 opacity-80">Serving the Palanpur community with dedication.</p>
             </div>
           </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
