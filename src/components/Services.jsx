import { motion } from 'framer-motion';
import { services } from '../data/services';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import * as Icons from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';

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
          <span className="font-sans color-accent text-sm font-bold" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
            Departments
          </span>
          <h2 className="text-4xl" style={{ marginTop: '0.5rem', color: 'var(--color-text)' }}>Our Specialties</h2>
          <p style={{ color: 'var(--color-text)', opacity: 0.8, marginTop: '1rem', maxWidth: '600px', margin: '1rem auto 0 auto' }}>
            Comprehensive healthcare services tailored to your needs. Explore specialized departments equipped with modern and advanced medical tech.
          </p>
        </motion.div>

        <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
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
                className="card flex flex-col items-start gap-4"
                style={{
                  padding: service.image ? '0' : '2rem',
                  overflow: 'hidden'
                }}
              >
                {service.image && (
                  <div style={{ width: '100%', height: '200px', overflow: 'hidden' }}>
                    <img src={service.image} alt={service.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
                
                <div className="flex flex-col items-start gap-4" style={{ padding: service.image ? '1.5rem' : '0', width: '100%' }}>
                  <div className="flex items-center gap-3">
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-light)',
                      color: 'var(--color-accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.25rem',
                    }}>
                      <IconComponent />
                    </div>
                    <h3 className="text-xl">{service.title}</h3>
                  </div>
                  
                  <p className="text-sm" style={{ color: 'var(--color-text)', opacity: 0.8, lineHeight: 1.6 }}>
                    {service.description}
                  </p>

                  {/* Features / Bullets */}
                  {service.features && (
                    <ul className="flex flex-col gap-2 mt-2 w-full">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm font-medium opacity-90">
                          <FaCheck className="color-accent" style={{ fontSize: '10px' }} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}

                  <a href="#appointment" style={{ 
                    color: 'var(--color-accent)', 
                    fontWeight: 600, 
                    marginTop: 'auto',
                    borderBottom: '1px solid transparent',
                    paddingBottom: '2px',
                    fontSize: 'var(--text-sm)'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.borderBottomColor = 'var(--color-accent)'}
                  onMouseOut={(e) => e.currentTarget.style.borderBottomColor = 'transparent'}
                  >
                    Learn More →
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
