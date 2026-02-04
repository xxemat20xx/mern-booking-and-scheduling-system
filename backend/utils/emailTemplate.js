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
