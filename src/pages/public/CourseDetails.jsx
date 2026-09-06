import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, 
  Users, 
  Clock, 
  Globe, 
  Calendar, 
  CheckCircle2, 
  ShieldCheck, 
  Award, 
  BookOpen, 
  Heart, 
  Share2, 
  Play, 
  ArrowLeft,
  Sparkles,
  FileCheck
} from 'lucide-react';
import { useCourses } from '../../context/CourseContext';
import { useAuth } from '../../context/AuthContext';
import { formatPrice, formatNumber } from '../../utils/formatters';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import CurriculumList from '../../components/course/CurriculumList';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Avatar from '../../components/common/Avatar';

export default function CourseDetails() {
  const { id } = useParams();
  const { getCourseById, isEnrolled, enrollInCourse, isWishlisted, toggleWishlist } = useCourses();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [enrollSuccess, setEnrollSuccess] = useState(false);

  const course = getCourseById(id);

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Course Not Found</h2>
          <p className="text-sm text-slate-500 mb-6">The requested course could not be located in our catalog.</p>
          <Link to="/courses">
            <Button variant="primary">Browse All Courses</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const enrolled = isEnrolled(course.id);
  const wishlisted = isWishlisted(course.id);

  const handleEnroll = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: `/courses/${course.id}` } } });
      return;
    }

    enrollInCourse(course.id);
    setEnrollSuccess(true);
    setTimeout(() => {
      navigate(`/learn/${course.id}`);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Dark Header Banner */}
      <section className="bg-slate-900 text-white py-10 lg:py-16 border-b border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
            <Link to="/courses" className="hover:text-white transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              All Courses
            </Link>
            <span>/</span>
            <Link to={`/courses?category=${encodeURIComponent(course.category)}`} className="hover:text-white transition-colors">
              {course.category}
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Content Column */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="brand" size="xs" className="font-bold uppercase tracking-wider">
                  {course.category}
                </Badge>
                <Badge variant="default" size="xs" className="bg-slate-800 text-slate-300 border-slate-700">
                  {course.level}
                </Badge>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {course.title}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                {course.description}
              </p>

              {/* Meta stats */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-300 pt-2">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{course.rating || '4.9'}</span>
                  <span className="text-slate-400 font-normal">({formatNumber(course.reviewsCount || 820)} reviews)</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span>{formatNumber(course.students || 2400)} students</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>{course.duration || '12h'}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>Updated {course.lastUpdated || 'August 2026'}</span>
                </div>
              </div>

              {/* Instructor snippet */}
              <div className="flex items-center gap-3 pt-2">
                <Avatar src={course.instructor?.avatar} name={course.instructor?.name || "Instructor"} size="sm" />
                <span className="text-xs text-slate-300">
                  Created by <strong className="text-white font-semibold">{course.instructor?.name}</strong>
                </span>
              </div>
            </div>

            {/* Right Column: Desktop Enrollment Card */}
            <div className="lg:col-span-1">
              <div className="bg-white text-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 lg:sticky lg:top-24 space-y-6">
                
                {/* Image Preview */}
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100 shadow-inner group">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 text-brand-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 text-white rounded text-[10px] font-semibold">
                    Course Preview
                  </span>
                </div>

                {/* Price and Guarantee */}
                <div className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-slate-900">
                      {formatPrice(course.price)}
                    </span>
                    {course.originalPrice && course.originalPrice > course.price && (
                      <span className="text-base text-slate-400 line-through">
                        {formatPrice(course.originalPrice)}
                      </span>
                    )}
                  </div>
                  {course.price > 0 && (
                    <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      30-Day Money-Back Guarantee
                    </p>
                  )}
                </div>

                {/* Main Action Buttons */}
                <div className="space-y-2.5">
                  {enrolled ? (
                    <Link to={`/learn/${course.id}`} className="block">
                      <Button variant="primary" size="lg" fullWidth leftIcon={BookOpen}>
                        Go to Learning Player
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      onClick={handleEnroll}
                      disabled={enrollSuccess}
                    >
                      {enrollSuccess ? "Enrolling..." : "Enroll Now"}
                    </Button>
                  )}

                  <Button
                    variant={wishlisted ? "danger" : "outline"}
                    size="md"
                    fullWidth
                    onClick={() => toggleWishlist(course.id)}
                    leftIcon={Heart}
                  >
                    {wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                  </Button>
                </div>

                {/* Includes List */}
                <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs text-slate-600 font-medium">
                  <p className="font-bold text-slate-900 text-xs uppercase tracking-wider">This course includes:</p>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-brand-600" />
                    <span>{course.duration || '12 hours'} on-demand video</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-brand-600" />
                    <span>Structured modules and practical exercises</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-brand-600" />
                    <span>Module knowledge check quizzes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-brand-600" />
                    <span>Verified Certificate of Completion</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-12">
            
            {/* What You'll Learn Box */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft space-y-4">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-600" />
                What You'll Learn
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {course.objectives?.map((obj, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Curriculum */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Course Curriculum</h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    {course.modules?.length || 0} modules • {course.totalLessons || 12} lectures • {course.duration || '10h'} total length
                  </p>
                </div>
              </div>

              <CurriculumList modules={course.modules} isEnrolled={enrolled} />
            </div>

            {/* Prerequisites */}
            {course.requirements && (
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-slate-900">Requirements</h2>
                <ul className="space-y-2 list-disc list-inside text-sm text-slate-600">
                  {course.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Instructor Profile */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft space-y-6">
              <h2 className="text-xl font-bold text-slate-900">Your Instructor</h2>
              
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Avatar src={course.instructor?.avatar} name={course.instructor?.name || "Instructor"} size="lg" />
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900">{course.instructor?.name}</h3>
                  <p className="text-xs font-medium text-brand-600">{course.instructor?.title}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                    <span className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      {course.instructor?.rating || 4.9} Rating
                    </span>
                    <span>•</span>
                    <span>{formatNumber(course.instructor?.studentsCount || 35000)} Students</span>
                    <span>•</span>
                    <span>{course.instructor?.coursesCount || 4} Courses</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                {course.instructor?.bio}
              </p>
            </div>

            {/* Student Reviews */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">Student Feedback & Reviews</h2>
                <div className="flex items-center gap-1.5 text-amber-500 font-bold text-sm">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{course.rating || 4.9} course rating</span>
                </div>
              </div>

              <div className="space-y-4">
                {course.reviews?.map((review) => (
                  <div key={review.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar src={review.avatar} name={review.studentName} size="sm" />
                        <div>
                          <p className="text-xs font-bold text-slate-900">{review.studentName}</p>
                          <p className="text-[10px] text-slate-400">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex text-amber-400">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      "{review.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
