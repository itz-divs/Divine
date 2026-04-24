import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { doctors } from '../data/doctors';
import GsapReveal from './ui/GsapReveal';

const Doctors = () => {
  const [filter, setFilter] = useState('All');

  const filters = ['All', 'Physician', 'Quality/General', 'Laparoscopic Surgery', 'Orthopaedic'];

  // Map filters, since doctor depts might vary in string matching 
  const filteredDoctors = doctors.filter(doc => {
    if (filter === 'All') return true;
    if (filter === 'Quality/General' && doc.dept === 'General Surgery') return true;
    return doc.dept === filter;
  });

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
            {filteredDoctors.map((doc, idx) => {
              // Generate Initials
              const initials = doc.name.replace('Dr. ', '').split(' ').map(n=>n[0]).join('');
              
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={doc.name}
                  className="card text-center flex flex-col items-center"
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
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Doctors;
