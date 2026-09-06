import React, { useState } from 'react';
import { User, Mail, Camera, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/common/Input';
import Textarea from '../../components/common/Textarea';
import Button from '../../components/common/Button';
import Avatar from '../../components/common/Avatar';

export default function Profile() {
  const { user, updateProfile } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [headline, setHeadline] = useState(user?.headline || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [interests, setInterests] = useState(user?.interests?.join(', ') || 'Development, Design, Data Science');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({
      name,
      email,
      headline,
      bio,
      interests: interests.split(',').map(s => s.trim()).filter(Boolean)
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const sampleAvatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  ];

  return (
    <div className="max-w-3xl space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          My Profile
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your personal details, public bio, and learning goals.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          Profile changes successfully saved and synchronized.
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft space-y-6">
        
        {/* Avatar Section */}
        <div className="space-y-3 pb-6 border-b border-slate-100">
          <label className="block text-sm font-semibold text-slate-700">Profile Picture</label>
          <div className="flex items-center gap-6">
            <Avatar src={user?.avatar} name={name} size="xl" status="online" />
            <div className="space-y-2">
              <p className="text-xs text-slate-500">
                Choose a preset avatar or keep your current photo:
              </p>
              <div className="flex items-center gap-2">
                {sampleAvatars.map((url, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => updateProfile({ avatar: url })}
                    className="w-10 h-10 rounded-full overflow-hidden border-2 hover:border-brand-500 transition-all focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <img src={url} alt="preset" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Name and Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            leftIcon={User}
          />
          <Input
            label="Email Address"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={Mail}
          />
        </div>

        {/* Headline */}
        <Input
          label="Professional Headline"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          placeholder="e.g. Aspiring Software Engineer | React Enthusiast"
          helperText="Appears beneath your name across course forums and certificates."
        />

        {/* Bio */}
        <Textarea
          label="About You / Bio"
          rows={3}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Share your background, current focus, and what drives you to learn..."
        />

        {/* Interests */}
        <Input
          label="Learning Interests (comma separated)"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          placeholder="Development, Design, Data Science, Marketing"
          leftIcon={Sparkles}
        />

        {/* Actions */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <Button type="submit" variant="primary" size="md">
            Save Changes
          </Button>
        </div>

      </form>

    </div>
  );
}
