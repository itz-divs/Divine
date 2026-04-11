import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { testimonials } from '../data/testimonials';

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => setCurrent((current + 1) % testimonials.length);
  const handlePrev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-lightest)' }}>
      <div className="container relative">
        <div className="text-center" style={{ marginBottom: '3rem' }}>
          <h2 className="text-4xl">Patient Testimonials</h2>
          <p className="mt-2 opacity-80">What our community says about us.</p>
        </div>

        <div className="flex justify-center" style={{ minHeight: '280px', position: 'relative' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="card text-center"
              style={{
                width: '100%',
                maxWidth: '700px',
                padding: '3rem',
                backgroundColor: 'var(--color-light)',
                position: 'absolute'
              }}
            >
              <FaQuoteLeft style={{ fontSize: '2.5rem', color: 'var(--color-accent)', opacity: 0.3, margin: '0 auto 1.5rem auto' }} />
              
              <p className="font-serif text-xl" style={{ lineHeight: 1.6, marginBottom: '1.5rem', color: 'var(--color-text)' }}>
                "{testimonials[current].quote}"
              </p>
              
              <div className="flex justify-center gap-1 mb-2">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <FaStar key={i} style={{ color: 'var(--color-accent)' }} />
                ))}
              </div>
              
              <h4 className="font-bold text-lg">{testimonials[current].name}</h4>
              <p className="text-sm opacity-70">Patient</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mt-6">
          <button onClick={handlePrev} className="btn" style={{ padding: '0.75rem', borderRadius: '50%', backgroundColor: 'var(--color-mid)', color: 'var(--color-text)' }}>
            <FaChevronLeft />
          </button>
          <button onClick={handleNext} className="btn" style={{ padding: '0.75rem', borderRadius: '50%', backgroundColor: 'var(--color-mid)', color: 'var(--color-text)' }}>
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
