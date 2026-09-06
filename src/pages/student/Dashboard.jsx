import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Award, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  PlayCircle,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCourses } from '../../context/CourseContext';
import { useProgress } from '../../context/ProgressContext';
import ProgressBar from '../../components/common/ProgressBar';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import CourseCard from '../../components/course/CourseCard';

export default function Dashboard() {
  const { user } = useAuth();
  const { courses, enrollments, getEnrolledCourses } = useCourses();
  const { certificates, activity, getCourseProgress } = useProgress();

  const enrolledList = getEnrolledCourses();

  // Find the primary active course to "Continue Learning"
  const inProgressCourses = enrolledList.filter(c => {
    const p = getCourseProgress(c);
    return !p.isFinished;
  });

  const activeCourse = inProgressCourses[0] || enrolledList[0] || null;
  const activeProgress = activeCourse ? getCourseProgress(activeCourse) : null;

  // Completed courses count
  const completedCoursesCount = enrolledList.filter(c => getCourseProgress(c).isFinished).length;

  // Recommended courses (ones not enrolled in)
  const recommendedCourses = courses
    .filter(c => !enrollments.some(e => String(e.courseId) === String(c.id)))
    .slice(0, 3);

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-brand-700 via-indigo-700 to-brand-900 text-white p-6 sm:p-8 overflow-hidden shadow-soft">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Student Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {user?.name || "Alex"}! 👋
            </h1>
            <p className="text-sm text-slate-200 max-w-lg">
              "Continuous learning is the minimum requirement for success in any field." Keep up your daily streak!
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link to="/courses">
              <Button variant="secondary" size="md" className="bg-white text-slate-900 hover:bg-slate-100 font-bold">
                Browse New Courses
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-soft flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900">{enrolledList.length}</p>
            <p className="text-xs text-slate-500 font-medium">Enrolled Courses</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-soft flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900">{completedCoursesCount}</p>
            <p className="text-xs text-slate-500 font-medium">Courses Completed</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-soft flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900">{user?.hoursLearned || 38}h</p>
            <p className="text-xs text-slate-500 font-medium">Hours Learned</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-soft flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900">{certificates.length}</p>
            <p className="text-xs text-slate-500 font-medium">Certificates Earned</p>
          </div>
        </div>
      </div>

      {/* Continue Learning Prominent Card */}
      {activeCourse && activeProgress && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="text-lg font-bold text-slate-900">Continue Learning</h2>
            </div>
            <Link to="/dashboard/courses" className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1">
              <span>View All Enrolled</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6 bg-slate-50 p-5 rounded-2xl border border-slate-200/70">
            <img
              src={activeCourse.image}
              alt={activeCourse.title}
              className="w-full md:w-56 aspect-video object-cover rounded-xl shadow-xs"
            />
            <div className="flex-1 space-y-3 w-full">
              <div className="flex items-center gap-2">
                <Badge variant="brand" size="xs">{activeCourse.category}</Badge>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-500 font-medium">{activeCourse.instructor?.name}</span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {activeCourse.title}
              </h3>

              <div className="space-y-1.5 pt-1">
                <ProgressBar
                  value={activeProgress.percentage}
                  size="sm"
                  showLabel={true}
                  label={`Course Progress (${activeProgress.completedCount}/${activeProgress.totalCount} completed)`}
                  color={activeProgress.isFinished ? "emerald" : "brand"}
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <p className="text-xs text-slate-500 font-medium">
                  {activeProgress.isFinished ? "All lessons completed! Certificate issued." : "Ready for your next lecture?"}
                </p>
                <Link to={`/learn/${activeCourse.id}`}>
                  <Button variant="primary" size="sm" rightIcon={PlayCircle}>
                    Resume Learning
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid: Recommended Courses & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recommended (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-brand-600" />
              Recommended for Your Goals
            </h2>
            <Link to="/courses" className="text-xs font-bold text-brand-600 hover:text-brand-700">
              Explore All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recommendedCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>

        {/* Recent Activity Timeline (1 col) */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-soft space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-brand-600" />
            Recent Activity
          </h2>

          <div className="divide-y divide-slate-100">
            {activity.slice(0, 5).map((act) => (
              <div key={act.id} className="py-3.5 space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs font-bold text-slate-900 leading-tight">
                    {act.title}
                  </p>
                  <span className="text-[10px] text-slate-400 shrink-0 font-medium">{act.timestamp}</span>
                </div>
                {act.course && (
                  <p className="text-[11px] text-brand-600 font-medium truncate">
                    {act.course}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
