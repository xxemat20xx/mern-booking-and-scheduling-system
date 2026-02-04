import { useState } from "react";
import VerifyOtp from "./VerifyOtp";

import { Input, Button } from '../components/UI'
import { User, Mail, Lock, Loader2 } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const Register = ({onSuccess, isLoading, register}) => {
  const [data, setData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();
    
  return (
    <div className="w-full space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-extrabold tracking-tight">Create <span className="gradient-text">Account</span></h2>
        <p className="text-slate-400 text-sm mt-2">Join the next generation of digital identity.</p>
      </div>
      <form onSubmit={async e => { e.preventDefault(); await register(data); onSuccess(data.email); }} className="space-y-6">
        <Input label="Full Name" placeholder="John Doe" value={data.name} onChange={(e) => setData({...data, name: e.target.value})} required icon={<User size={20} />} />
        <Input label="Email Address" type="email" placeholder="name@example.com" value={data.email} onChange={(e) => setData({...data, email: e.target.value})} required icon={<Mail size={20} />} />
        <Input label="Password" type="password" placeholder="••••••••" value={data.password} autoComplete="" onChange={(e) => setData({...data, password: e.target.value})} required icon={<Lock size={20} />} />
        <Button isLoading={isLoading} type="submit">Initialize Registration</Button>
      </form>
      <p className="text-center">Already have an account? <span 
      className="text-blue-500 hover:border-b border-blue-500 cursor-pointer"
      onClick={() => navigate("/login")}>Login</span></p>
    </div>
  )
}

export default Register