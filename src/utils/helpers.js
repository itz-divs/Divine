/**
 * Utility helpers for the appointment booking flow.
 */

/**
 * Generates a unique appointment reference number.
 * Format: APT-XXXXXX (6 alphanumeric characters)
 */
export const generateRefNumber = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'APT-';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Formats a date string (YYYY-MM-DD) into a human-readable format.
 * e.g., "2026-04-25" → "Friday, 25 April 2026"
 */
export const formatDate = (dateStr) => {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Generates a Google Calendar deep-link for the appointment.
 */
export const generateGoogleCalendarLink = ({ doctorName, date, timeSlot, patientName }) => {
  const timeMap = {
    'Morning (9 AM – 12 PM)': { start: '09:00', end: '12:00' },
    'Afternoon (12 PM – 4 PM)': { start: '12:00', end: '16:00' },
    'Evening (4 PM – 7 PM)': { start: '16:00', end: '19:00' },
  };

  const slot = timeMap[timeSlot] || { start: '09:00', end: '10:00' };

  // Format: YYYYMMDDTHHMMSS (local time, no Z suffix)
  const startDT = date.replace(/-/g, '') + 'T' + slot.start.replace(':', '') + '00';
  const endDT = date.replace(/-/g, '') + 'T' + slot.end.replace(':', '') + '00';

  const title = encodeURIComponent(`Appointment with ${doctorName} — Divine Health Care`);
  const details = encodeURIComponent(
    `Patient: ${patientName}\nDoctor: ${doctorName}\nTime Slot: ${timeSlot}\n\nPlease bring your ID and any previous medical reports.`
  );
  const location = encodeURIComponent('Divine Health Care & ICU, E-2 Medipolis, New Doctor House, Deesa Highway, Palanpur, Gujarat');

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDT}/${endDT}&details=${details}&location=${location}&sf=true&output=xml`;
};

/**
 * Gets the 2-letter initials from a doctor's name.
 * e.g., "Dr. Nirav Purohit" → "NP"
 */
export const getInitials = (name) => {
  return name
    .replace('Dr. ', '')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Gets today's date in YYYY-MM-DD format for min date on date picker.
 */
export const getTodayDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};
