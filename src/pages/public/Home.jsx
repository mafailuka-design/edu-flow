import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Award, 
  Compass, 
  TrendingUp, 
  Star, 
  Users, 
  BookOpen, 
  Code, 
  Palette, 
  BarChart3, 
  Briefcase, 
  Camera, 
  Megaphone, 
  ShieldCheck
} from 'lucide-react';
import { useCourses } from '../../context/CourseContext';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import CourseCard from '../../components/course/CourseCard';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

export default function Home() {
  const { courses } = useCourses();
  const [heroSearch, setHeroSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigate(`/courses?search=${encodeURIComponent(heroSearch.trim())}`);
    } else {
      navigate('/courses');
    }
  };

  const featuredCourses = courses.slice(0, 4);

  const categories = [
    { name: "Development", count: "120+ courses", icon: Code, color: "from-blue-500 to-indigo-600" },
    { name: "Design", count: "85+ courses", icon: Palette, color: "from-purple-500 to-pink-600" },
    { name: "Data Science", count: "70+ courses", icon: BarChart3, color: "from-emerald-500 to-teal-600" },
    { name: "Marketing", count: "55+ courses", icon: Megaphone, color: "from-orange-500 to-amber-600" },
    { name: "Business", count: "90+ courses", icon: Briefcase, color: "from-brand-600 to-indigo-700" },
    { name: "Finance", count: "45+ courses", icon: TrendingUp, color: "from-cyan-500 to-blue-600" },
    { name: "Photography", count: "35+ courses", icon: Camera, color: "from-rose-500 to-pink-600" },
    { name: "Personal Development", count: "60+ courses", icon: Sparkles, color: "from-violet-500 to-purple-700" },
  ];

  const benefits = [
    {
      icon: Clock,
      title: "Learn at Your Own Pace",
      description: "Lifetime access to all lectures, project materials, and downloadable resources. Learn anytime on desktop or mobile."
    },
    {
      icon: Users,
      title: "Expert Practitioners",
      description: "Courses taught by industry veterans who have built products at top tech firms and research institutions."
    },
    {
      icon: Code,
      title: "Hands-On Practical Projects",
      description: "Build portfolio-ready case studies and applications rather than just memorizing theoretical concepts."
    },
    {
      icon: Award,
      title: "Verified Certifications",
      description: "Earn shareable, digitally verified completion certificates after passing comprehensive module quizzes."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-white via-slate-50 to-slate-100/60 border-b border-slate-200/70">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-brand-500/10 via-indigo-500/10 to-purple-500/10 blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-bold mb-6 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>Next-Generation Career Learning • 2026 Edition</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight max-w-4xl mx-auto leading-[1.1]">
            Learn New Skills. <br className="hidden sm:inline" />
            <span className="gradient-text">Build Your Future.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Acquire high-demand software engineering, design, and business skills with structured, project-based video curriculums taught by recognized industry experts.
          </p>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="mt-8 max-w-xl mx-auto">
            <div className="relative flex items-center bg-white p-2 rounded-2xl shadow-soft border border-slate-200/80 hover:border-slate-300 focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-500/10 transition-all">
              <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
              <input
                type="text"
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                placeholder="What skill do you want to learn today?"
                className="w-full px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none"
              />
              <Button type="submit" variant="primary" size="md" className="shrink-0 rounded-xl">
                Search
              </Button>
            </div>
          </form>

          {/* Quick CTA Buttons */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm">
            <Link to="/courses">
              <Button variant="secondary" size="md" rightIcon={ArrowRight}>
                Browse All Courses
              </Button>
            </Link>
            <a href="#categories">
              <Button variant="outline" size="md">
                Explore Categories
              </Button>
            </a>
          </div>

          {/* Live Metrics Proof */}
          <div className="mt-14 pt-10 border-t border-slate-200/70 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-left sm:text-center">
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">50,000+</p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Active Global Students</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">100+</p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Expert-Led Masterclasses</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">4.9 / 5.0</p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Average Student Rating</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">94%</p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Course Completion Rate</p>
            </div>
          </div>

        </div>
      </section>

      {/* Popular Categories */}
      <section id="categories" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <Badge variant="brand" size="xs" className="mb-2 font-bold uppercase tracking-wider">
              Explore Fields
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Popular Learning Categories
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Choose from a diverse range of high-growth technical and creative tracks.
            </p>
          </div>
          <Link to="/courses" className="text-sm font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 group">
            <span>View All Tracks</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                to={`/courses?category=${encodeURIComponent(cat.name)}`}
                className="group bg-white p-5 rounded-2xl border border-slate-200/90 shadow-soft hover:shadow-card-hover hover:border-brand-300 transition-all duration-200 flex flex-col justify-between hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${cat.color} text-white flex items-center justify-center shadow-md mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">{cat.count}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 lg:py-24 bg-white border-y border-slate-200/80 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <Badge variant="brand" size="xs" className="mb-2 font-bold uppercase tracking-wider">
                Handpicked
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Featured Masterclasses
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Highest-rated courses designed to fast-track your practical knowledge.
              </p>
            </div>
            <Link to="/courses" className="text-sm font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 group">
              <span>Explore All {courses.length} Courses</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Learn With Us */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="brand" size="xs" className="mb-2 font-bold uppercase tracking-wider">
            Why EduFlow
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Designed for Real-World Competence
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-2">
            We focus on outcome-oriented curriculums so you can apply what you learn immediately.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-soft hover:shadow-card-hover transition-all space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 shadow-xs">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">{benefit.title}</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="pb-16 lg:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="relative rounded-3xl bg-gradient-to-r from-brand-700 via-indigo-700 to-brand-900 text-white p-8 sm:p-14 overflow-hidden shadow-2xl">
          {/* Background circles */}
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-brand-500/20 blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-4 text-center sm:text-left">
            <Badge variant="dark" size="xs" className="bg-white/20 text-white font-bold border-white/20">
              Start Your Journey
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Upgrade Your Career in 2026?
            </h2>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Create your account in seconds. Access free starter masterclasses, build projects, and receive verified certificates.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <Link to="/register">
                <Button variant="secondary" size="lg" className="bg-white text-slate-900 hover:bg-slate-100 font-bold">
                  Create Free Account
                </Button>
              </Link>
              <Link to="/courses">
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                  Explore Course Catalog
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
