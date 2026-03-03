import React from 'react';
import { MessageCircleHeart, Sparkles } from 'lucide-react';

const NoChatContainer = () => {
  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      background: '#000', position: 'relative', overflow: 'hidden'
    }} className="dot-grid-bg">
      {/* Decorative center glow */}
      <div style={{
        position: 'absolute', width: '250px', height: '250px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(147, 51, 234, 0.2) 0%, transparent 70%)',
        filter: 'blur(40px)', zIndex: 0
      }} />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 24px' }} className="animate-fade-in-up">
        {/* Floating Icon */}
        <div style={{
          width: '90px', height: '90px', borderRadius: '24px',
          background: 'linear-gradient(135deg, #7c3aed, #9333ea)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 28px',
          boxShadow: '0 0 30px rgba(147, 51, 234, 0.5)',
          position: 'relative',
        }} className="animate-float">
          <MessageCircleHeart size={44} color="white" />
          <div style={{ position: 'absolute', top: '-10px', right: '-10px', color: '#fcd34d' }}>
            <Sparkles size={24} className="animate-pulse" />
          </div>
        </div>

        {/* Content */}
        <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#e9d5ff', letterSpacing: '-0.5px', marginBottom: '12px' }}>
          Your Inbox is Ready
        </h2>
        <p style={{ fontSize: '15px', color: 'rgba(167, 139, 250, 0.6)', maxWidth: '320px', margin: '0 auto', lineHeight: 1.6 }}>
          Select a friend from the sidebar to start a secure, real-time conversation. ✨
        </p>

        {/* Action hint */}
        <div style={{
          marginTop: '32px', padding: '8px 16px', borderRadius: '12px',
          background: 'rgba(147, 51, 234, 0.1)', border: '1px solid rgba(147, 51, 234, 0.15)',
          display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#c084fc', fontSize: '13px', fontWeight: 500
        }}>
          Search or pick to vibe
        </div>
      </div>
    </div>
  );
};

export default NoChatContainer;