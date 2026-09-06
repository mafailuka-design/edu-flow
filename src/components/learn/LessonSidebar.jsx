import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  CheckCircle2, 
  PlayCircle, 
  FileText, 
  HelpCircle,
  Award,
  ChevronDown,
  X
} from 'lucide-react';
import ProgressBar from '../common/ProgressBar';
import Badge from '../common/Badge';

export default function LessonSidebar({
  course,
  progress,
  activeLessonId,
  onSelectLesson,
  onCloseMobile = () => {}
}) {
  if (!course) return null;

  return (
    <div className="w-80 bg-white border-r border-slate-200 flex flex-col h-full overflow-hidden">
      {/* Top Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50/70">
        <div className="flex items-center justify-between mb-3">
          <Link
            to="/dashboard/courses"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>My Courses</span>
          </Link>
          <button
            onClick={onCloseMobile}
            className="md:hidden p-1 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2 mb-2">
          {course.title}
        </h3>

        {/* Progress summary */}
        <ProgressBar
          value={progress.percentage}
          size="xs"
          showLabel={true}
          label={`${progress.completedCount}/${progress.totalCount} completed`}
          color={progress.isFinished ? "emerald" : "brand"}
        />

        {progress.isFinished && (
          <Link
            to="/dashboard/certificates"
            className="mt-2.5 flex items-center justify-center gap-1.5 w-full py-1.5 px-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs font-bold hover:bg-emerald-100 transition-colors"
          >
            <Award className="w-3.5 h-3.5" />
            View Earned Certificate
          </Link>
        )}
      </div>

      {/* Modules and Lessons Scrollable List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {course.modules?.map((mod, mIdx) => (
          <div key={mod.id} className="space-y-1">
            <div className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
              {mod.title}
            </div>

            <div className="space-y-0.5">
              {mod.lessons?.map((lesson) => {
                const isCompleted = progress.completedLessons?.includes(lesson.id);
                const isActive = activeLessonId === lesson.id;

                const getIcon = () => {
                  if (isCompleted) return <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />;
                  if (lesson.type === 'reading') return <FileText className="w-4 h-4 text-blue-500 shrink-0" />;
                  if (lesson.type === 'quiz') return <HelpCircle className="w-4 h-4 text-purple-500 shrink-0" />;
                  return <PlayCircle className="w-4 h-4 text-slate-400 shrink-0" />;
                };

                return (
                  <button
                    key={lesson.id}
                    onClick={() => {
                      onSelectLesson(lesson);
                      onCloseMobile();
                    }}
                    className={`
                      w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs transition-all
                      ${isActive 
                        ? 'bg-brand-50 text-brand-700 font-bold border border-brand-200/80 shadow-xs' 
                        : 'text-slate-700 hover:bg-slate-100 font-medium'}
                    `}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      {getIcon()}
                      <span className={`truncate ${isCompleted && !isActive ? 'text-slate-500 line-through' : ''}`}>
                        {lesson.title}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 shrink-0 font-mono">
                      {lesson.duration}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
