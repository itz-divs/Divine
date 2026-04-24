import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { services } from '../data/services';
import GsapReveal from './ui/GsapReveal';
import * as Icons from 'react-icons/fa';
import {
  FaCheck, FaTimes, FaStethoscope, FaCogs, FaQuestionCircle,
  FaStar, FaUserMd, FaCalendarAlt, FaArrowRight, FaProcedures
} from 'react-icons/fa';

/* ─────────────────── Service Detail Modal ─────────────────── */
const ServiceDetailModal = ({ service, onClose }) => {
  if (!service) return null;

  const IconComponent = Icons[service.iconType] || Icons.FaHeartbeat;
  const info = service.detailedInfo || {};

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Details about ${service.title}`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'var(--color-white)',
          borderRadius: 'var(--border-radius)',
          maxWidth: '750px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 24px 80px rgba(0, 0, 0, 0.3)',
          position: 'relative',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close details"
          style={{
            position: 'absolute', top: '16px', right: '16px', zIndex: 10,
            width: '36px', height: '36px', borderRadius: '50%',
            backgroundColor: service.image ? 'rgba(0,0,0,0.4)' : 'var(--color-light)',
            color: service.image ? '#fff' : 'var(--color-text)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: 'none',
          }}
        >
          <FaTimes size={14} />
        </button>

        {/* Hero Image */}
        {service.image && (
          <div style={{
            width: '100%', height: '260px', overflow: 'hidden',
            borderRadius: 'var(--border-radius) var(--border-radius) 0 0',
            position: 'relative',
          }}>
            <img
              src={service.image}
              alt={service.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
              padding: '2rem 2rem 1.5rem',
              display: 'flex', alignItems: 'flex-end', gap: '12px',
            }}>
              <div style={{
                width: '52px', height: '52px', borderRadius: '14px', flexShrink: 0,
                backgroundColor: 'var(--color-accent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.4rem', color: '#fff',
              }}>
                <IconComponent />
              </div>
              <div>
                <h2 className="font-serif text-2xl" style={{ color: '#fff', marginBottom: '2px' }}>
                  {service.title}
                </h2>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  Divine Health Care & ICU — Palanpur
                </p>
              </div>
            </div>
          </div>
        )}

        {/* No-image header fallback */}
        {!service.image && (
          <div style={{
            background: 'linear-gradient(135deg, var(--color-deep-solid) 0%, var(--color-accent) 100%)',
            padding: '2.5rem 2rem',
            borderRadius: 'var(--border-radius) var(--border-radius) 0 0',
            display: 'flex', alignItems: 'center', gap: '16px',
          }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '14px',
              backgroundColor: 'rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.6rem', color: '#fff',
            }}>
              <IconComponent />
            </div>
            <h2 className="font-serif text-2xl" style={{ color: '#fff' }}>{service.title}</h2>
          </div>
        )}

        {/* Body */}
        <div style={{ padding: '2rem' }}>

          {/* Overview */}
          {info.overview && (
            <div style={{ marginBottom: '2rem' }}>
              <p className="text-base" style={{ lineHeight: 1.8, opacity: 0.85 }}>
                {info.overview}
              </p>
            </div>
          )}

          {/* Key Features Pills */}
          {service.features && (
            <div style={{ marginBottom: '2rem' }}>
              <SectionHeading icon={<FaStar size={15} />} title="Key Features" />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {service.features.map((f, i) => (
                  <span key={i} style={{
                    backgroundColor: 'var(--color-light)',
                    color: 'var(--color-text)',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 500,
                    border: '1px solid var(--color-mid)',
                    display: 'flex', alignItems: 'center', gap: '6px',
                  }}>
                    <FaCheck size={10} style={{ color: 'var(--color-accent)' }} /> {f}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Procedures */}
          {info.procedures && info.procedures.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <SectionHeading icon={<FaProcedures size={15} />} title="Procedures & Treatments" />
              <div className="grid grid-cols-2 md:grid-cols-1" style={{ gap: '6px' }}>
                {info.procedures.map((proc, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '8px 12px', borderRadius: '8px',
                    backgroundColor: i % 2 === 0 ? 'var(--color-lightest)' : 'transparent',
                  }}>
                    <FaArrowRight size={10} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                    <span className="text-sm">{proc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Equipment */}
          {info.equipment && info.equipment.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <SectionHeading icon={<FaCogs size={15} />} title="Equipment & Technology" />
              <div style={{
                backgroundColor: 'var(--color-lightest)', borderRadius: '12px',
                border: '1px solid var(--color-light)', padding: '1.25rem',
              }}>
                {info.equipment.map((eq, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '6px 0',
                    borderBottom: i < info.equipment.length - 1 ? '1px solid var(--color-light)' : 'none',
                  }}>
                    <span style={{
                      width: '6px', height: '6px', borderRadius: '50%',
                      backgroundColor: 'var(--color-accent)', flexShrink: 0,
                    }} />
                    <span className="text-sm">{eq}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Why Choose Us */}
          {info.whyChooseUs && info.whyChooseUs.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <SectionHeading icon={<FaStethoscope size={15} />} title="Why Choose Us" />
              <div className="flex flex-col gap-2">
                {info.whyChooseUs.map((reason, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: '10px',
                    padding: '6px 0',
                  }}>
                    <FaCheck size={12} style={{ color: 'var(--color-accent)', marginTop: '4px', flexShrink: 0 }} />
                    <span className="text-sm" style={{ lineHeight: 1.5 }}>{reason}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Doctors */}
          {info.relatedDoctors && info.relatedDoctors.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <SectionHeading icon={<FaUserMd size={15} />} title="Our Specialists" />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {info.relatedDoctors.map((name, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '10px 16px', borderRadius: '12px',
                    backgroundColor: 'var(--color-light)',
                    border: '1px solid var(--color-mid)',
                  }}>
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--color-mid), var(--color-accent))',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.8rem', color: '#fff', fontWeight: 700,
                    }}>
                      {name.replace('Dr. ', '').split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-sm" style={{ fontWeight: 600 }}>{name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQs */}
          {info.faqs && info.faqs.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <SectionHeading icon={<FaQuestionCircle size={15} />} title="Frequently Asked Questions" />
              <div className="flex flex-col" style={{ gap: '12px' }}>
                {info.faqs.map((faq, i) => (
                  <div key={i} style={{
                    backgroundColor: 'var(--color-lightest)',
                    borderRadius: '12px',
                    padding: '1rem 1.25rem',
                    border: '1px solid var(--color-light)',
                  }}>
                    <p style={{ fontWeight: 600, marginBottom: '6px', fontSize: 'var(--text-sm)' }}>
                      Q: {faq.q}
                    </p>
                    <p className="text-sm" style={{ opacity: 0.75, lineHeight: 1.6 }}>
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Book Appointment CTA */}
          <a
            href="#appointment"
            onClick={(e) => {
              e.preventDefault();
              onClose();
              setTimeout(() => {
                const el = document.querySelector('#appointment');
                if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
              }, 300);
            }}
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', gap: '8px', marginTop: '0.5rem' }}
          >
            <FaCalendarAlt /> Book Appointment for {service.title}
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─── Reusable Section Heading ─── */
const SectionHeading = ({ icon, title }) => (
  <h4 className="font-serif text-lg" style={{
    marginBottom: '0.75rem', display: 'flex',
    alignItems: 'center', gap: '8px',
    paddingBottom: '8px',
    borderBottom: '1px solid var(--color-light)',
  }}>
    <span style={{ color: 'var(--color-accent)' }}>{icon}</span> {title}
  </h4>
);

/* ═══════════════════ MAIN COMPONENT ═══════════════════ */
const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <section id="services" className="section-padding">
      <div className="container">
        <GsapReveal
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
        </GsapReveal>

        <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
          {services.map((service, index) => {
            const IconComponent = Icons[service.iconType] || Icons.FaHeartbeat;
            
            return (
              <GsapReveal
                key={index}
                delay={index * 0.1}
                y={30}
                duration={0.5}
                className="card flex flex-col items-start gap-4"
                style={{
                  padding: service.image ? '0' : '2rem',
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
                onClick={() => setSelectedService(service)}
              >
                {service.image && (
                  <div style={{ width: '100%', height: '200px', overflow: 'hidden' }}>
                    <img src={service.image} alt={service.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} />
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
                    {service.description.length > 160
                      ? service.description.substring(0, 160) + '...'
                      : service.description}
                  </p>

                  {/* Features / Bullets */}
                  {service.features && (
                    <ul className="flex flex-col gap-2 mt-2 w-full">
                      {service.features.slice(0, 3).map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm font-medium opacity-90">
                          <FaCheck className="color-accent" style={{ fontSize: '10px' }} />
                          {feature}
                        </li>
                      ))}
                      {service.features.length > 3 && (
                        <li className="text-xs color-accent" style={{ fontWeight: 600 }}>
                          +{service.features.length - 3} more...
                        </li>
                      )}
                    </ul>
                  )}

                  <span
                    className="text-sm color-accent"
                    style={{
                      fontWeight: 600, marginTop: 'auto',
                      borderBottom: '1px dashed var(--color-accent)',
                      paddingBottom: '2px',
                    }}
                  >
                    View Details →
                  </span>
                </div>
              </GsapReveal>
            )
          })}
        </div>
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <ServiceDetailModal
            service={selectedService}
            onClose={() => setSelectedService(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Services;
