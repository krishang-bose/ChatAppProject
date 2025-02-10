import { React, useRef, useState } from 'react';
import { Camera } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const ProfilePage = () => {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = async(e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64Image = reader.result;
        setSelectedImage(base64Image);
        await updateProfile({ profilePic: base64Image });
      }
    }
  };
  

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center px-4 py-8 overflow-hidden">
      {/* Background SVG */}
      <svg 
        className="absolute inset-0 z-0" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1440 810" 
        preserveAspectRatio="xMinYMin slice"
      >
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(128,0,128,0.4)" />
            <stop offset="100%" stopColor="rgba(75,0,130,0.2)" />
          </linearGradient>
        </defs>

        <path 
          d="M0,400 
             Q360,200 720,400 
             T1440,600 
             V810 H0 Z" 
          fill="url(#waveGradient)"
        />
      </svg>

      {/* Profile Container */}
      <div className="relative z-10 w-full max-w-md bg-black/70 rounded-xl shadow-2xl border border-purple-800/30 p-8">
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-[#2a2a2a] border-2 border-purple-600 flex items-center justify-center overflow-hidden">
              {authUser?.profilePic ? (
                <img 
                  src={authUser.profilePic} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                  (selectedImage)? (
                  <img 
                    src={selectedImage}
                    alt='Profile'
                    className='w-full h-full object-cover'
                  />
                  ) : (
                  <div className="text-4xl text-purple-400">
                    {authUser?.fullName?.charAt(0)?.toUpperCase() || '?'}
                  </div>
                  )
              )}
            </div>
            <button onClick={() => fileInputRef.current.click()}
              className="absolute bottom-0 right-0 p-2 bg-purple-700 rounded-full 
              hover:bg-purple-600 transition-colors duration-300
              border-2 border-black shadow-lg"
            >
              <Camera size={20} className="text-white" />
              <input 
                type="file" 
                accept="image/*" 
                ref={fileInputRef} 
                className="hidden" 
                onChange={handleImageUpload} 
                disabled={isUpdatingProfile}
              />
            </button>
          </div>
        </div>

        {/* User Info Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-purple-400 mb-1 text-sm">Full Name</label>
            <input 
              type="text"
              value={authUser?.fullName || ''}
              readOnly
              className="w-full px-4 py-3 bg-[#2a2a2a] text-purple-200 border border-purple-800/30 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-purple-600 
              placeholder-purple-500/50"
            />
          </div>
          <div>
            <label className="block text-purple-400 mb-1 text-sm">Email</label>
            <input 
              type="email"
              value={authUser?.email || ''}
              readOnly
              className="w-full px-4 py-3 bg-[#2a2a2a] text-purple-200 border border-purple-800/30 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-purple-600 
              placeholder-purple-500/50"
            />
          </div>
        </div>

        {/* Member Since */}
        <div className="mt-6 text-center">
          <p className="text-purple-400 text-sm">
            Member since {new Date(authUser?.createdAt || Date.now()).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;