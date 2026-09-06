import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Users, Heart, BookOpen } from 'lucide-react';
import { useCourses } from '../../context/CourseContext';
import { useProgress } from '../../context/ProgressContext';
import { formatPrice, formatNumber } from '../../utils/formatters';
import Badge from '../common/Badge';
import ProgressBar from '../common/ProgressBar';

export default function CourseCard({ course, showProgress = false }) {
  const { isWishlisted, toggleWishlist, isEnrolled } = useCourses();
  const { getCourseProgress } = useProgress();

  if (!course) return null;

  const enrolled = isEnrolled(course.id);
  const wishlisted = isWishlisted(course.id);
  const progressInfo = showProgress || enrolled ? getCourseProgress(course) : null;

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(course.id);
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/90 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1">
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Gradient Overlay on top */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-60 pointer-events-none" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <Badge variant="dark" size="xs">
            {course.category}
          </Badge>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={`
            absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all duration-200
            ${wishlisted 
              ? 'bg-rose-500 text-white shadow-md scale-105' 
              : 'bg-white/80 text-slate-700 hover:bg-white hover:text-rose-500 shadow-sm'}
          `}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Enrolled Badge or Level */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
          <Badge variant="default" size="xs" className="bg-white/90 text-slate-800 backdrop-blur-xs font-semibold">
            {course.level}
          </Badge>
          {enrolled && (
            <Badge variant="success" size="xs" className="shadow-xs font-semibold">
              Enrolled
            </Badge>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Rating and Reviews */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{course.rating || '4.8'}</span>
            </div>
            <span>•</span>
            <span>({formatNumber(course.reviewsCount || 450)} reviews)</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3 text-slate-400" />
              <span>{formatNumber(course.students || 1200)}</span>
            </div>
          </div>

          {/* Title */}
          <Link to={`/courses/${course.id}`}>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-2 leading-snug">
              {course.title}
            </h3>
          </Link>

          {/* Instructor snippet */}
          <p className="text-xs font-medium text-slate-500 mt-1.5">
            By <span className="text-slate-700 font-semibold">{course.instructor?.name || "EduFlow Expert"}</span>
          </p>
        </div>

        {/* Optional Progress Bar for enrolled/learning view */}
        {showProgress && progressInfo && (
          <div className="py-1">
            <ProgressBar
              value={progressInfo.percentage}
              size="xs"
              showLabel={true}
              label={`${progressInfo.completedCount} of ${progressInfo.totalCount} completed`}
              color={progressInfo.isFinished ? "emerald" : "brand"}
            />
          </div>
        )}

        {/* Footer info: Duration, Price, and Action */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{course.duration || "10 hours"}</span>
          </div>

          <div className="text-right">
            {enrolled ? (
              <Link
                to={`/learn/${course.id}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-700 group-hover:underline"
              >
                <span>Continue</span>
                <BookOpen className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <div className="flex items-baseline gap-1.5">
                {course.originalPrice && course.originalPrice > course.price && (
                  <span className="text-xs text-slate-400 line-through">
                    {formatPrice(course.originalPrice)}
                  </span>
                )}
                <span className={`text-base font-extrabold ${course.price === 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
                  {formatPrice(course.price)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
