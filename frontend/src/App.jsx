import { useState } from "react";
import { useAuthStore } from "./store/useAuthStore";

//toastify
import { ToastContainer } from "react-toastify";

//pages
import Register from "./pages/Register";
import VerifyOtp from "./pages/VerifyOtp";
import { SuccessView } from "./components/UI";
import { useNavigate } from "react-router-dom"; // ✅ use react-router-dom Link
import Login from "./pages/Login";


const App = () => {
  const [step, setStep] = useState("register");
  const [email, setEmail] = useState(""); // store email for verify step
  const { register, verifyOtp, isLoading, error } = useAuthStore();
  const navigate = useNavigate(); // ✅ for programmatic navigation

  const handleRegisterSuccess = (registeredEmail) => {
    setEmail(registeredEmail);
    setStep("verify");
  };

  const handleVerifySuccess = () => {
    setStep("success");
    // automatically navigate to login after 2 seconds (optional)
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />

      <div className="relative min-h-screen w-full flex items-center justify-center p-6 overflow-hidden flex-col">
        {[
          "bg-indigo-600/20 top-[-10%] left-[-10%]",
          "bg-purple-600/10 bottom-[-10%] right-[-10%]",
          "bg-blue-600/10 top-[20%] right-[10%]",
        ].map((cls, i) => (
          <div
            key={i}
            className={`absolute w-[40%] h-[40%] blur-[120px] rounded-full animate-float ${cls}`}
            style={{ animationDelay: `${i * 2}s` }}
          />
        ))}

        <main className="relative z-10 w-full max-w-lg">
          <div className="flex justify-center gap-2 mb-8">
            {["register", "verify", "success"].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  step === s ? "w-12 bg-indigo-500" : "w-6 bg-slate-700"
                }`}
              />
            ))}
          </div>

          <div className="glass rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-white/10">
            {step === "register" && (
              <Register
                register={register}
                isLoading={isLoading}
                onSuccess={handleRegisterSuccess}
              />
            )}

            {step === "verify" && (
              <VerifyOtp
                email={email}
                verify={verifyOtp}
                isLoading={isLoading}
                error={error}
                onSuccess={handleVerifySuccess} // ✅ handle success
              />
            )}

            {step === "success" && (
              <SuccessView
                onGoToLogin={() => navigate("/login")} // ✅ allow SuccessView button to navigate
              />
            )}
          </div>
        </main>

        <p className="mt-8 text-center text-slate-400 text-sm">
          Already have an account?{" "} <span 
          className="text-indigo-400 font-semibold hover:text-indigo-500 cursor-pointer"
          onClick={() => navigate('/login')}>Login
          </span>
          </p>
      </div>
    </>
  );
};

export default App;
  