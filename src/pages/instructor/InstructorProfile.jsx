import React, { useState } from 'react';
import { User, Mail, Sparkles, CheckCircle2, Award, BookOpen } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/common/Input';
import Textarea from '../../components/common/Textarea';
import Button from '../../components/common/Button';
import Avatar from '../../components/common/Avatar';

export default function InstructorProfile() {
  const { user, updateProfile } = useAuth();

  const [name, setName] = useState(user?.name || 'Dr. Sarah Jenkins');
  const [email, setEmail] = useState(user?.email || 'sarah.jenkins@eduflow.io');
  const [headline, setHeadline] = useState(user?.headline || 'AI Research Scientist & Lead Instructor');
  const [bio, setBio] = useState(user?.bio || 'Dr. Jenkins holds a PhD in Computational Statistics and has spearheaded predictive modeling engines for Fortune 500 enterprises.');
  const [interests, setInterests] = useState(user?.interests?.join(', ') || 'Data Science, Development, AI Architecture');
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

  return (
    <div className="max-w-3xl space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Instructor Profile & Credentials
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          This biography and headline is featured on all course landing pages you publish.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          Instructor profile updated successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft space-y-6">
        
        {/* Avatar Section */}
        <div className="flex items-center gap-6 pb-6 border-b border-slate-100">
          <Avatar src={user?.avatar} name={name} size="xl" status="online" />
          <div>
            <h3 className="text-base font-bold text-slate-900">{name}</h3>
            <p className="text-xs text-purple-600 font-semibold">{headline}</p>
            <p className="text-xs text-slate-400 mt-1">Verified EduFlow Senior Faculty</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            leftIcon={User}
          />
          <Input
            label="Instructor Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={Mail}
          />
        </div>

        <Input
          label="Teaching Headline / Title"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          placeholder="e.g. Senior Machine Learning Engineer & Course Author"
        />

        <Textarea
          label="Instructor Biography"
          rows={4}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Describe your industry credentials, projects, and teaching philosophy..."
        />

        <Input
          label="Primary Expertise / Categories"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          leftIcon={Sparkles}
        />

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <Button type="submit" variant="primary" size="md">
            Save Instructor Profile
          </Button>
        </div>

      </form>

    </div>
  );
}
