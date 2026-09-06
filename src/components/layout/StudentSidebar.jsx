import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Compass, 
  Heart, 
  Award, 
  User, 
  Settings, 
  LogOut,
  Repeat
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCourses } from '../../context/CourseContext';
import Avatar from '../common/Avatar';
import Badge from '../common/Badge';

export default function StudentSidebar({ onCloseMobile = () => {} }) {
  const { user, logout, switchRole } = useAuth();
  const { wishlist, enrollments } = useCourses();
  const navigate = useNavigate();

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/dashboard/courses', label: 'My Courses', icon: BookOpen, badge: enrollments.length },
    { to: '/courses', label: 'Browse Catalog', icon: Compass },
    { to: '/dashboard/wishlist', label: 'Wishlist', icon: Heart, badge: wishlist.length },
    { to: '/dashboard/certificates', label: 'Certificates', icon: Award },
    { to: '/dashboard/profile', label: 'Profile', icon: User },
    { to: '/dashboard/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between h-full min-h-[calc(100vh-4rem)]">
      {/* Upper Navigation */}
      <div className="p-4 space-y-6">
        {/* User Card */}
        <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-3">
          <Avatar src={user?.avatar} name={user?.name || "Student"} size="md" status="online" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-slate-900 truncate">{user?.name || "Alex Morgan"}</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Badge variant="brand" size="xs">Student</Badge>
              <span className="text-[11px] text-slate-400">Online</span>
            </div>
          </div>
        </div>

        {/* Nav list */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={onCloseMobile}
                className={({ isActive }) => `
                  flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all
                  ${isActive 
                    ? 'bg-brand-50 text-brand-700 border border-brand-200/60 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'}
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="text-xs px-2 py-0.5 font-bold rounded-full bg-slate-100 text-slate-700">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Lower Actions */}
      <div className="p-4 border-t border-slate-100 space-y-2 bg-slate-50/40">
        <button
          onClick={() => {
            switchRole();
            navigate('/instructor');
            onCloseMobile();
          }}
          className="w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-xl border border-purple-200 transition-colors"
        >
          <span className="flex items-center gap-2">
            <Repeat className="w-3.5 h-3.5" />
            Switch to Instructor View
          </span>
          <span className="text-[10px] bg-white px-1.5 py-0.5 rounded font-bold border border-purple-200">
            Demo
          </span>
        </button>

        <button
          onClick={() => {
            logout();
            navigate('/');
            onCloseMobile();
          }}
          className="w-full flex items-center gap-2.5 px-3.5 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
