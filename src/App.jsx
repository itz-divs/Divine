import React, { useState, useEffect, Suspense } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';

import EmergencyBanner from './components/EmergencyBanner';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Doctors from './components/Doctors';
import AppointmentForm from './components/AppointmentForm';
import Testimonials from './components/Testimonials';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

import Loader from './components/ui/Loader';
import FloatingAction from './components/ui/FloatingAction';
import ThemeToggle from './components/ui/ThemeToggle';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial page load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Divine Health Care & ICU | Palanpur</title>
        <meta name="description" content="Divine Health Care & ICU is a 24/7 multispecialty hospital in Palanpur, Gujarat. We offer world-class intensive care, surgical excellence, and expert doctors." />
        <meta name="keywords" content="Hospital Palanpur, Divine Health Care, ICU Palanpur, Best Doctors Palanpur, Multispecialty Hospital Gujarat" />
      </Helmet>

      <Loader isLoading={isLoading} />

      {!isLoading && (
        <div style={{ opacity: 1, transition: 'opacity 0.5s ease' }}>
          <EmergencyBanner />
          <Navbar />
          
          <main>
            <Hero />
            <StatsBar />
            <Services />
            <WhyChooseUs />
            <Doctors />
            <Testimonials />
            <AppointmentForm />
            <ContactSection />
          </main>
          
          <Footer />
          <FloatingAction />
          <ThemeToggle />
          
          <Toaster position="bottom-center" />
        </div>
      )}
    </HelmetProvider>
  );
}

export default App;
