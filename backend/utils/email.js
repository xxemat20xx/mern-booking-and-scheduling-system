import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (to, subject, html) => {
  try {
    const result = await resend.emails.send({
      from: "Verification Code <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    console.log("RESEND SUCCESS:", result);
    return result;
  } catch (error) {
    console.error("RESEND ERROR:", error);
    throw error; // bubble up to controller
  }
};
