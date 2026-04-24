import { useState } from 'react';
import { useForm } from 'react-hook-form';
import GsapReveal from './ui/GsapReveal';
import toast from 'react-hot-toast';
import { doctors } from '../data/doctors';

const AppointmentForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const departments = ['Physician', 'General Surgery', 'Orthopaedic', 'ICU', 'Other'];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log(data);
    toast.success('Appointment Request Sent! We will contact you shortly.', {
      style: {
        border: '1px solid var(--color-accent)',
        padding: '16px',
        color: 'var(--color-text)',
      },
      iconTheme: {
        primary: 'var(--color-accent)',
        secondary: '#fff',
      },
    });
    
    setIsSubmitting(false);
    reset();
  };

  return (
    <section id="appointment" className="section-padding" style={{ backgroundColor: 'var(--color-mid)' }}>
      <div className="container grid grid-cols-2 md:grid-cols-1 items-center gap-8">
        
        <GsapReveal>
          <h2 className="text-4xl" style={{ marginBottom: '1rem' }}>Book an Appointment</h2>
          <p className="text-lg" style={{ opacity: 0.8, marginBottom: '2rem' }}>
            Schedule your visit with our expert doctors. Fill out the form and our reception team will confirm your slot within 30 minutes.
          </p>
          <div className="flex flex-col gap-4">
             <div className="card flex items-center justify-center p-4">
                <strong>Emergency Contact:</strong> &nbsp;
                <a href="tel:+919099113388" className="color-emergency font-bold">+91 90991 13388</a>
             </div>
          </div>
        </GsapReveal>

        <GsapReveal
           delay={0.2}
           className="card"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="form-group">
              <label className="form-label">Patient Name</label>
              <input 
                {...register("name", { required: 'Name is required' })} 
                className="form-control" 
                placeholder="Full Name"
              />
              {errors.name && <span className="text-xs color-emergency" style={{ marginTop: '4px', display:'block' }}>{errors.name.message}</span>}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
              <div className="form-group mb-0">
                <label className="form-label">Phone Number</label>
                <input 
                  type="tel"
                  {...register("phone", { required: 'Phone is required', pattern: { value: /^[0-9+\s]+$/, message: 'Invalid phone number' } })} 
                  className="form-control" 
                  placeholder="+91"
                />
                {errors.phone && <span className="text-xs color-emergency" style={{ marginTop: '4px', display:'block' }}>{errors.phone.message}</span>}
              </div>

              <div className="form-group mb-0">
                <label className="form-label">Preferred Date</label>
                <input 
                  type="date"
                  {...register("date", { required: 'Date is required' })} 
                  className="form-control" 
                />
                {errors.date && <span className="text-xs color-emergency" style={{ marginTop: '4px', display:'block' }}>{errors.date.message}</span>}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
              <div className="form-group mb-0">
                <label className="form-label">Department</label>
                <select className="form-control" {...register("department")}>
                  <option value="">Select Department (Optional)</option>
                  {departments.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              <div className="form-group mb-0">
                <label className="form-label">Doctor</label>
                <select className="form-control" {...register("doctor")}>
                  <option value="">Select Doctor (Optional)</option>
                  {doctors.map(d => <option key={d.name} value={d.name}>{d.name} - {d.specialty}</option>)}
                </select>
              </div>
            </div>

            <div className="form-group mb-0">
              <label className="form-label">Message / Symptoms</label>
              <textarea 
                {...register("message")} 
                className="form-control" 
                rows="3"
                placeholder="Briefly describe your symptoms or reason for visit"
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-full"
              disabled={isSubmitting}
              style={{ marginTop: '0.5rem', opacity: isSubmitting ? 0.7 : 1 }}
            >
              {isSubmitting ? 'Sending Request...' : 'Submit Request'}
            </button>
          </form>
        </GsapReveal>

      </div>
    </section>
  );
};

export default AppointmentForm;
