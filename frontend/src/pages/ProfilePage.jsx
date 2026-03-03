import { React, useRef, useState } from 'react';
import { Camera, Mail, User, Lock, Shield } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const ProfilePage = () => {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64Image = reader.result;
        setSelectedImage(base64Image);
        await updateProfile({ profilePic: base64Image });
      };
    }
  };

  const displayImage = authUser?.profilePic || selectedImage;
  const initials = authUser?.fullName?.charAt(0)?.toUpperCase() || '?';
  const memberSince = new Date(authUser?.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="auth-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 16px', overflow: 'hidden', position: 'relative' }}>
      {/* Decorative blobs */}
      <div style={{ position: 'absolute', top: '-60px', left: '-60px', width: '360px', height: '360px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(109,40,217,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-80px', right: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(147,51,234,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="glass-card animate-fade-in-up" style={{ width: '100%', maxWidth: '440px', borderRadius: '20px', padding: '40px 36px' }}>
        {/* Avatar */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '32px' }}>
          <div style={{ position: 'relative' }}>
            {/* Avatar ring */}
            <div style={{
              width: '120px', height: '120px', borderRadius: '50%',
              padding: '3px',
              background: 'linear-gradient(135deg, #7c3aed, #9333ea, #a855f7)',
              boxShadow: '0 0 20px rgba(147,51,234,0.5)',
            }} className="animate-pulse-glow">
              <div style={{
                width: '100%', height: '100%', borderRadius: '50%',
                background: '#1a1a2e',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden', position: 'relative',
              }}>
                {displayImage ? (
                  <img src={displayImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontSize: '40px', fontWeight: 700, background: 'linear-gradient(135deg, #c084fc, #9333ea)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {initials}
                  </span>
                )}
                {/* Uploading overlay */}
                {isUpdatingProfile && (
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
                    <svg className="animate-spin-slow" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="10" opacity="0.25" />
                      <path d="M12 2a10 10 0 0 1 10 10" />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Camera button */}
            <button
              onClick={() => fileInputRef.current.click()}
              disabled={isUpdatingProfile}
              style={{
                position: 'absolute', bottom: '2px', right: '2px',
                width: '34px', height: '34px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #7c3aed, #9333ea)',
                border: '2px solid #000',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <Camera size={15} color="white" />
              <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handleImageUpload} disabled={isUpdatingProfile} />
            </button>
          </div>

          {/* Name & member badge */}
          <h2 style={{ marginTop: '16px', fontSize: '20px', fontWeight: 700, color: '#e9d5ff', letterSpacing: '-0.3px' }}>
            {authUser?.fullName || 'Your Profile'}
          </h2>
          <div style={{
            marginTop: '8px', padding: '4px 12px', borderRadius: '20px',
            border: '1px solid rgba(147,51,234,0.35)',
            background: 'rgba(147,51,234,0.1)',
            display: 'flex', alignItems: 'center', gap: '6px',
          }}>
            <Shield size={11} color="#a855f7" />
            <span style={{ fontSize: '12px', color: '#a855f7', fontWeight: 500 }}>Member since {memberSince}</span>
          </div>
        </div>

        {/* Info fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#c084fc', fontSize: '13px', fontWeight: 500, marginBottom: '6px' }}>
              <User size={13} /> Full Name
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={authUser?.fullName || ''}
                readOnly
                style={{
                  width: '100%', padding: '12px 40px 12px 16px',
                  background: 'rgba(30,15,50,0.4)', border: '1px solid rgba(147,51,234,0.2)',
                  borderRadius: '10px', color: '#d8b4fe', fontSize: '15px', outline: 'none', cursor: 'default',
                }}
              />
              <Lock size={14} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(147,51,234,0.4)' }} />
            </div>
          </div>
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#c084fc', fontSize: '13px', fontWeight: 500, marginBottom: '6px' }}>
              <Mail size={13} /> Email
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                value={authUser?.email || ''}
                readOnly
                style={{
                  width: '100%', padding: '12px 40px 12px 16px',
                  background: 'rgba(30,15,50,0.4)', border: '1px solid rgba(147,51,234,0.2)',
                  borderRadius: '10px', color: '#d8b4fe', fontSize: '15px', outline: 'none', cursor: 'default',
                }}
              />
              <Lock size={14} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(147,51,234,0.4)' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;