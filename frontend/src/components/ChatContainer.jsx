import React, { useEffect, useState, useRef } from 'react';
import { useChatStore } from '../store/useChatstore';
import { useAuthStore } from '../store/useAuthStore';
import { SendHorizonal, MoreVertical, Search, Check, CheckCheck } from 'lucide-react';

const ChatContainer = () => {
  const [message, setMessage] = useState("");
  const { messages, getMessages, sendMessage, isMessagesLoading, selectedUser } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser, getMessages]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    await sendMessage({ text: message });
    setMessage("");
  };

  const getAvatarColor = (id = '') => {
    const colors = ['#7c3aed', '#9333ea', '#a855f7', '#6d28d9'];
    return colors[id.charCodeAt(0) % colors.length];
  };

  if (isMessagesLoading) return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
      <div style={{ padding: '24px', borderRadius: '16px', background: 'rgba(5, 0, 15, 0.6)', backdropFilter: 'blur(10px)', border: '1px solid rgba(147, 51, 234, 0.15)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <svg className="animate-spin-slow" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2.5">
          <circle cx="12" cy="12" r="10" opacity="0.2" />
          <path d="M12 2a10 10 0 0 1 10 10" />
        </svg>
        <span style={{ color: '#a855f7', fontSize: '14px', fontWeight: 500 }}>Decrypting messages...</span>
      </div>
    </div>
  );

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', background: '#000', position: 'relative' }}>
      {/* Texture background overlay */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.1, pointerEvents: 'none', backgroundImage: 'radial-gradient(circle, #9333ea 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      {/* Header */}
      <div style={{
        padding: '16px 24px', background: 'rgba(5, 0, 15, 0.75)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(147, 51, 234, 0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: getAvatarColor(selectedUser?._id),
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '16px', fontWeight: 700, color: 'white',
              boxShadow: '0 0 10px rgba(147, 51, 234, 0.2)',
            }}>
              {selectedUser?.fullName?.charAt(0)?.toUpperCase()}
            </div>
            <div style={{ position: 'absolute', bottom: '1px', right: '1px', width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e', border: '2px solid #000' }} />
          </div>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#e9d5ff', letterSpacing: '-0.2px' }}>
              {selectedUser?.fullName}
            </h3>
            <p style={{ fontSize: '11px', color: '#22c55e', fontWeight: 500 }}>Online</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '14px', color: 'rgba(167,139,250,0.4)' }}>
          <Search size={18} style={{ cursor: 'pointer' }} />
          <MoreVertical size={18} style={{ cursor: 'pointer' }} />
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', zIndex: 5 }}>
        {messages && messages.length > 0 ? (
          messages.map((msg, index) => {
            // FIX ALERT: msg.senderId comparison with authUser._id for correct alignment
            const isMe = msg.senderId === authUser?._id;
            const time = new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            return (
              <div
                key={index}
                className="animate-fade-in-up"
                style={{
                  maxWidth: '70%',
                  alignSelf: isMe ? 'flex-end' : 'flex-start',
                  display: 'flex', flexDirection: 'column',
                  alignItems: isMe ? 'flex-end' : 'flex-start',
                }}
              >
                {/* Bubble */}
                <div style={{
                  padding: '12px 16px',
                  borderRadius: isMe ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                  background: isMe ? 'linear-gradient(135deg, #7c3aed, #9333ea)' : 'rgba(30, 15, 50, 0.55)',
                  border: isMe ? 'none' : '1px solid rgba(147, 51, 234, 0.15)',
                  color: isMe ? '#fff' : '#e9d5ff',
                  fontSize: '15px',
                  lineHeight: 1.5,
                  boxShadow: isMe ? '0 4px 15px rgba(124, 58, 237, 0.2)' : 'none',
                }}>
                  {msg.text}
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="message"
                      style={{ marginTop: '8px', borderRadius: '12px', display: 'block', maxWidth: '100%', border: '1px solid rgba(255,255,255,0.1)' }}
                    />
                  )}
                </div>

                {/* Footer info (time + checkmarks) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '5px', padding: '0 4px' }}>
                  <span style={{ fontSize: '10px', color: 'rgba(167,139,250,0.4)', fontWeight: 500 }}>{time}</span>
                  {isMe && <CheckCheck size={12} color="#9333ea" style={{ opacity: 0.6 }} />}
                </div>
              </div>
            );
          })
        ) : (
          <div style={{ margin: 'auto', textAlign: 'center', opacity: 0.4 }}>
            <p style={{ fontSize: '14px', color: '#c084fc' }}>Start the conversation with {selectedUser?.fullName}</p>
          </div>
        )}
        <div ref={messageEndRef} />
      </div>

      {/* Input area */}
      <div style={{ padding: '16px 24px', background: 'rgba(5, 0, 15, 0.75)', backdropFilter: 'blur(12px)', borderTop: '1px solid rgba(147, 51, 234, 0.1)' }}>
        <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '12px' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Send message to ${selectedUser?.fullName?.split(' ')[0]}...`}
              style={{
                width: '100%', padding: '12px 20px',
                background: 'rgba(30, 15, 50, 0.4)',
                border: '1px solid rgba(147, 51, 234, 0.15)',
                borderRadius: '14px', color: '#e9d5ff', fontSize: '15px',
                outline: 'none', transition: 'all 0.2s ease',
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(147,51,234,0.4)'}
              onBlur={e => e.target.style.borderColor = 'rgba(147,51,234,0.15)'}
            />
          </div>
          <button
            type="submit"
            disabled={!message.trim()}
            className="btn-purple"
            style={{ width: '48px', height: '48px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '14px' }}
          >
            <SendHorizonal size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatContainer;