import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GsapReveal from './ui/GsapReveal';

gsap.registerPlugin(ScrollTrigger);

const Counter = ({ end, duration = 2, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const countObj = useRef({ val: 0 });

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: ref.current,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.to(countObj.current, {
          val: end,
          duration: duration,
          ease: "power2.out",
          onUpdate: () => {
            setCount(Math.floor(countObj.current.val));
          }
        });
      }
    });
  }, { scope: ref });

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
          <GsapReveal
            key={i}
            delay={i * 0.1}
            duration={0.5}
            y={20}
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
          </GsapReveal>
        ))}
      </div>
    </section>
  );
};

export default StatsBar;
