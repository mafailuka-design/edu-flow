import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Compass, CheckCircle2, Clock, PlayCircle } from 'lucide-react';
import { useCourses } from '../../context/CourseContext';
import { useProgress } from '../../context/ProgressContext';
import { formatDate } from '../../utils/formatters';
import ProgressBar from '../../components/common/ProgressBar';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import EmptyState from '../../components/common/EmptyState';

export default function MyCourses() {
  const { getEnrolledCourses } = useCourses();
  const { getCourseProgress } = useProgress();
  const [activeTab, setActiveTab] = useState('all');

  const enrolledCourses = getEnrolledCourses();

  // Categorize by progress
  const inProgressCourses = enrolledCourses.filter(c => !getCourseProgress(c).isFinished);
  const completedCourses = enrolledCourses.filter(c => getCourseProgress(c).isFinished);

  const displayedCourses = {
    all: enrolledCourses,
    'in-progress': inProgressCourses,
    completed: completedCourses,
  }[activeTab] || enrolledCourses;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Enrolled Courses
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Access your active courses, resume lectures, and track your completion milestones.
          </p>
        </div>

        <Link to="/courses">
          <Button variant="primary" size="sm" leftIcon={Compass}>
            Discover More
          </Button>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('all')}
          className={`
            pb-3 px-3 text-sm font-bold transition-all relative
            ${activeTab === 'all' 
              ? 'text-brand-600 border-b-2 border-brand-600' 
              : 'text-slate-500 hover:text-slate-900'}
          `}
        >
          All ({enrolledCourses.length})
        </button>

        <button
          onClick={() => setActiveTab('in-progress')}
          className={`
            pb-3 px-3 text-sm font-bold transition-all relative
            ${activeTab === 'in-progress' 
              ? 'text-brand-600 border-b-2 border-brand-600' 
              : 'text-slate-500 hover:text-slate-900'}
          `}
        >
          In Progress ({inProgressCourses.length})
        </button>

        <button
          onClick={() => setActiveTab('completed')}
          className={`
            pb-3 px-3 text-sm font-bold transition-all relative
            ${activeTab === 'completed' 
              ? 'text-brand-600 border-b-2 border-brand-600' 
              : 'text-slate-500 hover:text-slate-900'}
          `}
        >
          Completed ({completedCourses.length})
        </button>
      </div>

      {/* Courses List */}
      {displayedCourses.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title={activeTab === 'completed' ? "No completed courses yet" : "No enrolled courses in this view"}
          description={
            activeTab === 'completed' 
              ? "Complete all lessons and quizzes in a course to receive your certificate and mark it completed." 
              : "Browse our extensive catalog to discover courses and start building your skills."
          }
          actionLabel="Browse Course Catalog"
          onAction={() => window.location.href = '/courses'}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCourses.map((course) => {
            const progressInfo = getCourseProgress(course);

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
                    {progressInfo.isFinished && (
                      <div className="absolute top-3 right-3">
                        <Badge variant="success" size="xs" icon={CheckCircle2}>Completed</Badge>
                      </div>
                    )}
                  </div>

                  <div className="p-5 space-y-3">
                    <div>
                      <p className="text-xs text-slate-500 font-medium">{course.instructor?.name}</p>
                      <Link to={`/learn/${course.id}`}>
                        <h3 className="text-base font-bold text-slate-900 hover:text-brand-600 transition-colors line-clamp-2 mt-1">
                          {course.title}
                        </h3>
                      </Link>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <ProgressBar
                        value={progressInfo.percentage}
                        size="xs"
                        showLabel={true}
                        label={`${progressInfo.completedCount}/${progressInfo.totalCount} completed`}
                        color={progressInfo.isFinished ? "emerald" : "brand"}
                      />
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Last accessed {formatDate(course.lastAccessed || course.enrolledAt)}</span>
                  </div>

                  <Link to={`/learn/${course.id}`}>
                    <Button variant={progressInfo.isFinished ? "outline" : "primary"} size="sm" rightIcon={PlayCircle}>
                      {progressInfo.isFinished ? "Review" : "Continue"}
                    </Button>
                  </Link>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
