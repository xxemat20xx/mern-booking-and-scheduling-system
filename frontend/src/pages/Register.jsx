import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

import VerifyOtp from "./VerifyOtp";


const Register = () => {
  const { register } = useAuthStore();
  const [step, setStep] = useState("register");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
        e.preventDefault();
        await register({ name, email, password });
        setStep("verify");
    };

    return step === "register" ? (
       <div className="flex justify-center items-center min-h-screen min-w-screen">
            <div className="flex flex-col items-center gap-3 bg-indigo-950 px-8 py-8 rounded-2xl">
                <h2 className="text-indigo-500 text-2xl font-extrabold">Register Account</h2>
                <form onSubmit={handleRegister} className="flex flex-col gap-3 items-center justify-center">
                <input placeholder="Name" onChange={e => setName(e.target.value)} required
                className="px-3 my-2 rounded-full border border-indigo-300 py-2 text-slate-50"/>
                <input placeholder="Email" onChange={e => setEmail(e.target.value)} required
                className="px-3 my-2 rounded-full border border-indigo-300 py-2 text-slate-50"/>
                <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} autoComplete="" required
                className="px-3 my-2 rounded-full border border-indigo-300 py-2 text-slate-50"/>
                <button
                    className="bg-indigo-500 text-slate-50 w-full rounded-full py-2 hover:bg-indigo-700 cursor-pointer"
                >Register</button>
                </form>
            </div>
            
       </div>
    ) : (
        <VerifyOtp email={email} />
    );
}

export default Register