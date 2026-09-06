import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Button from '../../components/common/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-6 text-center">
        <div className="max-w-md space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto shadow-soft">
            <Compass className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold text-slate-900">404</h1>
            <h2 className="text-xl font-bold text-slate-800">Page Not Found</h2>
            <p className="text-sm text-slate-500">
              The page you are looking for doesn't exist or has been relocated.
            </p>
          </div>
          <div className="flex justify-center gap-3">
            <Link to="/">
              <Button variant="primary" leftIcon={Home}>
                Back Home
              </Button>
            </Link>
            <Link to="/courses">
              <Button variant="outline">
                Browse Courses
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
