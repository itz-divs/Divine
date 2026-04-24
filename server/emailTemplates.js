/**
 * HTML email templates for appointment confirmation emails.
 * Uses inline CSS with the clinic's brand colors.
 */

const BRAND = {
  accent: '#C9B59C',
  deep: '#8b755b',
  light: '#EFE9E3',
  lightest: '#F9F8F6',
  text: '#2d2d2d',
  white: '#ffffff',
  emergency: '#e53e3e',
};

const CLINIC = {
  name: 'Divine Health Care & ICU',
  address: 'E-2, Medipolis, New Doctor House, Deesa Highway, Palanpur, Gujarat',
  phone: '+91 90991 13388',
  email: 'info@divinehealth.co.in',
};

/**
 * Generates the patient confirmation email HTML.
 */
function getPatientEmailHtml({ name, phone, email, age, gender, doctor, date, timeSlot, reason, referenceNumber, calendarLink }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:${BRAND.lightest};font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:${BRAND.white};border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(139,117,91,0.15);">
  <!-- Header -->
  <tr>
    <td style="background:linear-gradient(135deg,${BRAND.deep},${BRAND.accent});padding:32px 24px;text-align:center;">
      <h1 style="color:${BRAND.white};margin:0;font-size:24px;font-weight:700;">✦ ${CLINIC.name}</h1>
      <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:14px;">Your Health, Our Priority</p>
    </td>
  </tr>

  <!-- Body -->
  <tr>
    <td style="padding:32px 24px;">
      <h2 style="color:${BRAND.text};margin:0 0 8px;font-size:22px;">Appointment Confirmed ✓</h2>
      <p style="color:${BRAND.text};opacity:0.7;margin:0 0 24px;font-size:15px;line-height:1.6;">
        Dear <strong>${name}</strong>, your appointment has been successfully booked. Here are your details:
      </p>

      <!-- Details Card -->
      <table width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.lightest};border-radius:12px;border:1px solid ${BRAND.light};margin-bottom:24px;">
        <tr><td style="padding:16px 20px;border-bottom:1px solid ${BRAND.light};">
          <p style="margin:0;font-size:12px;color:${BRAND.accent};text-transform:uppercase;letter-spacing:1px;font-weight:600;">Reference Number</p>
          <p style="margin:4px 0 0;font-size:22px;font-weight:700;color:${BRAND.deep};letter-spacing:2px;">${referenceNumber}</p>
        </td></tr>
        <tr><td style="padding:16px 20px;border-bottom:1px solid ${BRAND.light};">
          <p style="margin:0;font-size:12px;color:${BRAND.accent};font-weight:600;">DOCTOR</p>
          <p style="margin:4px 0 0;font-size:16px;font-weight:600;color:${BRAND.text};">${doctor}</p>
        </td></tr>
        <tr><td style="padding:16px 20px;border-bottom:1px solid ${BRAND.light};">
          <p style="margin:0;font-size:12px;color:${BRAND.accent};font-weight:600;">DATE</p>
          <p style="margin:4px 0 0;font-size:16px;color:${BRAND.text};">${date}</p>
        </td></tr>
        <tr><td style="padding:16px 20px;">
          <p style="margin:0;font-size:12px;color:${BRAND.accent};font-weight:600;">TIME SLOT</p>
          <p style="margin:4px 0 0;font-size:16px;color:${BRAND.text};">${timeSlot}</p>
        </td></tr>
      </table>

      <!-- Calendar Button -->
      ${calendarLink ? `
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
        <tr><td style="text-align:center;">
          <a href="${calendarLink}" target="_blank" style="display:inline-block;background:${BRAND.accent};color:${BRAND.white};padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">
            📅 Add to Google Calendar
          </a>
        </td></tr>
      </table>
      ` : ''}

      <!-- What to Bring -->
      <table width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.light};border-radius:12px;padding:0;margin-bottom:24px;">
        <tr><td style="padding:20px;">
          <h3 style="margin:0 0 12px;font-size:16px;color:${BRAND.text};">📋 What to Bring</h3>
          <ul style="margin:0;padding-left:20px;color:${BRAND.text};font-size:14px;line-height:2;">
            <li>Valid photo ID (Aadhaar / PAN / Driving License)</li>
            <li>Previous medical reports, if any</li>
            <li>Current medication list</li>
            <li>Insurance card, if applicable</li>
          </ul>
        </td></tr>
      </table>

      <!-- Clinic Info -->
      <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${BRAND.light};padding-top:16px;">
        <tr><td style="padding-top:16px;">
          <p style="margin:0;font-size:14px;color:${BRAND.text};line-height:1.8;">
            <strong>📍 ${CLINIC.address}</strong><br/>
            📞 <a href="tel:${CLINIC.phone}" style="color:${BRAND.deep};text-decoration:none;">${CLINIC.phone}</a>
          </p>
        </td></tr>
      </table>
    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td style="background:${BRAND.lightest};padding:20px 24px;text-align:center;border-top:1px solid ${BRAND.light};">
      <p style="margin:0;font-size:12px;color:${BRAND.text};opacity:0.5;">
        © ${new Date().getFullYear()} ${CLINIC.name}. All Rights Reserved.
      </p>
    </td>
  </tr>
</table>
</body>
</html>`;
}

/**
 * Generates the admin notification email HTML.
 */
function getAdminEmailHtml({ name, phone, email, age, gender, doctor, date, timeSlot, reason, referenceNumber }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:${BRAND.lightest};font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:${BRAND.white};border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(139,117,91,0.15);">
  <!-- Header -->
  <tr>
    <td style="background:${BRAND.deep};padding:24px;text-align:center;">
      <h1 style="color:${BRAND.white};margin:0;font-size:20px;">🔔 New Appointment Booking</h1>
      <p style="color:rgba(255,255,255,0.8);margin:6px 0 0;font-size:14px;">Reference: ${referenceNumber}</p>
    </td>
  </tr>

  <!-- Body -->
  <tr>
    <td style="padding:24px;">
      <h2 style="color:${BRAND.text};margin:0 0 16px;font-size:18px;">Patient Details</h2>
      <table width="100%" cellpadding="8" cellspacing="0" style="border:1px solid ${BRAND.light};border-radius:8px;font-size:14px;color:${BRAND.text};">
        <tr style="background:${BRAND.lightest};"><td style="font-weight:600;width:140px;">Name</td><td>${name}</td></tr>
        <tr><td style="font-weight:600;">Phone</td><td><a href="tel:${phone}" style="color:${BRAND.deep};">${phone}</a></td></tr>
        <tr style="background:${BRAND.lightest};"><td style="font-weight:600;">Email</td><td>${email}</td></tr>
        <tr><td style="font-weight:600;">Age / Gender</td><td>${age} years, ${gender}</td></tr>
      </table>

      <h2 style="color:${BRAND.text};margin:24px 0 16px;font-size:18px;">Appointment Details</h2>
      <table width="100%" cellpadding="8" cellspacing="0" style="border:1px solid ${BRAND.light};border-radius:8px;font-size:14px;color:${BRAND.text};">
        <tr style="background:${BRAND.lightest};"><td style="font-weight:600;width:140px;">Doctor</td><td>${doctor}</td></tr>
        <tr><td style="font-weight:600;">Date</td><td>${date}</td></tr>
        <tr style="background:${BRAND.lightest};"><td style="font-weight:600;">Time Slot</td><td>${timeSlot}</td></tr>
        <tr><td style="font-weight:600;">Reason</td><td>${reason || 'Not provided'}</td></tr>
      </table>
    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td style="background:${BRAND.lightest};padding:16px 24px;text-align:center;border-top:1px solid ${BRAND.light};">
      <p style="margin:0;font-size:12px;color:${BRAND.text};opacity:0.5;">Auto-generated by ${CLINIC.name} Booking System</p>
    </td>
  </tr>
</table>
</body>
</html>`;
}

module.exports = { getPatientEmailHtml, getAdminEmailHtml };
