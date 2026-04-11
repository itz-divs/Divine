import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const Counter = ({ end, duration = 2, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      let startTime = null;
      const animateC = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = currentTime - startTime;
        const rate = Math.min(progress / (duration * 1000), 1);
        
        // Easing function out expo
        const easeOutExpo = rate === 1 ? 1 : 1 - Math.pow(2, -10 * rate);
        
        setCount(Math.floor(easeOutExpo * end));

        if (rate < 1) {
          requestAnimationFrame(animateC);
        }
      };
      requestAnimationFrame(animateC);
    }
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
};

const StatsBar = () => {
  const stats = [
    { value: 10, suffix: '+', label: 'Years of Service', is247: false },
    { value: 5000, suffix: '+', label: 'Patients Treated', is247: false },
    { value: 8, suffix: '', label: 'Specialist Doctors', is247: false },
    { value: 0, suffix: '24/7', label: 'Emergency Care', is247: true },
  ];

  return (
    <section style={{ backgroundColor: 'var(--color-mid)', padding: '3rem 0' }}>
      <div className="container grid grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6 text-center">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            style={{ padding: '1rem' }}
          >
            <h3 className="font-serif color-accent" style={{ fontSize: 'var(--text-4xl)', marginBottom: '0.5rem' }}>
              {stat.is247 ? (
                <span>24/7</span>
              ) : (
                <Counter end={stat.value} suffix={stat.suffix} />
              )}
            </h3>
            <p className="font-sans text-base font-medium" style={{ color: 'var(--color-text)' }}>
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatsBar;
