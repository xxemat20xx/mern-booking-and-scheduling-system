import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function VerifyOtp({ email }) {
  const { verifyOtp } = useAuthStore();
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleVerify = async () => {
    const success = await verifyOtp(email, otp);
    if (success) {
      navigate("/login");
    }
  };

  return (
    <div>
      <h2>Verify Email</h2>

      <input
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <button onClick={handleVerify}>
        Verify
      </button>
    </div>
  );
}
