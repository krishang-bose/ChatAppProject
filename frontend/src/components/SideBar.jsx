import React, { useEffect, useState } from 'react';
import { useChatStore } from '../store/useChatstore';
import { Search, MessageSquareDashed } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const avatarColors = [
  'linear-gradient(135deg, #7c3aed, #9333ea)',
  'linear-gradient(135deg, #6d28d9, #7c3aed)',
  'linear-gradient(135deg, #a855f7, #7c3aed)',
  'linear-gradient(135deg, #8b5cf6, #6d28d9)',
];

const getAvatarColor = (id = '') => avatarColors[id.charCodeAt(0) % avatarColors.length];

const SideBar = () => {
  const { users, isUserLoading, setSelectedUser, getUsers, getMessages, selectedUser } = useChatStore();
  const [search, setSearch] = useState('');

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    getMessages(user._id);
  };

  const filtered = users?.filter(u =>
    !search || u.fullName?.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <div style={{
      width: '280px', minWidth: '240px',
      background: 'rgba(5, 0, 15, 0.8)',
      backdropFilter: 'blur(12px)',
      borderRight: '1px solid rgba(147, 51, 234, 0.12)',
      height: '100%', display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{ padding: '20px 16px 12px', borderBottom: '1px solid rgba(147,51,234,0.1)' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#e9d5ff', letterSpacing: '-0.2px', marginBottom: '12px' }}>
          Conversations
        </h3>
        {/* Search */}
        <div style={{ position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(147,51,234,0.5)', pointerEvents: 'none' }} />
          <input
            type="text"
            placeholder="Search people..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%', padding: '9px 12px 9px 34px',
              background: 'rgba(30,15,50,0.4)',
              border: '1px solid rgba(147,51,234,0.2)',
              borderRadius: '8px', color: '#d8b4fe', fontSize: '13px',
              outline: 'none', boxSizing: 'border-box',
            }}
            onFocus={e => e.target.style.borderColor = 'rgba(147,51,234,0.5)'}
            onBlur={e => e.target.style.borderColor = 'rgba(147,51,234,0.2)'}
          />
        </div>
      </div>

      {/* Users list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
        {isUserLoading ? (
          <div style={{ padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[1, 2, 3].map(i => (
              <div key={i} className='flex items-center gap-12px padding-8px-16px'>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(147,51,234,0.15)', flexShrink: 0 }} className="animate-pulse" />
                <div style={{ flex: 1 }}>
                  <div style={{ height: '12px', borderRadius: '6px', background: 'rgba(147,51,234,0.15)', marginBottom: '6px', width: '70%' }} className="animate-pulse" />
                  <div style={{ height: '10px', borderRadius: '6px', background: 'rgba(147,51,234,0.08)', width: '50%' }} className="animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length > 0 ? (
          filtered.map((user) => {
            const isSelected = selectedUser?._id === user._id;
            return (
              <div
                key={user._id}
                onClick={() => handleUserSelect(user)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '10px 16px', cursor: 'pointer',
                  transition: 'all 0.18s ease',
                  background: isSelected ? 'rgba(147,51,234,0.15)' : 'transparent',
                  borderLeft: isSelected ? '3px solid #9333ea' : '3px solid transparent',
                  position: 'relative',
                }}
                onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = 'rgba(147,51,234,0.07)'; }}
                onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = 'transparent'; }}
              >
                {/* Avatar */}
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '50%',
                    background: getAvatarColor(user._id),
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '16px', fontWeight: 700, color: 'white',
                    boxShadow: isSelected ? '0 0 10px rgba(147,51,234,0.4)' : 'none',
                  }}>
                    {user.fullName?.charAt(0)?.toUpperCase() || '?'}
                  </div>
                  {/* Online dot */}
                  <div style={{
                    position: 'absolute', bottom: '1px', right: '1px',
                    width: '11px', height: '11px', borderRadius: '50%',
                    background: '#22c55e',
                    border: '2px solid #05000f',
                    boxShadow: '0 0 4px rgba(34,197,94,0.6)',
                  }} />
                </div>

                {/* Info */}
                <div style={{ overflow: 'hidden', flex: 1 }}>
                  <h4 style={{
                    fontSize: '14px', fontWeight: 600,
                    color: isSelected ? '#e9d5ff' : '#d8b4fe',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    marginBottom: '2px',
                  }}>
                    {user.fullName}
                  </h4>
                  <p style={{ fontSize: '12px', color: 'rgba(167,139,250,0.45)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {user.lastMessage || 'Tap to start chatting'}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div style={{ padding: '40px 16px', textAlign: 'center' }}>
            <MessageSquareDashed size={32} style={{ color: 'rgba(147,51,234,0.3)', margin: '0 auto 10px' }} />
            <p style={{ color: 'rgba(167,139,250,0.4)', fontSize: '13px' }}>
              {search ? 'No users found' : 'No conversations yet'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;