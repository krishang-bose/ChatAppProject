import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-hot-toast';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "", 
    password: ""
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    if(!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if(!formData.password.trim()) {
      toast.error("Password is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(validateForm()){
      await login(formData);
    }
  };

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center px-4 py-8 overflow-hidden">
      <svg 
        className="absolute inset-0 z-0" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1440 810" 
        preserveAspectRatio="xMinYMin slice"
      >
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(128,0,128,0.3)" />
            <stop offset="100%" stopColor="rgba(75,0,130,0.1)" />
          </linearGradient>
        </defs>
        
        {/* Background Waves */}
        <path 
          d="M0,400 
             Q360,200 720,400 
             T1440,600 
             V810 H0 Z" 
          fill="url(#waveGradient)"
        />
        <path 
          d="M0,500 
             Q360,300 720,500 
             T1440,700 
             V810 H0 Z" 
          fill="url(#waveGradient)"
          opacity="0.5"
        />
        <path 
          d="M0,600 
             Q360,400 720,600 
             T1440,800 
             V810 H0 Z" 
          fill="url(#waveGradient)"
          opacity="0.3"
        />
        <path 
          d="M0,700 
             Q360,500 720,700 
             T1440,900 
             V810 H0 Z" 
          fill="url(#waveGradient)"
          opacity="0.2"
        />
        <path 
          d="M0,800 
             Q360,600 720,800 
             T1440,1000 
             V810 H0 Z" 
          fill="url(#waveGradient)"
          opacity="0.1"
        />
      </svg>
      
      <div className="relative z-10 w-full max-w-md bg-black/70 rounded-xl shadow-2xl border border-purple-800/30 p-8">
        <h2 className="text-3xl font-bold text-center text-purple-400 mb-6 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full px-4 py-3 bg-[#2a2a2a] text-purple-200 border border-purple-800/30 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-purple-600 
              placeholder-purple-500/50 transition duration-300"
            />
          </div>

          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-3 bg-[#2a2a2a] text-purple-200 border border-purple-800/30 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-purple-600 
              placeholder-purple-500/50 transition duration-300"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-200"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button 
            type="submit" 
            disabled={isLoggingIn}
            className="w-full py-3 bg-purple-700 text-white rounded-lg 
            hover:bg-purple-600 transition duration-300 
            flex items-center justify-center 
            disabled:opacity-50 disabled:cursor-not-allowed
            shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
          >
            {isLoggingIn ? 'Logging In...' : 'Login'}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-purple-400">
            Don't have an account?{' '}
            <Link 
              to="/signup" 
              className="text-purple-600 hover:text-purple-400 
              transition duration-300 font-semibold
              hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;