import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaTimes, FaClock, FaLanguage, FaBriefcaseMedical,
  FaCheckCircle, FaCalendarAlt, FaUserMd
} from 'react-icons/fa';
import { doctors } from '../data/doctors';
import GsapReveal from './ui/GsapReveal';

/* ─────────────────── Doctor Profile Modal ─────────────────── */
const DoctorProfileModal = ({ doctor, onClose }) => {
  if (!doctor) return null;

  const initials = doctor.initials || doctor.name.replace('Dr. ', '').split(' ').map(n => n[0]).join('');

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
      aria-label={`Profile of ${doctor.name}`}
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
          maxWidth: '600px',
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
          aria-label="Close profile"
          style={{
            position: 'absolute', top: '16px', right: '16px', zIndex: 10,
            width: '36px', height: '36px', borderRadius: '50%',
            backgroundColor: 'var(--color-light)', color: 'var(--color-text)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid var(--color-mid)',
          }}
        >
          <FaTimes size={14} />
        </button>

        {/* Header with gradient */}
        <div style={{
          background: 'linear-gradient(135deg, var(--color-deep-solid) 0%, var(--color-accent) 100%)',
          padding: '2.5rem 2rem 2rem',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          borderRadius: 'var(--border-radius) var(--border-radius) 0 0',
        }}>
          {/* Avatar */}
          <div style={{
            width: '100px', height: '100px', borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.2)',
            border: '3px solid rgba(255,255,255,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2.2rem', color: '#fff', fontWeight: 700,
            marginBottom: '1rem',
          }}>
            {initials}
          </div>
          <h3 className="font-serif text-2xl" style={{ color: '#fff', marginBottom: '4px', textAlign: 'center' }}>
            {doctor.name}
          </h3>
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: '#fff', padding: '4px 14px', borderRadius: '20px',
            fontSize: 'var(--text-xs)', fontWeight: 600, marginBottom: '0.5rem',
          }}>
            {doctor.dept}
          </div>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.8)', textAlign: 'center' }}>
            {doctor.specialty}
          </p>
        </div>

        {/* Body */}
        <div style={{ padding: '2rem' }}>

          {/* Quick stats row */}
          <div className="grid grid-cols-3 sm:grid-cols-1" style={{ gap: '0.75rem', marginBottom: '1.5rem' }}>
            {[
              { icon: <FaBriefcaseMedical size={16} />, label: 'Experience', value: doctor.experience },
              { icon: <FaLanguage size={16} />, label: 'Languages', value: doctor.languages?.join(', ') },
              { icon: <FaClock size={16} />, label: 'Schedule', value: null },
            ].map((stat, i) => (
              <div key={i} style={{
                backgroundColor: 'var(--color-lightest)',
                borderRadius: '12px', padding: '0.75rem',
                border: '1px solid var(--color-light)',
                textAlign: 'center',
              }}>
                <span style={{ color: 'var(--color-accent)', display: 'flex', justifyContent: 'center', marginBottom: '4px' }}>{stat.icon}</span>
                <p className="text-xs" style={{ opacity: 0.5, marginBottom: '2px' }}>{stat.label}</p>
                <p style={{ fontWeight: 600, fontSize: 'var(--text-xs)' }}>{stat.value || doctor.experience}</p>
              </div>
            ))}
          </div>

          {/* Schedule */}
          {doctor.schedule && (
            <div style={{
              backgroundColor: 'var(--color-lightest)', borderRadius: '12px',
              padding: '1rem', border: '1px solid var(--color-light)',
              marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px',
            }}>
              <FaCalendarAlt style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
              <div>
                <p className="text-xs" style={{ opacity: 0.5, marginBottom: '2px' }}>Consultation Hours</p>
                <p style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>{doctor.schedule}</p>
              </div>
            </div>
          )}

          {/* Bio */}
          {doctor.bio && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 className="font-serif text-lg" style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaUserMd style={{ color: 'var(--color-accent)' }} size={16} /> About
              </h4>
              <p className="text-sm" style={{ lineHeight: 1.7, opacity: 0.8 }}>{doctor.bio}</p>
            </div>
          )}

          {/* Specializations */}
          {doctor.specializations && doctor.specializations.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 className="font-serif text-lg" style={{ marginBottom: '0.75rem' }}>Key Specializations</h4>
              <div className="flex flex-col gap-2">
                {doctor.specializations.map((spec, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '6px 0',
                  }}>
                    <FaCheckCircle size={14} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                    <span className="text-sm">{spec}</span>
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
            <FaCalendarAlt /> Book Appointment
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ═══════════════════ MAIN COMPONENT ═══════════════════ */
const Doctors = () => {
  const [filter, setFilter] = useState('All');
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const filters = ['All', 'Physician', 'Quality/General', 'Laparoscopic Surgery', 'Orthopaedic'];

  // Map filters, since doctor depts might vary in string matching 
  const filteredDoctors = doctors.filter(doc => {
    if (filter === 'All') return true;
    if (filter === 'Quality/General' && doc.dept === 'General Surgery') return true;
    return doc.dept === filter;
  });

  // Close modal on Escape key
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') setSelectedDoctor(null);
  };

  return (
    <section id="doctors" className="section-padding">
      <div className="container">
        <GsapReveal
           className="text-center"
           style={{ marginBottom: '3rem' }}
        >
          <h2 className="text-4xl">Meet Our Specialists</h2>
          <p className="mt-2 opacity-80">Highly qualified experts dedicated to your health.</p>
        </GsapReveal>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-4" style={{ marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '30px',
                backgroundColor: filter === f ? 'var(--color-accent)' : 'var(--color-light)',
                color: filter === f ? '#fff' : 'var(--color-text)',
                fontWeight: filter === f ? 600 : 500,
                border: '1px solid',
                borderColor: filter === f ? 'var(--color-accent)' : 'var(--color-mid)',
              }}
            >
              {f.replace('Quality/General', 'Surgeon')}
            </button>
          ))}
        </div>

        {/* Doctors Grid */}
        <motion.div layout className="grid grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
          <AnimatePresence>
            {filteredDoctors.map((doc) => {
              const initials = doc.initials || doc.name.replace('Dr. ', '').split(' ').map(n=>n[0]).join('');
              
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={doc.name}
                  className="card text-center flex flex-col items-center"
                  onClick={() => setSelectedDoctor(doc)}
                  onKeyDown={handleKeyDown}
                  tabIndex={0}
                  role="button"
                  aria-label={`View profile of ${doc.name}`}
                  style={{ cursor: 'pointer' }}
                >
                  <div style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--color-mid) 0%, var(--color-accent) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    color: '#fff',
                    marginBottom: '1rem',
                    fontWeight: 'bold',
                    boxShadow: 'var(--shadow-soft)'
                  }}>
                    {initials}
                  </div>
                  <h3 className="font-serif text-xl" style={{ marginBottom: '0.25rem' }}>{doc.name}</h3>
                  <div style={{
                    backgroundColor: 'var(--color-light)',
                    color: 'var(--color-accent)',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 600,
                    marginBottom: '0.5rem'
                  }}>
                    {doc.dept}
                  </div>
                  <p className="text-sm opacity-75">{doc.specialty}</p>
                  <span className="text-xs color-accent" style={{
                    marginTop: '0.75rem', fontWeight: 600,
                    borderBottom: '1px dashed var(--color-accent)',
                    paddingBottom: '2px',
                  }}>
                    View Profile →
                  </span>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Profile Modal */}
      <AnimatePresence>
        {selectedDoctor && (
          <DoctorProfileModal
            doctor={selectedDoctor}
            onClose={() => setSelectedDoctor(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Doctors;
