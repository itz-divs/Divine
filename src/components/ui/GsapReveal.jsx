import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const GsapReveal = ({
  children,
  className,
  style,
  delay = 0,
  duration = 0.6,
  y = 50,
  threshold = 0.2,
  ...rest
}) => {
  const ref = useRef(null);

  useGSAP(() => {
    if (!ref.current) return;
    
    gsap.fromTo(ref.current, 
      { opacity: 0, y: y },
      {
        opacity: 1, 
        y: 0,
        duration: duration,
        delay: delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: `top ${100 - (threshold * 100)}%`,
          once: true
        }
      }
    );
  }, { scope: ref });

  return (
    <div ref={ref} className={className} style={{ opacity: 0, ...style }} {...rest}>
      {children}
    </div>
  );
};

export default GsapReveal;
