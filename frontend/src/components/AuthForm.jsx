import { useState, useRef } from "react"
import { useAuthStore } from '../store/useAuthStore'
import { Input, Button } from './UI';
import { Mail, Lock, Loader2, ArrowRight, User } from 'lucide-react';


const AuthForm = ({initial = 'login'}) => {
  const [mode, setMode ] = useState(initial);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const { isLoading, login, register, error, verifyOtp, forgotPassword } = useAuthStore();
    const handleChange = (index, value) => {
      const newOtp = [...otp];
      newOtp[index] = value.slice(-1);
      setOtp(newOtp);
      if (value && index < 5) inputRefs.current[index + 1]?.focus();
    };
    const clearData = () => {
      setEmail('');
      setName('');
      setPassword('');
      setOtp(Array(6).fill(''));
    }
    const handleLoginSubmit = async(e) => {
        e.preventDefault();
        try {
          await login(email, password);
          clearData();
        } catch (error) {
          console.error(error);
        }
    }
    const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ name, email, password });
      setMode('verify');
      setName('');
      setPassword('');
    } catch (error) {
      console.log(error);
    }
    };
    const handleOtpVerifySubmit = async (e) => {
      e.preventDefault();

      const otpCode = otp.join('');

      const success = await verifyOtp({
        email,
        otp: otpCode,
      });

      if (success) {
        setMode('login');
        clearData();
      }
    };
    const handleForgotSubmit = async(e) => {
      e.preventDefault();
      try {
        await forgotPassword({ email });
        clearData();
      } catch (error) {
        console.error(error)
      }
    }

  const renderLogin = () => (
      <div className="animate-fade-in space-y-6">
        <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white">Welcome back</h2>
        <p className="text-slate-400 mt-2">Enter your details to access your workspace.</p>
        
        </div>

        <form onSubmit={handleLoginSubmit} className="space-y-4">
                <Input 
                label="Email Address" 
                type="email" 
                placeholder="name@example.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                icon={<Mail size={20}/>} 
                
                />
            <div>
                <Input 
                label="Password" 
                type="password" 
                placeholder="••••••••" 
                value={password} 
                autoComplete=""
                onChange={(e) => setPassword(e.target.value)} 
                required 
                icon={<Lock size={20} />} />
            </div>
            <div className="flex justify-end mt-1">
            <button
              type="button"
              onClick={() => setMode('forgot')}
              className="text-slate-900 hover:text-slate-600 font-medium transform transition-all duration-500 cursor-pointer"
            >
              Forgot password?
            </button>               
            </div>
            <Button type="submit" fullWidth isLoading={isLoading} tone="light" bg="bg-slate-900 hover:bg-slate-800"
            >
            Sign In
            </Button>
            <p className="text-center text-sm text-slate-400 mt-6">
                Don't have an account?{' '}
                <button
                onClick={() => setMode('signup')}
                className="text-primary-400 hover:text-primary-300 font-medium hover:text-blue-700 duration-200 delay-150 transition-all transform"
                >
                Sign up
                </button>
            </p>
        </form>
    </div>
  );
  const renderSignup = () => (
    <div className="animate-fade-in space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white">Create an account</h2>
        <p className="text-slate-400 mt-2">Start your 14-day free trial. No credit card required.</p>
      </div>
        <form onSubmit={handleSignupSubmit} className="space-y-4">
                <Input 
                label="Name" 
                type="text" 
                placeholder="John Doe" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
                icon={<User size={20} 
                />} />
                <Input 
                label="Email Address" 
                type="email" 
                placeholder="name@example.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required icon={<Mail size={20} />} />
            <div>
                <Input 
                label="Password" 
                type="password" 
                placeholder="••••••••" 
                value={password} 
                autoComplete=""
                onChange={(e) => setPassword(e.target.value)} 
                required 
                icon={<Lock size={20} />} />
            </div>
            <div className="flex justify-end mt-1">               
            </div>
            <Button type="submit" fullWidth isLoading={isLoading} tone="light" bg="bg-slate-900 hover:bg-slate-700 duration-200 delay-150 transition-all transform cursor-pointer">
             Create Account
            </Button>
            <p className="text-center text-sm text-slate-400 mt-6">
                Don't have an account?{' '}
                <button
                onClick={() => setMode('login')}
                className="text-primary-400 hover:text-primary-300 font-medium hover:text-blue-600 transition-all duration-200 delay-150"
                >
                Login
                </button>
            </p>
        </form>      
    </div>
  );
  const renderForgot = () => (
    <div className="animate-fade-in space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Reset Password</h2>
        <p className="text-slate-400 mt-2">Enter your email and we'll send you a reset link.</p>
      </div>
      <form onSubmit={handleForgotSubmit} className="space-y-4">
                <Input 
                label="Email" 
                type="text" 
                placeholder="name@example.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required icon={<Mail 
                size={20} />} 
                className="text-slate-50"/>
                <Button
                type="submit"
                fullWidth
                isLoading={isLoading}
                variant="primary"
                bg="primary"
                tone="dark"
                >
                Send Reset Link
                </Button>
                <div className="flex items-center justify-center mt-6">
                  <button
                    onClick={() => setMode('login')}
                    className="flex items-center text-sm text-slate-900 hover:text-slate-700 font-medium transition-all duration-200 delay-150"
                  >
                    Back to Login
                    <ArrowRight className="ml-1" />
                  </button>
                </div>
      </form>
    </div>
  )
  const renderOtpVerify = () => (
    <div className="animate-fade-in space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900">OTP Verification</h2>
        <p className="text-sm text-slate-600">{email}</p>
        <span className="text-black mt-2">OTP was sent to the registered email.</span>
      <form onSubmit={handleOtpVerifySubmit} className="space-y-8">
        <div className="flex justify-between gap-2 my-4">
          {otp.map((digit, i) => (
            <input key={i} ref={el => { inputRefs.current[i] = el; }} type="text" inputMode="numeric" value={digit} onChange={e => handleChange(i, e.target.value)} onKeyDown={e => e.key === 'Backspace' && !otp[i] && inputRefs.current[i - 1]?.focus()} className="border w-12 h-16 glass rounded-xl text-center text-2xl font-bold text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 my-4" />
          ))}
        </div>
        {error && <p className="text-center text-rose-400 text-sm animate-pulse">{error}</p>}
        <button disabled={isLoading} className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold transition-all disabled:opacity-70 shadow-lg shadow-indigo-500/20 flex items-center justify-center">
          {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Confirm Identity'}
        </button>
      </form>
      </div>      
    </div>
  )
  return (
    <div className="w-full max-w-md mx-auto">
      {mode === 'login' && renderLogin()}
      {mode === 'signup' && renderSignup()}
      {mode === 'forgot' && renderForgot()}
      {mode === 'verify' && renderOtpVerify()}
    </div>
  )
}

export default AuthForm