import AuthForm from "../components/AuthForm"
import HeroSection from "./HeroSection"

const Login = () => {
  return (
    <div className="min-h-screen bg-dark-bg text-slate-200 flex flex-col md:flex-row">
          <div className="order-2 md:order-1 flex-1 md:w-1/2 lg:w-[55%] relative flex items-center bg-gradient-to-br from-dark-bg to-dark-surface border-t md:border-t-0 md:border-r border-dark-border">
          <HeroSection />
        </div>

      {/* Right Side: Auth Forms (Order 1 on mobile, Order 2 on desktop) */}
      <div className="order-1 md:order-2 flex-1 max-w-xl md:w-1/2 lg:w-[45%] min-h-screen flex items-center justify-center p-6 md:p-12 lg:p-16 bg-dark-surface relative shadow-2xl">
          {/* Background texture/glow for the form side */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-[20%] -right-[20%] w-[70%] h-[70%] bg-primary-900/10 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-dark-bg/50 to-transparent"></div>
          </div>

        <div className="w-full max-w-md relative z-10">
          <div className="mb-8 md:hidden flex justify-center">
            {/* Mobile Logo placeholder */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-xl">
                B
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Booking App</span>
            </div>
          </div>

          <AuthForm />
        </div>
      </div>
      </div>
  )
}

export default Login