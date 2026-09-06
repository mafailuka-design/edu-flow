import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Lock, User, Sparkles, BookOpen, Briefcase } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all required fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    const res = register({ name, email, role });
    if (res.success) {
      if (role === 'instructor') {
        navigate('/instructor', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-lg bg-white rounded-3xl p-8 sm:p-10 shadow-soft border border-slate-200/90 space-y-6">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 mb-2 shadow-xs">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Create Your Account
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Start learning or teaching in minutes with EduFlow
            </p>
          </div>

          {/* Account Type Selection */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Select Account Role</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`
                  p-3.5 rounded-2xl border text-left flex flex-col justify-between gap-2 transition-all
                  ${role === 'student' 
                    ? 'border-brand-600 bg-brand-50/70 ring-2 ring-brand-500/20 shadow-xs' 
                    : 'border-slate-200 hover:border-slate-300 bg-white'}
                `}
              >
                <div className="flex items-center justify-between w-full">
                  <BookOpen className={`w-5 h-5 ${role === 'student' ? 'text-brand-600' : 'text-slate-400'}`} />
                  {role === 'student' && <span className="w-2 h-2 rounded-full bg-brand-600" />}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Student</p>
                  <p className="text-[11px] text-slate-500">I want to learn & earn certificates</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setRole('instructor')}
                className={`
                  p-3.5 rounded-2xl border text-left flex flex-col justify-between gap-2 transition-all
                  ${role === 'instructor' 
                    ? 'border-purple-600 bg-purple-50/70 ring-2 ring-purple-500/20 shadow-xs' 
                    : 'border-slate-200 hover:border-slate-300 bg-white'}
                `}
              >
                <div className="flex items-center justify-between w-full">
                  <Briefcase className={`w-5 h-5 ${role === 'instructor' ? 'text-purple-600' : 'text-slate-400'}`} />
                  {role === 'instructor' && <span className="w-2 h-2 rounded-full bg-purple-600" />}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Instructor</p>
                  <p className="text-[11px] text-slate-500">I want to create & publish courses</p>
                </div>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-600">
                {error}
              </div>
            )}

            <Input
              label="Full Name"
              type="text"
              required
              value={name}
              onChange={(e) => { setName(e.target.value); setError(''); }}
              placeholder="Alex Morgan"
              leftIcon={User}
            />

            <Input
              label="Email Address"
              type="email"
              required
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              placeholder="alex@example.com"
              leftIcon={Mail}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Password"
                type="password"
                required
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                placeholder="••••••••"
                leftIcon={Lock}
              />
              <Input
                label="Confirm Password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setError(''); }}
                placeholder="••••••••"
                leftIcon={Lock}
              />
            </div>

            <Button type="submit" variant="primary" size="lg" fullWidth>
              Register & Start Learning
            </Button>
          </form>

          {/* Switch to Login */}
          <div className="text-center pt-2 border-t border-slate-100 text-xs text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-brand-600 hover:text-brand-700">
              Sign In
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
