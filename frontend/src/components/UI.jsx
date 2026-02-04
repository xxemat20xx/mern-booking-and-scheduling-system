import { Loader2, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';



export const Input = ({ label, icon, ...props }) => (
  <div className="w-full space-y-1.5">
    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">{label}</label>
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors">{icon}</div>
      <input {...props} className="w-full glass rounded-2xl py-3.5 pl-12 pr-4 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all border-white/5" />
    </div>
  </div>
);

export const Button = ({ children, isLoading, ...props }) => (
  <button {...props} disabled={isLoading} className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-70 shadow-lg shadow-indigo-500/20">
    {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : children}
  </button>
);

export const SuccessView = () => {
    const navigate = useNavigate();
    return(
            <div className="flex flex-col items-center text-center space-y-6 py-6 animate-in fade-in zoom-in duration-700">
      <div className="relative p-6 rounded-full glass border-emerald-500/20">
        <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full" />
        <CheckCircle size={48} className="text-emerald-400" />
      </div>
      <div className="space-y-2">
        <h2 className="text-3xl font-extrabold gradient-text">Welcome Aboard!</h2>
        <p className="text-slate-400 text-sm max-w-[280px]">Your identity is verified and encrypted.</p>
      </div>
      <button
        onClick={() => navigate('/login')}
      >Go to Login Page</button>
    </div>
    )
};