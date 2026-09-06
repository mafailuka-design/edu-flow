import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  GraduationCap, 
  Search, 
  Menu, 
  X, 
  BookOpen, 
  Heart, 
  Award, 
  User, 
  LogOut, 
  Sparkles,
  LayoutDashboard,
  PlusCircle,
  ChevronDown,
  Repeat
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCourses } from '../../context/CourseContext';
import Avatar from '../common/Avatar';
import Button from '../common/Button';
import Badge from '../common/Badge';

export default function Navbar() {
  const { user, isAuthenticated, isInstructor, logout, switchRole, loginAsDemoStudent, loginAsDemoInstructor } = useAuth();
  const { wishlist, enrollments } = useCourses();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 leading-none">
                Edu<span className="text-brand-600">Flow</span>
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">Learning Platform</span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md mx-4 relative">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses, skills, or instructors..."
                className="w-full pl-10 pr-4 py-2 bg-slate-100 hover:bg-slate-50 focus:bg-white text-sm text-slate-900 placeholder:text-slate-400 rounded-xl border border-transparent focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 transition-all"
              />
            </div>
          </form>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-600">
            <Link 
              to="/courses" 
              className={`hover:text-brand-600 transition-colors ${isActive('/courses') ? 'text-brand-600 font-bold' : ''}`}
            >
              Explore Courses
            </Link>
            <Link 
              to="/courses?category=Development" 
              className="hover:text-brand-600 transition-colors"
            >
              Development
            </Link>
            <Link 
              to="/courses?category=Design" 
              className="hover:text-brand-600 transition-colors"
            >
              Design
            </Link>
            <Link 
              to="/courses?category=Business" 
              className="hover:text-brand-600 transition-colors"
            >
              Business
            </Link>
          </nav>

          {/* Right Action / Auth Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-100 transition-colors focus:outline-none"
                  aria-expanded={userDropdownOpen}
                >
                  <Avatar src={user.avatar} name={user.name} size="sm" status="online" />
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-slate-900 leading-tight flex items-center gap-1.5">
                      {user.name}
                      <Badge variant={isInstructor ? 'purple' : 'brand'} size="xs">
                        {isInstructor ? 'Instructor' : 'Student'}
                      </Badge>
                    </span>
                    <span className="text-[11px] text-slate-400 truncate max-w-[120px]">{user.email}</span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-fadeIn"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Signed in as</p>
                      <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>

                    <div className="py-1">
                      {isInstructor ? (
                        <>
                          <Link
                            to="/instructor"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-600"
                          >
                            <LayoutDashboard className="w-4 h-4 text-slate-400" />
                            Instructor Dashboard
                          </Link>
                          <Link
                            to="/instructor/courses"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-600"
                          >
                            <BookOpen className="w-4 h-4 text-slate-400" />
                            My Published Courses
                          </Link>
                          <Link
                            to="/instructor/create-course"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-600"
                          >
                            <PlusCircle className="w-4 h-4 text-slate-400" />
                            Create New Course
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link
                            to="/dashboard"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-600"
                          >
                            <LayoutDashboard className="w-4 h-4 text-slate-400" />
                            Student Dashboard
                          </Link>
                          <Link
                            to="/dashboard/courses"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center justify-between px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-600"
                          >
                            <span className="flex items-center gap-2.5">
                              <BookOpen className="w-4 h-4 text-slate-400" />
                              My Enrolled Courses
                            </span>
                            <span className="text-xs bg-brand-50 text-brand-600 px-1.5 py-0.5 rounded-full font-bold">
                              {enrollments.length}
                            </span>
                          </Link>
                          <Link
                            to="/dashboard/wishlist"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center justify-between px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-600"
                          >
                            <span className="flex items-center gap-2.5">
                              <Heart className="w-4 h-4 text-slate-400" />
                              Wishlist
                            </span>
                            <span className="text-xs bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-full font-bold">
                              {wishlist.length}
                            </span>
                          </Link>
                          <Link
                            to="/dashboard/certificates"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-600"
                          >
                            <Award className="w-4 h-4 text-slate-400" />
                            Certificates
                          </Link>
                        </>
                      )}

                      <Link
                        to={isInstructor ? "/instructor/profile" : "/dashboard/profile"}
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-600"
                      >
                        <User className="w-4 h-4 text-slate-400" />
                        My Profile
                      </Link>
                    </div>

                    {/* Switch role quick test button */}
                    <div className="pt-1 pb-1 border-t border-slate-100 bg-slate-50/50">
                      <button
                        onClick={() => {
                          switchRole();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center justify-between px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors text-left"
                      >
                        <span className="flex items-center gap-2">
                          <Repeat className="w-3.5 h-3.5 text-brand-600" />
                          Switch to {isInstructor ? 'Student' : 'Instructor'} Mode
                        </span>
                        <span className="text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-500">
                          Demo
                        </span>
                      </button>
                    </div>

                    <div className="pt-1 border-t border-slate-100">
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                          navigate('/');
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {/* 1-Click Demo Login helpers */}
                <button
                  onClick={loginAsDemoStudent}
                  className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 rounded-lg transition-colors"
                  title="Instant Student Login"
                >
                  <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                  Demo Student
                </button>
                <button
                  onClick={loginAsDemoInstructor}
                  className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg transition-colors"
                  title="Instant Instructor Login"
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  Demo Instructor
                </button>
                
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4 shadow-xl">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses..."
              className="w-full pl-9 pr-4 py-2 bg-slate-100 text-sm text-slate-900 placeholder:text-slate-400 rounded-xl border border-transparent focus:border-brand-500 focus:outline-none"
            />
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          </form>

          {/* Navigation Links */}
          <div className="space-y-1">
            <Link
              to="/courses"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              Explore All Courses
            </Link>
            <Link
              to="/courses?category=Development"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              Development
            </Link>
            <Link
              to="/courses?category=Design"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              Design
            </Link>
            <Link
              to="/courses?category=Data Science"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              Data Science
            </Link>
          </div>

          {/* User Section in Mobile */}
          <div className="pt-4 border-t border-slate-100">
            {isAuthenticated ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 px-3 py-2 bg-slate-50 rounded-xl">
                  <Avatar src={user.avatar} name={user.name} size="md" />
                  <div>
                    <p className="text-sm font-bold text-slate-900">{user.name}</p>
                    <p className="text-xs text-slate-500">{user.email}</p>
                  </div>
                </div>

                <Link
                  to={isInstructor ? "/instructor" : "/dashboard"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-semibold text-brand-600 hover:bg-brand-50 rounded-lg"
                >
                  Go to {isInstructor ? 'Instructor Dashboard' : 'Student Dashboard'}
                </Link>

                <button
                  onClick={() => {
                    switchRole();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg flex items-center justify-between"
                >
                  <span>Switch to {isInstructor ? 'Student' : 'Instructor'}</span>
                  <Repeat className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                    navigate('/');
                  }}
                  className="w-full text-left px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 rounded-lg flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="space-y-2 pt-2">
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <button
                    onClick={() => { loginAsDemoStudent(); setMobileMenuOpen(false); }}
                    className="w-full py-2 text-xs font-bold text-brand-700 bg-brand-50 border border-brand-200 rounded-xl"
                  >
                    Demo Student
                  </button>
                  <button
                    onClick={() => { loginAsDemoInstructor(); setMobileMenuOpen(false); }}
                    className="w-full py-2 text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200 rounded-xl"
                  >
                    Demo Instructor
                  </button>
                </div>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block">
                  <Button variant="outline" fullWidth>Sign In</Button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="block">
                  <Button variant="primary" fullWidth>Get Started</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
