import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ArrowRight, BookOpen } from 'lucide-react';
import { useCourses } from '../../context/CourseContext';
import { formatPrice } from '../../utils/formatters';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import EmptyState from '../../components/common/EmptyState';

export default function Wishlist() {
  const { getWishlistCourses, toggleWishlist, isEnrolled, enrollInCourse } = useCourses();
  const wishlistCourses = getWishlistCourses();

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          My Saved Wishlist
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Courses you've bookmarked to enroll in later.
        </p>
      </div>

      {wishlistCourses.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="Your wishlist is empty"
          description="Explore our catalog and click the heart icon on any course card to bookmark courses for later."
          actionLabel="Browse Courses"
          onAction={() => window.location.href = '/courses'}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistCourses.map((course) => {
            const enrolled = isEnrolled(course.id);

            return (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-soft overflow-hidden flex flex-col justify-between hover:shadow-card-hover transition-all"
              >
                <div>
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="dark" size="xs">{course.category}</Badge>
                    </div>
                    <button
                      onClick={() => toggleWishlist(course.id)}
                      className="absolute top-3 right-3 p-2 rounded-xl bg-white/90 text-rose-500 hover:bg-rose-50 hover:text-rose-600 shadow-sm transition-colors"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-5 space-y-2">
                    <p className="text-xs text-slate-500 font-medium">{course.instructor?.name}</p>
                    <Link to={`/courses/${course.id}`}>
                      <h3 className="text-base font-bold text-slate-900 hover:text-brand-600 transition-colors line-clamp-2">
                        {course.title}
                      </h3>
                    </Link>
                    <div className="pt-2 flex items-baseline gap-2">
                      <span className="text-lg font-extrabold text-slate-900">
                        {formatPrice(course.price)}
                      </span>
                      {course.originalPrice && course.originalPrice > course.price && (
                        <span className="text-xs text-slate-400 line-through">
                          {formatPrice(course.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between gap-2">
                  <button
                    onClick={() => toggleWishlist(course.id)}
                    className="text-xs font-semibold text-slate-500 hover:text-rose-600 transition-colors"
                  >
                    Remove
                  </button>

                  <div className="flex items-center gap-2">
                    <Link to={`/courses/${course.id}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                    {!enrolled && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          enrollInCourse(course.id);
                        }}
                      >
                        Enroll
                      </Button>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
