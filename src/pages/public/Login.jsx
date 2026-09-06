import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GraduationCap, Mail, Lock, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';

export default function Login() {
  const { login, loginAsDemoStudent, loginAsDemoInstructor } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const from = location.state?.from?.pathname || null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    const res = login(email, password);
    if (res.success) {
      if (from) {
        navigate(from, { replace: true });
      } else if (res.user.role === 'instructor') {
        navigate('/instructor', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    }
  };

  const handleDemoStudent = () => {
    loginAsDemoStudent();
    if (from) navigate(from, { replace: true });
    else navigate('/dashboard', { replace: true });
  };

  const handleDemoInstructor = () => {
    loginAsDemoInstructor();
    if (from) navigate(from, { replace: true });
    else navigate('/instructor', { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-soft border border-slate-200/90 space-y-6">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 mb-2 shadow-xs">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Sign in to continue your learning journey
            </p>
          </div>

          {/* Quick Demo Login Preset Boxes */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3 text-brand-600" />
              1-Click Demo Evaluation Login
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleDemoStudent}
                className="px-3 py-2 text-xs font-bold text-brand-700 bg-white border border-brand-200 rounded-xl hover:bg-brand-50 transition-colors shadow-xs text-center"
              >
                Student Demo
              </button>
              <button
                type="button"
                onClick={handleDemoInstructor}
                className="px-3 py-2 text-xs font-bold text-purple-700 bg-white border border-purple-200 rounded-xl hover:bg-purple-50 transition-colors shadow-xs text-center"
              >
                Instructor Demo
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
              label="Email Address"
              type="email"
              required
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              placeholder="name@example.com"
              leftIcon={Mail}
            />

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-semibold text-slate-700">Password</label>
                <button
                  type="button"
                  onClick={() => setForgotModalOpen(true)}
                  className="text-xs text-brand-600 hover:text-brand-700 font-semibold"
                >
                  Forgot password?
                </button>
              </div>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                placeholder="••••••••"
                leftIcon={Lock}
              />
            </div>

            <Button type="submit" variant="primary" size="lg" fullWidth rightIcon={ArrowRight}>
              Sign In
            </Button>
          </form>

          {/* Switch to Register */}
          <div className="text-center pt-2 border-t border-slate-100 text-xs text-slate-500">
            Don't have an account yet?{' '}
            <Link to="/register" className="font-bold text-brand-600 hover:text-brand-700">
              Create an Account
            </Link>
          </div>

        </div>
      </main>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={forgotModalOpen}
        onClose={() => { setForgotModalOpen(false); setResetSent(false); }}
        title="Reset Your Password"
        subtitle="We will send password reset instructions to your registered email."
      >
        {resetSent ? (
          <div className="space-y-4 text-center py-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center font-bold text-lg">
              ✓
            </div>
            <p className="text-sm text-slate-700 font-medium">
              A password reset link has been dispatched to <strong>{forgotEmail}</strong>. Please check your inbox.
            </p>
            <Button variant="primary" size="sm" onClick={() => setForgotModalOpen(false)}>
              Back to Login
            </Button>
          </div>
        ) : (
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (forgotEmail) setResetSent(true);
            }} 
            className="space-y-4"
          >
            <Input
              label="Email Address"
              type="email"
              required
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              placeholder="Enter your registered email"
              leftIcon={Mail}
            />
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setForgotModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Send Reset Link
              </Button>
            </div>
          </form>
        )}
      </Modal>

      <Footer />
    </div>
  );
}
