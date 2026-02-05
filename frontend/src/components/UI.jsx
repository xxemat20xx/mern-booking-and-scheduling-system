import { Loader2, CheckCircle } from 'lucide-react';




export const Input = ({ label, icon, ...props }) => (
  <div className="w-full space-y-1.5">
    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">{label}</label>
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors">{icon}</div>
      <input {...props} className="text-slate-900 w-full glass rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all border-white/5" />
    </div>
  </div>
);

export const Button = ({
  children,
  variant = "primary",
  tone = "light",
  isLoading = false,
  fullWidth = false,
  className = "",
  disabled,
  bg, // optional raw Tailwind background classes
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center px-4 py-3 rounded-2xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-bg disabled:opacity-50 disabled:cursor-not-allowed";

  // Semantic variants
  const variants = {
    primary:
      "bg-primary-600 hover:bg-primary-500 shadow-lg shadow-primary-900/20 focus:ring-primary-500",
    secondary:
      "bg-dark-surface hover:bg-slate-700 border border-dark-border focus:ring-slate-500",
    outline:
      "bg-transparent border border-primary-500 hover:bg-primary-950 focus:ring-primary-500",
    ghost:
      "bg-transparent hover:bg-white/5 focus:ring-slate-500",
  };

  // Text tones
  const tones = {
    light: "text-white",
    dark: "text-slate-900",
  };

  // Width
  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${tones[tone]} ${widthClass} ${bg || ""} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-5 w-5 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};