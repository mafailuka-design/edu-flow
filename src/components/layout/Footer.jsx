import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Mail, 
  CheckCircle2, 
  Heart 
} from 'lucide-react';
import Button from '../common/Button';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-500 to-indigo-500 flex items-center justify-center text-white shadow-soft">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Edu<span className="text-brand-400">Flow</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              Empowering lifelong learners worldwide through modern, practical, expert-led courses designed for in-demand careers in tech, design, and business.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Subscribe for Free Weekly Masterclasses
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium py-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Thanks for subscribing! Check your inbox soon.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-md gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                  />
                  <Button type="submit" variant="primary" size="sm">
                    Subscribe
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Popular Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Categories</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/courses?category=Development" className="hover:text-white transition-colors">Development</Link></li>
              <li><Link to="/courses?category=Design" className="hover:text-white transition-colors">UI/UX Design</Link></li>
              <li><Link to="/courses?category=Data Science" className="hover:text-white transition-colors">Data Science & AI</Link></li>
              <li><Link to="/courses?category=Marketing" className="hover:text-white transition-colors">Digital Marketing</Link></li>
              <li><Link to="/courses?category=Business" className="hover:text-white transition-colors">Product & Business</Link></li>
              <li><Link to="/courses?category=Finance" className="hover:text-white transition-colors">Finance & Investing</Link></li>
            </ul>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/courses" className="hover:text-white transition-colors">Explore All Courses</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Student Dashboard</Link></li>
              <li><Link to="/dashboard/certificates" className="hover:text-white transition-colors">Verified Certificates</Link></li>
              <li><Link to="/instructor" className="hover:text-white transition-colors">Teach on EduFlow</Link></li>
              <li><Link to="/register" className="hover:text-white transition-colors">Create Free Account</Link></li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#careers" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact Support</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom bar with Socials & Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="flex items-center gap-1 text-slate-500">
            © {new Date().getFullYear()} EduFlow Learning Technologies, Inc. Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for modern learners.
          </p>

          <div className="flex items-center gap-4 text-slate-400">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="Github">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="Twitter">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="LinkedIn">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="YouTube">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
