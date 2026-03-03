import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff, Mail, Lock, User, UserPlus } from 'lucide-react';
import { toast } from 'react-hot-toast';

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const { signup, isSigningIn } = useAuthStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) { toast.error("Full Name is required"); return false; }
    if (!formData.email.trim()) { toast.error("Email is required"); return false; }
    if (!formData.password.trim()) { toast.error("Password is required"); return false; }
    if (formData.password.length < 8) { toast.error("Password must be at least 8 characters long"); return false; }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) await signup(formData);
  };

  return (
    <div className="auth-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 16px', overflow: 'hidden', position: 'relative' }}>
      {/* Decorative blobs */}
      <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '380px', height: '380px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(109,40,217,0.22) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-100px', left: '-100px', width: '420px', height: '420px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(147,51,234,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="glass-card animate-fade-in-up" style={{ width: '100%', maxWidth: '420px', borderRadius: '20px', padding: '40px 36px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '14px', margin: '0 auto 16px',
            background: 'linear-gradient(135deg, #7c3aed, #9333ea)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 20px rgba(147,51,234,0.5)',
          }} className="animate-pulse-glow">
            <UserPlus size={24} color="white" />
          </div>
          <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#e9d5ff', letterSpacing: '-0.5px', marginBottom: '6px' }}>
            Create Account
          </h2>
          <p style={{ color: 'rgba(167,139,250,0.6)', fontSize: '14px' }}>
            Join Vibe and start messaging
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Full Name */}
          <div>
            <label style={{ display: 'block', color: '#c084fc', fontSize: '13px', fontWeight: 500, marginBottom: '6px' }}>
              Full Name
            </label>
            <div className="input-icon-group">
              <User size={16} className="input-icon" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>
          </div>

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
                placeholder="Enter your email"
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
                placeholder="Min. 8 characters"
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
            <button type="submit" disabled={isSigningIn} className="btn-purple">
              {isSigningIn ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <svg className="animate-spin-slow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" opacity="0.25" /><path d="M12 2a10 10 0 0 1 10 10" />
                  </svg>
                  Creating Account...
                </span>
              ) : 'Create Account'}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <p style={{ color: 'rgba(167,139,250,0.6)', fontSize: '14px' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#a855f7', fontWeight: 600, textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
              onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;