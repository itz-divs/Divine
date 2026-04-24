const express = require('express');
const { Resend } = require('resend');
const { getPatientEmailHtml, getAdminEmailHtml } = require('../emailTemplates.cjs');

const router = express.Router();

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'divineicu@gmail.com';
const FROM_EMAIL = process.env.FROM_EMAIL || 'Divine Health Care <onboarding@resend.dev>';

/**
 * Generates a unique appointment reference number.
 * Format: APT-XXXXXX
 */
function generateRefNumber() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'APT-';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Formats a date string for display in emails.
 */
function formatDateForEmail(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Generates a Google Calendar deep-link.
 */
function generateCalendarLink({ doctor, date, timeSlot, name }) {
  const timeMap = {
    'Morning (9 AM – 12 PM)': { start: '0900', end: '1200' },
    'Afternoon (12 PM – 4 PM)': { start: '1200', end: '1600' },
    'Evening (4 PM – 7 PM)': { start: '1600', end: '1900' },
  };
  const slot = timeMap[timeSlot] || { start: '0900', end: '1000' };
  const datePart = date.replace(/-/g, '');
  const startDT = `${datePart}T${slot.start}00`;
  const endDT = `${datePart}T${slot.end}00`;
  const title = encodeURIComponent(`Appointment with ${doctor} — Divine Health Care`);
  const details = encodeURIComponent(`Patient: ${name}\nDoctor: ${doctor}\nTime Slot: ${timeSlot}`);
  const location = encodeURIComponent('Divine Health Care & ICU, E-2 Medipolis, Deesa Highway, Palanpur, Gujarat');
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDT}/${endDT}&details=${details}&location=${location}`;
}

/**
 * POST /api/send-appointment
 */
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, age, gender, doctor, date, timeSlot, reason } = req.body;

    // ── Server-side validation ──
    const errors = [];
    if (!name || !name.trim()) errors.push('Patient name is required');
    if (!phone || !/^[6-9]\d{9}$/.test(phone)) errors.push('Valid 10-digit phone number is required');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Valid email is required');
    if (!age || age < 1 || age > 120) errors.push('Valid age is required');
    if (!gender) errors.push('Gender is required');
    if (!doctor) errors.push('Doctor selection is required');
    if (!date) errors.push('Appointment date is required');
    if (!timeSlot) errors.push('Time slot is required');

    if (errors.length > 0) {
      return res.status(400).json({ success: false, error: errors.join(', ') });
    }

    // ── Generate reference number ──
    const referenceNumber = generateRefNumber();
    const formattedDate = formatDateForEmail(date);
    const calendarLink = generateCalendarLink({ doctor, date, timeSlot, name });

    // ── Prepare email data ──
    const emailData = {
      name, phone, email, age, gender, doctor,
      date: formattedDate,
      timeSlot, reason,
      referenceNumber, calendarLink,
    };

    // ── Send both emails concurrently ──
    const [patientResult, adminResult] = await Promise.allSettled([
      // Email 1: To the Patient
      resend.emails.send({
        from: FROM_EMAIL,
        to: [email],
        subject: `Appointment Confirmed — ${doctor} | Divine Health Care & ICU`,
        html: getPatientEmailHtml(emailData),
      }),

      // Email 2: To the Admin
      resend.emails.send({
        from: FROM_EMAIL,
        to: [ADMIN_EMAIL],
        subject: `New Appointment: ${name} — ${formattedDate}`,
        html: getAdminEmailHtml(emailData),
      }),
    ]);

    // Log results for debugging
    console.log(`[${referenceNumber}] Patient email:`, patientResult.status, patientResult.value?.data || patientResult.reason);
    console.log(`[${referenceNumber}] Admin email:`, adminResult.status, adminResult.value?.data || adminResult.reason);

    // Even if admin email fails, patient booking is successful
    if (patientResult.status === 'rejected') {
      throw new Error('Failed to send patient confirmation email');
    }

    return res.json({ success: true, referenceNumber });

  } catch (error) {
    console.error('Appointment API Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to process appointment. Please try again.',
    });
  }
});

module.exports = router;
