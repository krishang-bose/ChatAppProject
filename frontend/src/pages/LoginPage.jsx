import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff, Mail, Lock, LogIn } from 'lucide-react';
import { toast } from 'react-hot-toast';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.email.trim()) { toast.error("Email is required"); return false; }
    if (!formData.password.trim()) { toast.error("Password is required"); return false; }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) await login(formData);
  };

  return (
    <div className="auth-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 16px', overflow: 'hidden', position: 'relative' }}>
      {/* Decorative blobs */}
      <div style={{ position: 'absolute', top: '-120px', left: '-120px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(109,40,217,0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-80px', right: '-80px', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(147,51,234,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="glass-card animate-fade-in-up" style={{ width: '100%', maxWidth: '420px', borderRadius: '20px', padding: '40px 36px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '14px', margin: '0 auto 16px',
            background: 'linear-gradient(135deg, #7c3aed, #9333ea)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 20px rgba(147,51,234,0.5)',
          }} className="animate-pulse-glow">
            <LogIn size={24} color="white" />
          </div>
          <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#e9d5ff', letterSpacing: '-0.5px', marginBottom: '6px' }}>
            Welcome back
          </h2>
          <p style={{ color: 'rgba(167,139,250,0.6)', fontSize: '14px' }}>
            Sign in to continue chatting
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Email */}
          <div>
            <label style={{ display: 'block', color: '#c084fc', fontSize: '13px', fontWeight: 500, marginBottom: '6px' }}>
              Email Address
            </label>
            <div className="input-icon-group">
              <Mail size={16} className="input-icon" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label style={{ display: 'block', color: '#c084fc', fontSize: '13px', fontWeight: 500, marginBottom: '6px' }}>
              Password
            </label>
            <div className="input-icon-group">
              <Lock size={16} className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                style={{ paddingRight: '44px' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute', right: '14px', background: 'none', border: 'none',
                  color: '#9333ea', cursor: 'pointer', padding: '0', display: 'flex', alignItems: 'center'
                }}
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <div style={{ marginTop: '8px' }}>
            <button type="submit" disabled={isLoggingIn} className="btn-purple">
              {isLoggingIn ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <svg className="animate-spin-slow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" opacity="0.25" /><path d="M12 2a10 10 0 0 1 10 10" />
                  </svg>
                  Signing in...
                </span>
              ) : 'Sign In'}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <p style={{ color: 'rgba(167,139,250,0.6)', fontSize: '14px' }}>
            Don't have an account?{' '}
            <Link to="/signup" style={{ color: '#a855f7', fontWeight: 600, textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
              onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;