
import React, { useState, useRef } from 'react';
import { Shield, Loader2 } from 'lucide-react';

const VerifyOtp = ({ email, onSuccess, isLoading, verify, error }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  return (
    <div className="w-full space-y-8">
      <div className="text-center">
        <div className="inline-flex p-3 rounded-full bg-indigo-500/10 text-indigo-400 mb-4">
          <Shield size={24} />
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight">Security <span className="gradient-text">Check</span></h2>
        <p className="text-slate-400 text-sm mt-2">Code sent to <span className="text-indigo-400">{email}</span></p>
      </div>
        <form
            onSubmit={async e => { e.preventDefault(); email && (await verify({ email, otp: otp.join('') })) && onSuccess(); }}
            className="space-y-8"
          >
        <div className="flex justify-between gap-2">
          {otp.map((digit, i) => (
            <input key={i} ref={el => { inputRefs.current[i] = el; }} type="text" inputMode="numeric" value={digit} onChange={e => handleChange(i, e.target.value)} onKeyDown={e => e.key === 'Backspace' && !otp[i] && inputRefs.current[i - 1]?.focus()} className="w-12 h-16 glass rounded-xl text-center text-2xl font-bold text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 border-white/5" />
          ))}
        </div>
        {error && <p className="text-center text-rose-400 text-sm animate-pulse">{error}</p>}
        <button disabled={isLoading} className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold transition-all disabled:opacity-70 shadow-lg shadow-indigo-500/20 flex items-center justify-center">
          {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Confirm Identity'}
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;
