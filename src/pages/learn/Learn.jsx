import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Menu, 
  Award, 
  ChevronLeft, 
  ChevronRight,
  CheckCircle2,
  HelpCircle,
  FileText,
  Download
} from 'lucide-react';
import { useCourses } from '../../context/CourseContext';
import { useProgress } from '../../context/ProgressContext';
import VideoPlayer from '../../components/learn/VideoPlayer';
import LessonSidebar from '../../components/learn/LessonSidebar';
import ProgressBar from '../../components/common/ProgressBar';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

export default function Learn() {
  const { courseId } = useParams();
  const { getCourseById } = useCourses();
  const { 
    isLessonCompleted, 
    markLessonCompleted, 
    getCourseProgress, 
    setLastLesson 
  } = useProgress();
  const navigate = useNavigate();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('notes'); // notes | resources | discussion

  const course = getCourseById(courseId);

  // Flatten all lessons in order
  const allLessons = [];
  if (course?.modules) {
    course.modules.forEach(m => {
      m.lessons?.forEach(l => {
        allLessons.push({ ...l, moduleTitle: m.title });
      });
    });
  }

  // Determine current active lesson
  const courseProgress = course ? getCourseProgress(course) : null;
  const initialLessonId = courseProgress?.lastLessonId || allLessons[0]?.id;

  const [currentLessonId, setCurrentLessonId] = useState(initialLessonId);

  const currentLessonIndex = allLessons.findIndex(l => l.id === currentLessonId);
  const currentLesson = allLessons[currentLessonIndex] || allLessons[0] || null;

  const prevLesson = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
  const nextLesson = currentLessonIndex < allLessons.length - 1 ? allLessons[currentLessonIndex + 1] : null;

  const isCurrentCompleted = currentLesson ? isLessonCompleted(courseId, currentLesson.id) : false;

  useEffect(() => {
    if (courseId && currentLesson?.id) {
      setLastLesson(courseId, currentLesson.id);
    }
  }, [courseId, currentLesson?.id]);

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Course Not Found</h2>
        <Link to="/courses">
          <Button variant="primary">Browse Courses</Button>
        </Link>
      </div>
    );
  }

  const handleToggleComplete = () => {
    if (currentLesson) {
      markLessonCompleted(course.id, currentLesson.id, !isCurrentCompleted);
    }
  };

  const handleNext = () => {
    if (nextLesson) {
      setCurrentLessonId(nextLesson.id);
    }
  };

  const handlePrev = () => {
    if (prevLesson) {
      setCurrentLessonId(prevLesson.id);
    }
  };

  const handleTakeQuiz = () => {
    const quizId = currentLesson.quizId || "quiz-react-1";
    navigate(`/learn/${course.id}/quiz/${quizId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      
      {/* Top Learning Navigation Bar */}
      <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between gap-4 shrink-0 z-30">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="md:hidden p-2 text-slate-500 hover:text-slate-900 rounded-xl hover:bg-slate-100"
            aria-label="Open curriculum drawer"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link
            to="/dashboard/courses"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>

          <span className="hidden sm:inline text-slate-300">|</span>

          <div className="min-w-0">
            <h1 className="text-sm font-bold text-slate-900 truncate">
              {course.title}
            </h1>
            <p className="text-[11px] text-slate-500 truncate hidden md:block">
              {currentLesson?.moduleTitle} • {currentLesson?.title}
            </p>
          </div>
        </div>

        {/* Course Progress in Header */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="w-36 hidden sm:block">
            <ProgressBar
              value={courseProgress.percentage}
              size="xs"
              showLabel={true}
              label="Progress"
              color={courseProgress.isFinished ? "emerald" : "brand"}
            />
          </div>

          {courseProgress.isFinished && (
            <Link to="/dashboard/certificates">
              <Badge variant="success" size="xs" icon={Award}>
                Certificate Ready
              </Badge>
            </Link>
          )}
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Desktop Sticky Sidebar */}
        <div className="hidden md:block shrink-0 h-[calc(100vh-4rem)]">
          <LessonSidebar
            course={course}
            progress={courseProgress}
            activeLessonId={currentLesson?.id}
            onSelectLesson={(l) => setCurrentLessonId(l.id)}
          />
        </div>

        {/* Mobile Curriculum Drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <div 
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative w-80 max-w-[85vw] bg-white h-full z-10 shadow-2xl flex flex-col">
              <LessonSidebar
                course={course}
                progress={courseProgress}
                activeLessonId={currentLesson?.id}
                onSelectLesson={(l) => setCurrentLessonId(l.id)}
                onCloseMobile={() => setMobileSidebarOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Center Learning Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Interactive Player / Reader */}
            <VideoPlayer
              lesson={currentLesson}
              courseTitle={course.title}
              isCompleted={isCurrentCompleted}
              onMarkComplete={() => markLessonCompleted(course.id, currentLesson.id, true)}
              onTakeQuiz={handleTakeQuiz}
            />

            {/* Stepper Navigation Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-soft flex flex-wrap items-center justify-between gap-3">
              <Button
                variant="outline"
                size="sm"
                disabled={!prevLesson}
                onClick={handlePrev}
                leftIcon={ChevronLeft}
              >
                Previous Lesson
              </Button>

              <div className="flex items-center gap-2">
                {currentLesson?.type === 'quiz' ? (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleTakeQuiz}
                    leftIcon={HelpCircle}
                  >
                    Launch Quiz
                  </Button>
                ) : (
                  <Button
                    variant={isCurrentCompleted ? "success" : "primary"}
                    size="sm"
                    onClick={handleToggleComplete}
                    leftIcon={CheckCircle2}
                  >
                    {isCurrentCompleted ? "Completed ✓" : "Mark as Complete"}
                  </Button>
                )}
              </div>

              <Button
                variant="secondary"
                size="sm"
                disabled={!nextLesson}
                onClick={handleNext}
                rightIcon={ChevronRight}
              >
                Next Lesson
              </Button>
            </div>

            {/* Lesson Details Tabs */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden">
              <div className="flex items-center gap-4 px-6 pt-4 border-b border-slate-100 text-sm font-bold">
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`pb-3 border-b-2 transition-colors ${activeTab === 'notes' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                >
                  Lesson Overview & Notes
                </button>
                <button
                  onClick={() => setActiveTab('resources')}
                  className={`pb-3 border-b-2 transition-colors ${activeTab === 'resources' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                >
                  Resources & Downloads (3)
                </button>
                <button
                  onClick={() => setActiveTab('discussion')}
                  className={`pb-3 border-b-2 transition-colors ${activeTab === 'discussion' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                >
                  Student Discussion
                </button>
              </div>

              <div className="p-6 sm:p-8">
                {activeTab === 'notes' && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-slate-900">{currentLesson?.title}</h2>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                      {currentLesson?.summary}
                    </p>
                    {currentLesson?.content && (
                      <div className="pt-4 border-t border-slate-100 text-sm text-slate-700 leading-relaxed whitespace-pre-line space-y-2">
                        {currentLesson.content}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'resources' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-500 mb-2">Download supplemental files for this module:</p>
                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-brand-600" />
                        <div>
                          <p className="text-xs font-bold text-slate-900">Lecture-Cheatsheet.pdf</p>
                          <p className="text-[10px] text-slate-400">PDF • 1.4 MB</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" leftIcon={Download}>Download</Button>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-brand-600" />
                        <div>
                          <p className="text-xs font-bold text-slate-900">Starter-Project-Repository.zip</p>
                          <p className="text-[10px] text-slate-400">ZIP • 4.8 MB</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" leftIcon={Download}>Download</Button>
                    </div>
                  </div>
                )}

                {activeTab === 'discussion' && (
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <input
                        type="text"
                        placeholder="Ask a question about this lecture..."
                        className="flex-1 px-4 py-2.5 bg-slate-50 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-brand-500"
                      />
                      <Button variant="primary" size="sm">Post Question</Button>
                    </div>

                    <div className="space-y-3 pt-2">
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-900">Marcus T.</span>
                          <span className="text-slate-400">1 day ago</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600">
                          "Great explanation of state reconciliation! Does this also apply to nested custom hooks?"
                        </p>
                        <p className="text-xs text-brand-600 font-semibold pt-1">
                          ↳ Instructor Alex Rivera: "Yes! React tracks hook order per fiber node regardless of nesting."
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </main>

      </div>

    </div>
  );
}
