import React, { useState } from 'react';
import { Bell, Lock, Shield, CheckCircle2, Moon, Sun } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

export default function Settings() {
  const { user } = useAuth();

  const [emailNotifs, setEmailNotifs] = useState(true);
  const [courseReminders, setCourseReminders] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [prefSaved, setPrefSaved] = useState(false);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!newPassword || newPassword !== confirmNewPassword) return;
    setPasswordSuccess(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setTimeout(() => setPasswordSuccess(false), 3000);
  };

  const handleSavePreferences = () => {
    setPrefSaved(true);
    setTimeout(() => setPrefSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Account Settings
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your notifications, security credentials, and platform preferences.
        </p>
      </div>

      {prefSaved && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          Notification preferences updated successfully.
        </div>
      )}

      {/* Notifications Section */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Email & Learning Notifications</h2>
            <p className="text-xs text-slate-500">Control when and how you receive updates.</p>
          </div>
        </div>

        <div className="space-y-4">
          <label className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 cursor-pointer transition-colors">
            <div>
              <p className="text-sm font-semibold text-slate-900">Course Progress & Announcements</p>
              <p className="text-xs text-slate-500">Receive emails about instructor updates, new lectures, and milestones.</p>
            </div>
            <input
              type="checkbox"
              checked={emailNotifs}
              onChange={(e) => setEmailNotifs(e.target.checked)}
              className="w-5 h-5 text-brand-600 rounded focus:ring-brand-500"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 cursor-pointer transition-colors">
            <div>
              <p className="text-sm font-semibold text-slate-900">Study Streak & Daily Reminders</p>
              <p className="text-xs text-slate-500">Get helpful motivational prompts to keep up your learning habit.</p>
            </div>
            <input
              type="checkbox"
              checked={courseReminders}
              onChange={(e) => setCourseReminders(e.target.checked)}
              className="w-5 h-5 text-brand-600 rounded focus:ring-brand-500"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 cursor-pointer transition-colors">
            <div>
              <p className="text-sm font-semibold text-slate-900">Weekly Performance Digest</p>
              <p className="text-xs text-slate-500">A weekly summary of your hours learned, quiz grades, and rankings.</p>
            </div>
            <input
              type="checkbox"
              checked={weeklyDigest}
              onChange={(e) => setWeeklyDigest(e.target.checked)}
              className="w-5 h-5 text-brand-600 rounded focus:ring-brand-500"
            />
          </label>
        </div>

        <div className="pt-2 flex justify-end">
          <Button variant="primary" size="sm" onClick={handleSavePreferences}>
            Save Preferences
          </Button>
        </div>
      </div>

      {/* Security Section */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Security & Password</h2>
            <p className="text-xs text-slate-500">Ensure your account uses a secure credentials.</p>
          </div>
        </div>

        {passwordSuccess && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Password updated successfully.
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <Input
            label="Current Password"
            type="password"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="••••••••"
            leftIcon={Lock}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="New Password"
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              leftIcon={Lock}
            />
            <Input
              label="Confirm New Password"
              type="password"
              required
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              placeholder="••••••••"
              leftIcon={Lock}
            />
          </div>

          <div className="pt-2 flex justify-end">
            <Button type="submit" variant="primary" size="sm">
              Update Password
            </Button>
          </div>
        </form>
      </div>

    </div>
  );
}
