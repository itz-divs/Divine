import { useState, useRef, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import toast from 'react-hot-toast';
import {
  FaUser, FaPhone, FaEnvelope, FaCalendarAlt, FaClock, FaUserMd,
  FaCheck, FaArrowRight, FaArrowLeft, FaStethoscope, FaExclamationTriangle,
  FaRedo, FaGoogle, FaNotesMedical
} from 'react-icons/fa';
import GsapReveal from './ui/GsapReveal';
import { doctors } from '../data/doctors';
import { formatDate, getTodayDate, generateGoogleCalendarLink, getInitials } from '../utils/helpers';

const timeSlots = [
  'Morning (9 AM – 12 PM)',
  'Afternoon (12 PM – 4 PM)',
  'Evening (4 PM – 7 PM)',
];

/* ─────────────────── Progress Indicator ─────────────────── */
const ProgressBar = ({ currentStep }) => {
  const steps = ['Patient Details', 'Appointment', 'Confirmation'];
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2.5rem', gap: '0' }}>
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const isActive = stepNum === currentStep;
        const isCompleted = stepNum < currentStep;
        return (
          <div key={label} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '80px' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: 'var(--text-sm)',
                backgroundColor: isCompleted ? 'var(--color-accent)' : isActive ? 'var(--color-accent)' : 'var(--color-mid)',
                color: isCompleted || isActive ? '#fff' : 'var(--color-text)',
                transition: 'var(--transition)',
                boxShadow: isActive ? '0 0 0 4px rgba(201, 181, 156, 0.3)' : 'none',
              }}>
                {isCompleted ? <FaCheck size={14} /> : stepNum}
              </div>
              <span style={{
                fontSize: 'var(--text-xs)', fontWeight: isActive ? 600 : 400,
                color: isActive ? 'var(--color-accent)' : 'var(--color-text)',
                marginTop: '6px', opacity: isActive ? 1 : 0.6,
                whiteSpace: 'nowrap',
              }}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div style={{
                width: '60px', height: '3px', borderRadius: '2px',
                backgroundColor: isCompleted ? 'var(--color-accent)' : 'var(--color-mid)',
                transition: 'var(--transition)', marginBottom: '22px',
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
};

/* ─────────────────── Step 1: Patient Details ─────────────────── */
const Step1 = ({ register, errors }) => (
  <div className="flex flex-col gap-4">
    <div className="form-group" style={{ marginBottom: 0 }}>
      <label className="form-label" htmlFor="apt-name">
        <FaUser style={{ display: 'inline', marginRight: '6px', opacity: 0.6 }} />Full Name *
      </label>
      <input
        id="apt-name"
        {...register('name', { required: 'Full name is required' })}
        className="form-control"
        placeholder="Enter your full name"
        aria-required="true"
      />
      {errors.name && <span className="text-xs color-emergency" style={{ marginTop: '4px', display: 'block' }}>{errors.name.message}</span>}
    </div>

    <div className="grid grid-cols-2 md:grid-cols-1" style={{ gap: '1rem' }}>
      <div className="form-group" style={{ marginBottom: 0 }}>
        <label className="form-label" htmlFor="apt-phone">
          <FaPhone style={{ display: 'inline', marginRight: '6px', opacity: 0.6 }} />Phone Number *
        </label>
        <input
          id="apt-phone"
          type="tel"
          {...register('phone', {
            required: 'Phone number is required',
            pattern: { value: /^[6-9]\d{9}$/, message: 'Enter a valid 10-digit mobile number' }
          })}
          className="form-control"
          placeholder="e.g. 9876543210"
          aria-required="true"
        />
        {errors.phone && <span className="text-xs color-emergency" style={{ marginTop: '4px', display: 'block' }}>{errors.phone.message}</span>}
      </div>

      <div className="form-group" style={{ marginBottom: 0 }}>
        <label className="form-label" htmlFor="apt-email">
          <FaEnvelope style={{ display: 'inline', marginRight: '6px', opacity: 0.6 }} />Email Address *
        </label>
        <input
          id="apt-email"
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address' }
          })}
          className="form-control"
          placeholder="you@example.com"
          aria-required="true"
        />
        {errors.email && <span className="text-xs color-emergency" style={{ marginTop: '4px', display: 'block' }}>{errors.email.message}</span>}
      </div>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-1" style={{ gap: '1rem' }}>
      <div className="form-group" style={{ marginBottom: 0 }}>
        <label className="form-label" htmlFor="apt-age">Age *</label>
        <input
          id="apt-age"
          type="number"
          {...register('age', {
            required: 'Age is required',
            min: { value: 1, message: 'Age must be at least 1' },
            max: { value: 120, message: 'Please enter a valid age' }
          })}
          className="form-control"
          placeholder="e.g. 35"
          min="1" max="120"
          aria-required="true"
        />
        {errors.age && <span className="text-xs color-emergency" style={{ marginTop: '4px', display: 'block' }}>{errors.age.message}</span>}
      </div>

      <div className="form-group" style={{ marginBottom: 0 }}>
        <label className="form-label" htmlFor="apt-gender">Gender *</label>
        <select
          id="apt-gender"
          {...register('gender', { required: 'Please select your gender' })}
          className="form-control"
          aria-required="true"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {errors.gender && <span className="text-xs color-emergency" style={{ marginTop: '4px', display: 'block' }}>{errors.gender.message}</span>}
      </div>
    </div>
  </div>
);

/* ─────────────────── Step 2: Appointment Details ─────────────────── */
const Step2 = ({ register, errors, watch }) => {
  const selectedDoctor = watch('doctor');

  return (
    <div className="flex flex-col gap-4">
      {/* Doctor Selection */}
      <div className="form-group" style={{ marginBottom: 0 }}>
        <label className="form-label" htmlFor="apt-doctor">
          <FaUserMd style={{ display: 'inline', marginRight: '6px', opacity: 0.6 }} />Select Doctor *
        </label>
        <select
          id="apt-doctor"
          {...register('doctor', { required: 'Please select a doctor' })}
          className="form-control"
          aria-required="true"
          style={{ paddingRight: '2rem' }}
        >
          <option value="">Choose a Doctor</option>
          {doctors.map((doc) => (
            <option key={doc.name} value={doc.name}>
              {doc.initials} — {doc.name} | {doc.dept} ({doc.specialty})
            </option>
          ))}
        </select>
        {errors.doctor && <span className="text-xs color-emergency" style={{ marginTop: '4px', display: 'block' }}>{errors.doctor.message}</span>}
      </div>

      {/* Selected Doctor Card Preview */}
      {selectedDoctor && (() => {
        const doc = doctors.find(d => d.name === selectedDoctor);
        if (!doc) return null;
        return (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '1rem',
            padding: '1rem', borderRadius: '12px',
            backgroundColor: 'var(--color-light)',
            border: '1px solid var(--color-mid)',
          }}>
            <div style={{
              width: '50px', height: '50px', borderRadius: '50%', flexShrink: 0,
              background: 'linear-gradient(135deg, var(--color-mid) 0%, var(--color-accent) 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.1rem', color: '#fff', fontWeight: 700,
            }}>
              {doc.initials}
            </div>
            <div>
              <p style={{ fontWeight: 600, marginBottom: '2px' }}>{doc.name}</p>
              <p className="text-xs" style={{ opacity: 0.7 }}>{doc.dept} — {doc.specialty}</p>
            </div>
          </div>
        );
      })()}

      {/* Date & Time */}
      <div className="grid grid-cols-2 md:grid-cols-1" style={{ gap: '1rem' }}>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label" htmlFor="apt-date">
            <FaCalendarAlt style={{ display: 'inline', marginRight: '6px', opacity: 0.6 }} />Preferred Date *
          </label>
          <input
            id="apt-date"
            type="date"
            {...register('date', { required: 'Please select a date' })}
            className="form-control"
            min={getTodayDate()}
            aria-required="true"
          />
          {errors.date && <span className="text-xs color-emergency" style={{ marginTop: '4px', display: 'block' }}>{errors.date.message}</span>}
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label" htmlFor="apt-timeslot">
            <FaClock style={{ display: 'inline', marginRight: '6px', opacity: 0.6 }} />Time Slot *
          </label>
          <select
            id="apt-timeslot"
            {...register('timeSlot', { required: 'Please select a time slot' })}
            className="form-control"
            aria-required="true"
          >
            <option value="">Select Time Slot</option>
            {timeSlots.map(slot => <option key={slot} value={slot}>{slot}</option>)}
          </select>
          {errors.timeSlot && <span className="text-xs color-emergency" style={{ marginTop: '4px', display: 'block' }}>{errors.timeSlot.message}</span>}
        </div>
      </div>

      {/* Reason */}
      <div className="form-group" style={{ marginBottom: 0 }}>
        <label className="form-label" htmlFor="apt-reason">
          <FaNotesMedical style={{ display: 'inline', marginRight: '6px', opacity: 0.6 }} />Reason / Chief Complaint
        </label>
        <textarea
          id="apt-reason"
          {...register('reason')}
          className="form-control"
          rows="3"
          placeholder="Briefly describe your symptoms or reason for visit (optional)"
        />
      </div>
    </div>
  );
};

/* ─────────────────── Step 3: Confirmation ─────────────────── */
const SummaryRow = ({ icon, label, value }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '8px 0' }}>
    <span style={{ color: 'var(--color-accent)', marginTop: '3px', flexShrink: 0 }}>{icon}</span>
    <div>
      <p className="text-xs" style={{ opacity: 0.6, marginBottom: '2px' }}>{label}</p>
      <p style={{ fontWeight: 500 }}>{value || '—'}</p>
    </div>
  </div>
);

const Step3Summary = ({ data }) => {
  const doc = doctors.find(d => d.name === data.doctor);
  return (
    <div style={{
      backgroundColor: 'var(--color-light)', borderRadius: '12px',
      padding: '1.5rem', border: '1px solid var(--color-mid)',
    }}>
      <h4 className="font-serif text-xl" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <FaStethoscope style={{ color: 'var(--color-accent)' }} /> Booking Summary
      </h4>
      <div style={{ borderTop: '1px solid var(--color-mid)', paddingTop: '0.75rem' }}>
        <SummaryRow icon={<FaUser size={14} />} label="Patient Name" value={data.name} />
        <SummaryRow icon={<FaPhone size={14} />} label="Phone" value={data.phone} />
        <SummaryRow icon={<FaEnvelope size={14} />} label="Email" value={data.email} />
        <SummaryRow icon={<FaUser size={14} />} label="Age / Gender" value={`${data.age} years, ${data.gender}`} />
        <div style={{ borderTop: '1px solid var(--color-mid)', marginTop: '8px', paddingTop: '8px' }} />
        <SummaryRow icon={<FaUserMd size={14} />} label="Doctor" value={doc ? `${doc.name} (${doc.dept})` : data.doctor} />
        <SummaryRow icon={<FaCalendarAlt size={14} />} label="Date" value={formatDate(data.date)} />
        <SummaryRow icon={<FaClock size={14} />} label="Time Slot" value={data.timeSlot} />
        {data.reason && <SummaryRow icon={<FaNotesMedical size={14} />} label="Reason" value={data.reason} />}
      </div>
    </div>
  );
};

/* ─────────────────── Success Screen ─────────────────── */
const SuccessScreen = ({ refNumber, data, onReset }) => {
  const calendarLink = generateGoogleCalendarLink({
    doctorName: data.doctor,
    date: data.date,
    timeSlot: data.timeSlot,
    patientName: data.name,
  });

  return (
    <div className="text-center flex flex-col items-center" style={{ padding: '2rem 0' }}>
      <div style={{
        width: '80px', height: '80px', borderRadius: '50%',
        backgroundColor: 'var(--color-accent)', display: 'flex',
        alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem',
        boxShadow: '0 0 0 8px rgba(201, 181, 156, 0.2)',
      }}>
        <FaCheck size={32} color="#fff" />
      </div>
      <h3 className="font-serif text-3xl" style={{ marginBottom: '0.5rem', color: 'var(--color-text)' }}>
        Appointment Confirmed!
      </h3>
      <p className="text-base" style={{ opacity: 0.7, marginBottom: '1.5rem', maxWidth: '400px' }}>
        Your appointment has been booked successfully. A confirmation email has been sent to <strong>{data.email}</strong>.
      </p>

      <div style={{
        backgroundColor: 'var(--color-light)', padding: '1rem 2rem',
        borderRadius: '12px', marginBottom: '1.5rem', border: '1px solid var(--color-mid)',
      }}>
        <p className="text-xs" style={{ opacity: 0.6, marginBottom: '4px' }}>Reference Number</p>
        <p className="font-serif text-2xl" style={{ fontWeight: 700, color: 'var(--color-accent)', letterSpacing: '2px' }}>
          {refNumber}
        </p>
      </div>

      <div className="flex gap-4" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
        <a
          href={calendarLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
          style={{
            backgroundColor: 'var(--color-light)', color: 'var(--color-text)',
            border: '1px solid var(--color-mid)', gap: '8px',
          }}
        >
          <FaGoogle /> Add to Calendar
        </a>
        <button onClick={onReset} className="btn btn-primary">
          Book Another Appointment
        </button>
      </div>
    </div>
  );
};

/* ─────────────────── Error Screen ─────────────────── */
const ErrorScreen = ({ onRetry }) => (
  <div className="text-center flex flex-col items-center" style={{ padding: '2rem 0' }}>
    <div style={{
      width: '80px', height: '80px', borderRadius: '50%',
      backgroundColor: 'var(--color-emergency)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem',
      opacity: 0.9,
    }}>
      <FaExclamationTriangle size={32} color="#fff" />
    </div>
    <h3 className="font-serif text-2xl" style={{ marginBottom: '0.5rem' }}>Something Went Wrong</h3>
    <p className="text-base" style={{ opacity: 0.7, marginBottom: '1.5rem', maxWidth: '400px' }}>
      We couldn't send your appointment request. Please check your connection and try again.
    </p>
    <button onClick={onRetry} className="btn btn-primary" style={{ gap: '8px' }}>
      <FaRedo /> Try Again
    </button>
  </div>
);

/* ═══════════════════ MAIN COMPONENT ═══════════════════ */
const BookAppointment = () => {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [refNumber, setRefNumber] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  const formRef = useRef(null);
  const stepContainerRef = useRef(null);

  const { register, handleSubmit, watch, trigger, getValues, reset, formState: { errors } } = useForm({
    mode: 'onTouched',
  });

  // GSAP step transition
  const animateStepTransition = useCallback((direction = 'forward') => {
    if (!stepContainerRef.current) return;
    const xFrom = direction === 'forward' ? 60 : -60;
    gsap.fromTo(stepContainerRef.current,
      { opacity: 0, x: xFrom },
      { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
    );
  }, []);

  const handleNext = async () => {
    let fieldsToValidate = [];
    if (step === 1) fieldsToValidate = ['name', 'phone', 'email', 'age', 'gender'];
    if (step === 2) fieldsToValidate = ['doctor', 'date', 'timeSlot'];

    const isValid = await trigger(fieldsToValidate);
    if (!isValid) return;

    setStep(prev => prev + 1);
    setTimeout(() => animateStepTransition('forward'), 0);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
    setTimeout(() => animateStepTransition('back'), 0);
  };

  const handleConfirmBooking = async () => {
    const data = getValues();
    setStatus('submitting');
    setSubmittedData(data);

    try {
      const response = await fetch('/api/send-appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      let result;
      try {
        result = await response.json();
      } catch {
        // Server returned non-JSON (e.g. 502 Bad Gateway)
        throw new Error(`Server error (${response.status}). Make sure the backend server is running.`);
      }

      if (response.ok && result.success) {
        setRefNumber(result.referenceNumber);
        setStatus('success');
        toast.success('Appointment confirmed! Check your email.', {
          style: { border: '1px solid var(--color-accent)', padding: '16px', color: 'var(--color-text)' },
          iconTheme: { primary: 'var(--color-accent)', secondary: '#fff' },
        });
      } else {
        throw new Error(result.error || 'Failed to send appointment');
      }
    } catch (err) {
      console.error('Appointment error:', err);
      setStatus('error');
      toast.error(err.message || 'Failed to book appointment. Please try again.', {
        style: { border: '1px solid var(--color-emergency)', padding: '16px', color: 'var(--color-text)' },
      });
    }
  };

  const handleRetry = () => {
    setStatus('idle');
    // Stay on step 3 so they can re-confirm
  };

  const handleFullReset = () => {
    reset();
    setStep(1);
    setStatus('idle');
    setRefNumber('');
    setSubmittedData(null);
  };

  return (
    <section id="appointment" className="section-padding" style={{ backgroundColor: 'var(--color-mid)' }}>
      <div className="container" style={{ maxWidth: '720px' }}>
        <GsapReveal>
          <div className="text-center" style={{ marginBottom: '2rem' }}>
            <span className="font-sans color-accent text-sm font-bold" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
              Schedule a Visit
            </span>
            <h2 className="text-4xl" style={{ marginTop: '0.5rem' }}>Book an Appointment</h2>
            <p style={{ opacity: 0.7, marginTop: '0.5rem' }}>
              Fill out the form below and our reception team will confirm your slot.
            </p>
          </div>
        </GsapReveal>

        <GsapReveal delay={0.15}>
          <div className="card" style={{ padding: '2.5rem', overflow: 'hidden' }} ref={formRef}>

            {/* ── Success or Error ── */}
            {status === 'success' && (
              <SuccessScreen refNumber={refNumber} data={submittedData} onReset={handleFullReset} />
            )}
            {status === 'error' && (
              <ErrorScreen onRetry={handleRetry} />
            )}

            {/* ── Form Steps ── */}
            {(status === 'idle' || status === 'submitting') && (
              <>
                <ProgressBar currentStep={step} />

                <div ref={stepContainerRef}>
                  <form onSubmit={handleSubmit(() => {})} noValidate>
                    {step === 1 && <Step1 register={register} errors={errors} />}
                    {step === 2 && <Step2 register={register} errors={errors} watch={watch} />}
                    {step === 3 && <Step3Summary data={getValues()} />}
                  </form>
                </div>

                {/* ── Navigation Buttons ── */}
                <div style={{
                  display: 'flex', justifyContent: step === 1 ? 'flex-end' : 'space-between',
                  marginTop: '2rem', gap: '1rem', flexWrap: 'wrap',
                }}>
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="btn"
                      disabled={status === 'submitting'}
                      style={{
                        backgroundColor: 'var(--color-light)', color: 'var(--color-text)',
                        border: '1px solid var(--color-mid)', gap: '6px',
                      }}
                    >
                      <FaArrowLeft size={12} /> Back
                    </button>
                  )}

                  {step < 3 && (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="btn btn-primary"
                      style={{ gap: '6px', marginLeft: 'auto' }}
                    >
                      Next <FaArrowRight size={12} />
                    </button>
                  )}

                  {step === 3 && (
                    <button
                      type="button"
                      onClick={handleConfirmBooking}
                      className="btn btn-primary"
                      disabled={status === 'submitting'}
                      style={{
                        gap: '6px', marginLeft: 'auto',
                        opacity: status === 'submitting' ? 0.7 : 1,
                        minWidth: '180px',
                      }}
                    >
                      {status === 'submitting' ? (
                        <>Confirming...</>
                      ) : (
                        <><FaCheck size={12} /> Confirm Booking</>
                      )}
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </GsapReveal>

        {/* Emergency Contact */}
        <GsapReveal delay={0.3}>
          <div style={{
            textAlign: 'center', marginTop: '1.5rem', padding: '1rem',
            backgroundColor: 'var(--color-light)', borderRadius: 'var(--border-radius)',
          }}>
            <strong>Emergency?</strong> Call us directly at{' '}
            <a href="tel:+919099113388" className="color-emergency" style={{ fontWeight: 700 }}>
              +91 90991 13388
            </a>
          </div>
        </GsapReveal>
      </div>
    </section>
  );
};

export default BookAppointment;
