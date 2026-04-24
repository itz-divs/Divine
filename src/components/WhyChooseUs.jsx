import { FaCheckCircle } from 'react-icons/fa';
import GsapReveal from './ui/GsapReveal';

const WhyChooseUs = () => {

  const features = [
    "24×7 Emergency & ICU Facility",
    "Experienced Multispecialty Team",
    "Affordable & Transparent Pricing",
    "All Insurance Types Accepted"
  ];

  return (
    <section id="about" className="section-padding" style={{ backgroundColor: 'var(--color-light)' }}>
      <div className="container grid grid-cols-2 md:grid-cols-1 items-center gap-6">
        {/* Left: Text Content */}
        <GsapReveal>
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
              <GsapReveal 
                key={i}
                delay={i * 0.15 + 0.3}
                duration={0.4}
                className="flex items-center gap-4 text-lg font-medium"
              >
                <FaCheckCircle className="color-accent" style={{ fontSize: '1.25rem' }} />
                {feature}
              </GsapReveal>
            ))}
          </ul>
        </GsapReveal>

        {/* Right: Visual */}
        <GsapReveal
          delay={0.2}
          duration={0.7}
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
             {/* Doctor's Photo */}
             <img 
               src="/images/why_choose_us_doctors_1775934201605.png" 
               alt="Dedicated team of doctors" 
               style={{
                 width: '100%',
                 height: '100%',
                 objectFit: 'cover',
                 position: 'absolute',
                 top: 0,
                 left: 0,
                 zIndex: 0
               }} 
             />
             <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '2rem', background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', color: 'white', zIndex: 1, textAlign: 'center' }}>
               <h3 className="font-serif text-2xl" style={{ color: '#fff' }}>Trust in Excellence</h3>
               <p className="mt-2 opacity-90">Serving the Palanpur community with dedication.</p>
             </div>
           </div>
        </GsapReveal>
      </div>
    </section>
  );
};

export default WhyChooseUs;
