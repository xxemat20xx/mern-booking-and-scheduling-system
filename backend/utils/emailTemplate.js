export const otpEmailTemplate = ({ name, otp }) => `
  <div style="font-family: Arial, sans-serif; background:#020617; padding:24px; color:#f8fafc">
    <h2 style="color:#818cf8;">Email Verification</h2>

    <p>Hi ${name},</p>

    <p>Use the OTP below to verify your email:</p>

    <div style="
      background:#0f172a;
      border-radius:12px;
      padding:16px;
      text-align:center;
      font-size:32px;
      font-weight:700;
      letter-spacing:8px;
      color:#c084fc;
    ">
      ${otp}
    </div>

    <p style="margin-top:16px;">
      This code expires in <strong>10 minutes</strong>.
    </p>

    <p style="font-size:12px;color:#94a3b8;margin-top:24px;">
      If you didn’t request this, ignore this email.
    </p>
  </div>
`;

export const bookingPendingEmailTemplate  = ({ name, serviceName, staffName, start, end  }) => `
  <div style="background-color:#f4f6f8;padding:24px;font-family:Arial,Helvetica,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;">
      
      <!-- Header -->
      <tr>
        <td style="background:#4f46e5;color:#ffffff;padding:20px 24px;">
          <h2 style="margin:0;font-size:20px;">Booking Pending</h2>
          <p style="margin:6px 0 0;font-size:14px;opacity:0.9;">
            We’re holding your spot ⏳
          </p>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:24px;color:#111827;">
          <p style="margin-top:0;font-size:15px;">
            Hi ${name|| "there"},
          </p>

          <p style="font-size:15px;">
            Your booking request has been received and is currently <strong>pending confirmation</strong>.
          </p>

          <table width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0;border:1px solid #e5e7eb;border-radius:6px;">
            <tr>
              <td style="padding:12px 16px;border-bottom:1px solid #e5e7eb;">
                <strong>Service</strong><br />
                ${serviceName}
              </td>
            </tr>
            <tr>
              <td style="padding:12px 16px;border-bottom:1px solid #e5e7eb;">
                <strong>Staff</strong><br />
                ${staffName}
              </td>
            </tr>
            <tr>
              <td style="padding:12px 16px;">
                <strong>Date & Time</strong><br />
                ${start.toLocaleString()} – ${end.toLocaleString()}
              </td>
            </tr>
          </table>

          <p style="font-size:14px;color:#4b5563;">
            You’ll receive another email once your booking is confirmed.
          </p>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#f9fafb;padding:16px 24px;font-size:12px;color:#6b7280;text-align:center;">
          © ${new Date().getFullYear()} Your Company Name<br />
          Please don’t reply to this email.
        </td>
      </tr>

    </table>
  </div>

`

export const confirmedBookingTemplate = ({name, serviceName, staffName, start, end}) => `
  <div style="background-color:#f4f6f8;padding:24px;font-family:Arial,Helvetica,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;">
      
      <!-- Header -->
      <tr>
        <td style="background:#16a34a;color:#ffffff;padding:20px 24px;">
          <h2 style="margin:0;font-size:20px;">Booking Confirmed</h2>
          <p style="margin:6px 0 0;font-size:14px;opacity:0.95;">
            Your booking is locked in ✅
          </p>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:24px;color:#111827;">
          <p style="margin-top:0;font-size:15px;">
            Hi ${name || "there"},
          </p>

          <p style="font-size:15px;">
            Great news! Your booking has been <strong>confirmed</strong>.
            We’re looking forward to seeing you.
          </p>

          <table width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0;border:1px solid #e5e7eb;border-radius:6px;">
            <tr>
              <td style="padding:12px 16px;border-bottom:1px solid #e5e7eb;">
                <strong>Service</strong><br />
                ${serviceName}
              </td>
            </tr>
            <tr>
              <td style="padding:12px 16px;border-bottom:1px solid #e5e7eb;">
                <strong>Staff</strong><br />
                ${staffName}
              </td>
            </tr>
            <tr>
              <td style="padding:12px 16px;">
                <strong>Date & Time</strong><br />
                ${start.toLocaleString()} – ${end.toLocaleString()}
              </td>
            </tr>
          </table>

          <p style="font-size:14px;color:#4b5563;">
            If you need to reschedule or cancel, please contact us ahead of time.
          </p>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#f9fafb;padding:16px 24px;font-size:12px;color:#6b7280;text-align:center;">
          © ${new Date().getFullYear()} Your Company Name<br />
          Please don’t reply to this email.
        </td>
      </tr>

    </table>
  </div>
  `