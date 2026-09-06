import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Navbar from './Navbar';
import StudentSidebar from './StudentSidebar';
import Footer from './Footer';

export default function StudentLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Desktop Sticky Sidebar */}
        <div className="hidden md:block shrink-0">
          <StudentSidebar />
        </div>

        {/* Mobile Drawer Sidebar */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <div 
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative w-72 max-w-[80vw] bg-white h-full z-10 shadow-2xl flex flex-col">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <span className="font-bold text-slate-900">Student Navigation</span>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <StudentSidebar onCloseMobile={() => setMobileSidebarOpen(false)} />
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          {/* Mobile Sidebar Trigger Bar */}
          <div className="md:hidden flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-xl shadow-xs hover:bg-slate-50"
            >
              <Menu className="w-4 h-4" />
              Menu
            </button>
            <span className="text-xs font-semibold text-slate-500">Student Dashboard</span>
          </div>

          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}
