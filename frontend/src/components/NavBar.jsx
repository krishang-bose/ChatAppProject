import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LogOut, User, MessageCircleHeart } from 'lucide-react';

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  return (
    <div
      style={{
        background: 'rgba(5, 0, 15, 0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(147, 51, 234, 0.15)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <div style={{ maxWidth: '100%', padding: '0 24px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            width: '34px', height: '34px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #7c3aed, #9333ea)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 12px rgba(147, 51, 234, 0.4)',
          }}>
            <MessageCircleHeart size={18} color="white" />
          </div>
          <span style={{
            fontWeight: 700, fontSize: '18px', letterSpacing: '-0.3px',
            background: 'linear-gradient(135deg, #c084fc, #a855f7, #7c3aed)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Vibe
          </span>
        </Link>

        {/* Right side */}
        {authUser && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Link
              to="/profile"
              style={{
                display: 'flex', alignItems: 'center', gap: '7px',
                padding: '7px 14px', borderRadius: '8px', textDecoration: 'none',
                color: '#c084fc', fontSize: '14px', fontWeight: 500,
                transition: 'all 0.2s ease',
                border: '1px solid rgba(147, 51, 234, 0.2)',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(147, 51, 234, 0.12)'; e.currentTarget.style.borderColor = 'rgba(147, 51, 234, 0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(147, 51, 234, 0.2)'; }}
            >
              <User size={15} />
              <span style={{ display: window.innerWidth < 500 ? 'none' : 'inline' }}>Profile</span>
            </Link>

            <button
              onClick={handleLogout}
              style={{
                display: 'flex', alignItems: 'center', gap: '7px',
                padding: '7px 14px', borderRadius: '8px',
                background: 'transparent', border: '1px solid rgba(239, 68, 68, 0.25)',
                color: '#f87171', fontSize: '14px', fontWeight: 500,
                cursor: 'pointer', transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'; e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.45)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.25)'; }}
            >
              <LogOut size={15} />
              <span style={{ display: window.innerWidth < 500 ? 'none' : 'inline' }}>Logout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;