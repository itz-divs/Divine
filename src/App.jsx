import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';

import EmergencyBanner from './components/EmergencyBanner';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
const StatsBar = lazy(() => import('./components/StatsBar'));
const Services = lazy(() => import('./components/Services'));
const WhyChooseUs = lazy(() => import('./components/WhyChooseUs'));
const Doctors = lazy(() => import('./components/Doctors'));
const BookAppointment = lazy(() => import('./components/BookAppointment'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const ContactSection = lazy(() => import('./components/ContactSection'));
const Footer = lazy(() => import('./components/Footer'));

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
            <Suspense fallback={<Loader isLoading={true} />}>
              <StatsBar />
              <Services />
              <WhyChooseUs />
              <Doctors />
              <Testimonials />
              <BookAppointment />
              <ContactSection />
            </Suspense>
          </main>
          
          <Suspense fallback={null}>
            <Footer />
            <FloatingAction />
            <ThemeToggle />
          </Suspense>
          
          <Toaster position="bottom-center" />
        </div>
      )}
    </HelmetProvider>
  );
}

export default App;
