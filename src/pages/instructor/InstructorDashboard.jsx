import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  Star, 
  PlusCircle, 
  TrendingUp, 
  DollarSign, 
  Award, 
  ArrowRight,
  Sparkles,
  Edit,
  Eye
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCourses } from '../../context/CourseContext';
import { formatNumber, formatPrice } from '../../utils/formatters';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

export default function InstructorDashboard() {
  const { user } = useAuth();
  const { courses, getInstructorCourses } = useCourses();

  const instructorCourses = getInstructorCourses(user?.name);

  // Compute metrics
  const totalCourses = instructorCourses.length;
  const totalStudents = instructorCourses.reduce((sum, c) => sum + (c.students || 0), 0);
  const totalLessons = instructorCourses.reduce((sum, c) => {
    let lessons = 0;
    c.modules?.forEach(m => lessons += (m.lessons?.length || 0));
    return sum + (lessons || c.totalLessons || 0);
  }, 0);
  const avgRating = totalCourses > 0 
    ? (instructorCourses.reduce((sum, c) => sum + (c.rating || 4.8), 0) / totalCourses).toFixed(1)
    : '4.9';

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-purple-800 via-indigo-800 to-slate-900 text-white p-6 sm:p-8 overflow-hidden shadow-soft">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instructor Command Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome, {user?.name || "Dr. Sarah"}! 🎓
            </h1>
            <p className="text-sm text-slate-200 max-w-lg">
              Manage your published courses, view student enrollments, and launch new curriculums to empower learners.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link to="/instructor/create-course">
              <Button variant="secondary" size="md" className="bg-white text-slate-900 hover:bg-slate-100 font-bold" leftIcon={PlusCircle}>
                Create New Course
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Stats Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-soft flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900">{totalCourses}</p>
            <p className="text-xs text-slate-500 font-medium">Published Courses</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-soft flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900">{formatNumber(totalStudents || 45200)}</p>
            <p className="text-xs text-slate-500 font-medium">Total Students</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-soft flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900">{totalLessons || 32}</p>
            <p className="text-xs text-slate-500 font-medium">Video Lectures</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-soft flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Star className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900">{avgRating}</p>
            <p className="text-xs text-slate-500 font-medium">Average Rating</p>
          </div>
        </div>
      </div>

      {/* Recent Courses List */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-soft space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Your Recent Courses</h2>
            <p className="text-xs text-slate-500 mt-0.5">Manage and update curriculum details</p>
          </div>
          <Link to="/instructor/courses" className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1">
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {instructorCourses.slice(0, 4).map((course) => (
            <div key={course.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-16 h-12 object-cover rounded-xl shrink-0 shadow-xs"
                />
                <div>
                  <Link to={`/courses/${course.id}`} className="text-sm font-bold text-slate-900 hover:text-brand-600 line-clamp-1">
                    {course.title}
                  </Link>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                    <Badge variant="brand" size="xs">{course.category}</Badge>
                    <span>{formatNumber(course.students || 0)} students</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3 h-3 fill-current" />
                      {course.rating || 4.9}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <Link to={`/courses/${course.id}`}>
                  <Button variant="outline" size="sm" leftIcon={Eye}>
                    Preview
                  </Button>
                </Link>
                <Link to={`/instructor/courses/${course.id}/edit`}>
                  <Button variant="primary" size="sm" leftIcon={Edit}>
                    Edit Course
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
