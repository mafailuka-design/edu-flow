import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  getStorageItem, 
  setStorageItem, 
  STORAGE_KEYS, 
  initializeSeedData 
} from '../utils/localStorage';
import { useAuth } from './AuthContext';
import { useCourses } from './CourseContext';

const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const { user } = useAuth();
  const { courses } = useCourses();

  const [progress, setProgress] = useState(() => {
    initializeSeedData();
    return getStorageItem(STORAGE_KEYS.PROGRESS, {});
  });

  const [certificates, setCertificates] = useState(() => {
    return getStorageItem(STORAGE_KEYS.CERTIFICATES, []);
  });

  const [activity, setActivity] = useState(() => {
    return getStorageItem(STORAGE_KEYS.ACTIVITY, []);
  });

  // Sync with localStorage
  useEffect(() => {
    setStorageItem(STORAGE_KEYS.PROGRESS, progress);
  }, [progress]);

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.CERTIFICATES, certificates);
  }, [certificates]);

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.ACTIVITY, activity);
  }, [activity]);

  const addActivity = (item) => {
    const newAct = {
      id: `act-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: "Just now",
      ...item
    };
    setActivity(prev => [newAct, ...prev.slice(0, 19)]);
  };

  const isLessonCompleted = (courseId, lessonId) => {
    const courseProgress = progress[String(courseId)];
    if (!courseProgress || !courseProgress.completedLessons) return false;
    return courseProgress.completedLessons.includes(String(lessonId));
  };

  const getCourseProgress = (courseOrId) => {
    const course = typeof courseOrId === 'object' && courseOrId !== null
      ? courseOrId 
      : courses.find(c => String(c.id) === String(courseOrId));

    if (!course) {
      return { completedCount: 0, totalCount: 0, percentage: 0, isFinished: false, completedLessons: [] };
    }

    // Calculate total lessons in course
    let totalCount = 0;
    const allLessonIds = [];
    if (course.modules && Array.isArray(course.modules)) {
      course.modules.forEach(m => {
        if (m.lessons && Array.isArray(m.lessons)) {
          m.lessons.forEach(l => {
            totalCount += 1;
            allLessonIds.push(String(l.id));
          });
        }
      });
    }

    if (totalCount === 0) totalCount = course.totalLessons || 1;

    const courseProgress = progress[String(course.id)];
    const completedLessons = courseProgress?.completedLessons || [];
    const completedCount = completedLessons.length;
    const percentage = Math.min(100, Math.round((completedCount / totalCount) * 100));
    const isFinished = percentage === 100;

    return {
      completedCount,
      totalCount,
      percentage,
      isFinished,
      completedLessons,
      lastLessonId: courseProgress?.lastLessonId || null
    };
  };

  const markLessonCompleted = (courseId, lessonId, shouldComplete = true) => {
    const cId = String(courseId);
    const lId = String(lessonId);

    const currentCourse = courses.find(c => String(c.id) === cId);
    let courseName = currentCourse?.title || "Course";

    setProgress(prev => {
      const current = prev[cId] || { completedLessons: [], quizScores: {} };
      let updatedLessons = [...(current.completedLessons || [])];

      if (shouldComplete && !updatedLessons.includes(lId)) {
        updatedLessons.push(lId);
      } else if (!shouldComplete && updatedLessons.includes(lId)) {
        updatedLessons = updatedLessons.filter(id => id !== lId);
      }

      const updatedCourseProgress = {
        ...current,
        completedLessons: updatedLessons,
        lastLessonId: lId,
        updatedAt: new Date().toISOString()
      };

      // Check if course is now 100% completed
      if (currentCourse) {
        let totalLessonsCount = 0;
        currentCourse.modules?.forEach(m => {
          totalLessonsCount += m.lessons?.length || 0;
        });
        if (totalLessonsCount > 0 && updatedLessons.length >= totalLessonsCount) {
          updatedCourseProgress.completedAt = new Date().toISOString();
          // Issue Certificate automatically
          issueCertificate(currentCourse);
        }
      }

      return {
        ...prev,
        [cId]: updatedCourseProgress
      };
    });

    if (shouldComplete) {
      addActivity({
        type: "lesson_completed",
        title: `Completed lesson in ${courseName}`,
        course: courseName
      });
    }
  };

  const setLastLesson = (courseId, lessonId) => {
    const cId = String(courseId);
    setProgress(prev => ({
      ...prev,
      [cId]: {
        ...(prev[cId] || { completedLessons: [] }),
        lastLessonId: String(lessonId),
        updatedAt: new Date().toISOString()
      }
    }));
  };

  const issueCertificate = (course) => {
    const existing = certificates.find(c => String(c.courseId) === String(course.id));
    if (existing) return existing;

    const newCert = {
      id: `CERT-EDU-${Math.floor(1000 + Math.random() * 9000)}-${course.id.replace(/\D/g, '') || 'X'}`,
      courseId: String(course.id),
      courseTitle: course.title,
      instructorName: course.instructor?.name || "EduFlow Senior Faculty",
      studentName: user?.name || "Alex Morgan",
      issueDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      score: 95,
      grade: "Distinction",
      verificationUrl: `https://eduflow.io/verify/cert-${course.id}`
    };

    setCertificates(prev => [newCert, ...prev]);

    addActivity({
      type: "certificate_earned",
      title: `Earned Certificate of Completion for "${course.title}"`,
      course: course.title
    });

    // Celebratory confetti animation
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback if confetti fails in some environment
    }

    return newCert;
  };

  const submitQuizScore = (courseId, quizId, scorePercentage, passingScore = 75) => {
    const cId = String(courseId);
    const passed = scorePercentage >= passingScore;

    setProgress(prev => {
      const current = prev[cId] || { completedLessons: [], quizScores: {} };
      const currentScores = current.quizScores || {};

      return {
        ...prev,
        [cId]: {
          ...current,
          quizScores: {
            ...currentScores,
            [quizId]: scorePercentage
          },
          updatedAt: new Date().toISOString()
        }
      };
    });

    const currentCourse = courses.find(c => String(c.id) === cId);
    const courseName = currentCourse?.title || "Course";

    addActivity({
      type: passed ? "quiz_passed" : "quiz_attempted",
      title: `${passed ? 'Passed' : 'Completed'} quiz with ${scorePercentage}%`,
      course: courseName
    });

    if (passed) {
      // Find lesson corresponding to this quiz and mark completed
      if (currentCourse?.modules) {
        currentCourse.modules.forEach(m => {
          m.lessons?.forEach(l => {
            if (l.quizId === quizId || l.type === 'quiz') {
              markLessonCompleted(courseId, l.id, true);
            }
          });
        });
      }

      // Celebratory burst
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }

    return { passed, score: scorePercentage };
  };

  const getQuizScore = (courseId, quizId) => {
    return progress[String(courseId)]?.quizScores?.[quizId] ?? null;
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        certificates,
        activity,
        isLessonCompleted,
        getCourseProgress,
        markLessonCompleted,
        setLastLesson,
        submitQuizScore,
        getQuizScore,
        issueCertificate,
        addActivity
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
