
import React, { useState } from 'react';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Input = ({ label, icon, ...props }) => (
  <div className="w-full space-y-1.5">
    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">{label}</label>
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors">{icon}</div>
      <input {...props} className="w-full glass rounded-2xl py-3.5 pl-12 pr-4 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all border-white/5" />
    </div>
  </div>
);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const { login,error, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
       await login(email, password);
       navigate("/")
    } catch (error) {
      toast.error("Invalid email or password", error);
    }
  }
  return (
     <div className="flex justify-center gap-2 mb-8">
            <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center">
        <h2 className="text-4xl font-extrabold tracking-tight">Welcome <span className="gradient-text">Back</span></h2>
        <p className="text-slate-400 text-sm mt-2">Enter your credentials to access your terminal.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input 
        label="Email Address" 
        type="email" 
        placeholder="name@example.com" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required icon={<Mail 
        size={20} />} />

        <Input 
        label="Password" 
        type="password" 
        placeholder="••••••••" 
        value={password} 
        autoComplete=""
        onChange={(e) => setPassword(e.target.value)} 
        required 
        icon={<Lock size={20} />} />
        
        {error && <p className="text-rose-400 text-xs text-center animate-pulse">{error}</p>}

        <button disabled={isLoading} className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-70 shadow-lg shadow-indigo-500/20">
          {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Authorize Access'}
        </button>
      </form>

      <div className="text-center pt-2">
        <button onClick={() => navigate('/register') } className="text-indigo-400 text-sm font-medium hover:text-indigo-300 transition-colors inline-flex items-center gap-1 group">
          Don't have and account? <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
     </div>

  );
};

export default Login;
