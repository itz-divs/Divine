import { motion } from 'framer-motion';
import { services } from '../data/services';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import * as Icons from 'react-icons/fa';

const Services = () => {
  const { ref, controls, variants } = useScrollAnimation();

  return (
    <section id="services" className="section-padding">
      <div className="container" ref={ref}>
        <motion.div
          initial="hidden"
          animate={controls}
          variants={variants}
          className="text-center"
          style={{ marginBottom: '3rem' }}
        >
          <h2 className="text-4xl" style={{ color: 'var(--color-text)' }}>Our Specialties</h2>
          <p style={{ color: 'var(--color-text)', opacity: 0.8, marginTop: '1rem' }}>
            Comprehensive healthcare services tailored to your needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {services.map((service, index) => {
            const IconComponent = Icons[service.iconType] || Icons.FaHeartbeat;
            
            return (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } }
                }}
                className="card flex flex-col items-center text-center gap-4"
              >
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-accent)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.75rem',
                  marginBottom: '0.5rem'
                }}>
                  <IconComponent />
                </div>
                <h3 className="text-xl">{service.title}</h3>
                <p className="text-sm" style={{ color: 'var(--color-text)', opacity: 0.75 }}>
                  {service.description}
                </p>
                <a href="#appointment" style={{ 
                  color: 'var(--color-accent)', 
                  fontWeight: 600, 
                  marginTop: 'auto',
                  borderBottom: '1px solid transparent',
                  paddingBottom: '2px'
                }}
                onMouseOver={(e) => e.currentTarget.style.borderBottomColor = 'var(--color-accent)'}
                onMouseOut={(e) => e.currentTarget.style.borderBottomColor = 'transparent'}
                >
                  Learn More →
                </a>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
