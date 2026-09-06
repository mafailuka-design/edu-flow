import React, { useState } from 'react';
import { Bell, Shield, CheckCircle2, Lock, DollarSign } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

export default function InstructorSettings() {
  const [qaAlerts, setQaAlerts] = useState(true);
  const [enrollmentEmails, setEnrollmentEmails] = useState(true);
  const [monthlyStatement, setMonthlyStatement] = useState(true);
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const handlePreferencesSubmit = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!newPassword || newPassword !== confirmNewPassword) return;
    setPasswordSuccess(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setTimeout(() => setPasswordSuccess(false), 3000);
  };

  return (
    <div className="max-w-3xl space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Instructor Portal Settings
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Configure notifications, student Q&A alerts, and security settings.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          Instructor preferences updated successfully.
        </div>
      )}

      {/* Instructor Notifications */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Teaching & Student Alerts</h2>
            <p className="text-xs text-slate-500">Manage classroom notifications and financial summaries.</p>
          </div>
        </div>

        <div className="space-y-4">
          <label className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 cursor-pointer transition-colors">
            <div>
              <p className="text-sm font-semibold text-slate-900">Student Q&A Notifications</p>
              <p className="text-xs text-slate-500">Get notified whenever a student posts a question on your lectures.</p>
            </div>
            <input
              type="checkbox"
              checked={qaAlerts}
              onChange={(e) => setQaAlerts(e.target.checked)}
              className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 cursor-pointer transition-colors">
            <div>
              <p className="text-sm font-semibold text-slate-900">New Student Enrollments</p>
              <p className="text-xs text-slate-500">Receive instant updates when learners join your courses.</p>
            </div>
            <input
              type="checkbox"
              checked={enrollmentEmails}
              onChange={(e) => setEnrollmentEmails(e.target.checked)}
              className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 cursor-pointer transition-colors">
            <div>
              <p className="text-sm font-semibold text-slate-900">Monthly Payout Statements</p>
              <p className="text-xs text-slate-500">Detailed financial summary of royalties and student feedback.</p>
            </div>
            <input
              type="checkbox"
              checked={monthlyStatement}
              onChange={(e) => setMonthlyStatement(e.target.checked)}
              className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
            />
          </label>
        </div>

        <div className="pt-2 flex justify-end">
          <Button variant="primary" size="sm" onClick={handlePreferencesSubmit}>
            Save Preferences
          </Button>
        </div>
      </div>

      {/* Security */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Instructor Account Security</h2>
            <p className="text-xs text-slate-500">Update password and access control.</p>
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
              label="Confirm Password"
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
