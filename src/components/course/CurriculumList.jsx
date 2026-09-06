import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  PlayCircle, 
  FileText, 
  HelpCircle, 
  CheckCircle2, 
  Lock
} from 'lucide-react';
import Badge from '../common/Badge';

export default function CurriculumList({
  modules = [],
  completedLessons = [],
  activeLessonId = null,
  onSelectLesson = null,
  isEnrolled = false
}) {
  // Open all modules by default
  const [openModules, setOpenModules] = useState(() => {
    return modules.reduce((acc, m) => {
      acc[m.id] = true;
      return acc;
    }, {});
  });

  const toggleModule = (modId) => {
    setOpenModules(prev => ({
      ...prev,
      [modId]: !prev[modId]
    }));
  };

  const getLessonIcon = (type, isCompleted) => {
    if (isCompleted) return <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />;
    switch (type) {
      case 'reading':
        return <FileText className="w-4 h-4 text-blue-500 shrink-0" />;
      case 'quiz':
        return <HelpCircle className="w-4 h-4 text-purple-500 shrink-0" />;
      default:
        return <PlayCircle className="w-4 h-4 text-brand-600 shrink-0" />;
    }
  };

  if (!modules || modules.length === 0) {
    return (
      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center text-sm text-slate-500">
        Curriculum details are being finalized by the instructor.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {modules.map((mod, index) => {
        const isOpen = openModules[mod.id];
        const moduleCompletedCount = mod.lessons?.filter(l => completedLessons.includes(l.id)).length || 0;
        const moduleTotalCount = mod.lessons?.length || 0;
        const isModuleDone = moduleTotalCount > 0 && moduleCompletedCount === moduleTotalCount;

        return (
          <div key={mod.id} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs">
            {/* Module Accordion Header */}
            <button
              onClick={() => toggleModule(mod.id)}
              className="w-full flex items-center justify-between p-4 sm:p-5 bg-slate-50/70 hover:bg-slate-50 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${isModuleDone ? 'bg-emerald-100 text-emerald-700' : 'bg-brand-100 text-brand-700'}`}>
                  {isModuleDone ? <CheckCircle2 className="w-4 h-4" /> : index + 1}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">
                    {mod.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                    <span>{moduleTotalCount} lessons</span>
                    <span>•</span>
                    <span>{mod.duration || '45m'}</span>
                    {isEnrolled && (
                      <>
                        <span>•</span>
                        <span className={isModuleDone ? "text-emerald-600 font-semibold" : ""}>
                          {moduleCompletedCount}/{moduleTotalCount} completed
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-slate-400">
                {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </button>

            {/* Lesson Items */}
            {isOpen && (
              <div className="divide-y divide-slate-100 border-t border-slate-100">
                {mod.lessons?.map((lesson, lIdx) => {
                  const isCompleted = completedLessons.includes(lesson.id);
                  const isActive = activeLessonId === lesson.id;

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => onSelectLesson && onSelectLesson(lesson)}
                      className={`
                        p-3.5 sm:px-5 flex items-center justify-between gap-3 transition-colors
                        ${onSelectLesson ? 'cursor-pointer hover:bg-brand-50/40' : ''}
                        ${isActive ? 'bg-brand-50 border-l-4 border-l-brand-600 font-semibold' : ''}
                      `}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {getLessonIcon(lesson.type, isCompleted)}
                        <span className={`text-xs sm:text-sm truncate ${isActive ? 'text-brand-700 font-bold' : isCompleted ? 'text-slate-600 line-through' : 'text-slate-800'}`}>
                          {lesson.title}
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5 shrink-0 text-xs text-slate-400">
                        <Badge variant="default" size="xs" className="uppercase text-[10px] hidden sm:inline-flex">
                          {lesson.type}
                        </Badge>
                        <span>{lesson.duration}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
