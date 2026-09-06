import { INITIAL_COURSES } from '../data/mockCourses';

export const STORAGE_KEYS = {
  USER: 'elearning_user',
  COURSES: 'elearning_courses',
  ENROLLMENTS: 'elearning_enrollments',
  PROGRESS: 'elearning_progress',
  WISHLIST: 'elearning_wishlist',
  CERTIFICATES: 'elearning_certificates',
  ACTIVITY: 'elearning_activity',
  SETTINGS: 'elearning_settings',
};

export const DEMO_STUDENT = {
  id: "user-student-1",
  name: "Alex Morgan",
  email: "alex.morgan@eduflow.io",
  role: "student",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  bio: "Frontend enthusiast & lifelong learner. Currently mastering React, Full-Stack Architecture, and UI Systems.",
  interests: ["Development", "Design", "Data Science"],
  headline: "Aspiring Full-Stack Software Engineer",
  joinedDate: "January 2026",
  hoursLearned: 38,
};

export const DEMO_INSTRUCTOR = {
  id: "user-instructor-1",
  name: "Dr. Sarah Jenkins",
  email: "sarah.jenkins@eduflow.io",
  role: "instructor",
  avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
  bio: "AI Research Scientist with 10+ years in predictive machine learning, deep learning architectures, and computational statistics.",
  interests: ["Data Science", "Development", "Business"],
  headline: "AI Research Scientist & Lead Instructor",
  joinedDate: "March 2025",
  studentsTaught: 45200,
  coursesCreated: 4,
};

export function getStorageItem(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
}

export function setStorageItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving localStorage key "${key}":`, error);
  }
}

export function removeStorageItem(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error);
  }
}

/**
 * Initializes localStorage with realistic mock data if not already present
 */
export function initializeSeedData() {
  // 1. Courses
  const existingCourses = getStorageItem(STORAGE_KEYS.COURSES);
  if (!existingCourses || !Array.isArray(existingCourses) || existingCourses.length === 0) {
    setStorageItem(STORAGE_KEYS.COURSES, INITIAL_COURSES);
  }

  // 2. Default Logged In User (starts logged in as Alex Morgan so users can immediately test dashboard & learning flows)
  const existingUser = getStorageItem(STORAGE_KEYS.USER);
  if (!existingUser) {
    setStorageItem(STORAGE_KEYS.USER, DEMO_STUDENT);
  }

  // 3. Enrollments for Demo Student
  const existingEnrollments = getStorageItem(STORAGE_KEYS.ENROLLMENTS);
  if (!existingEnrollments) {
    // Enroll in course-1 (Fullstack), course-4 (Digital Marketing), and course-8 (Public Speaking - completed)
    setStorageItem(STORAGE_KEYS.ENROLLMENTS, [
      {
        courseId: "course-1",
        enrolledAt: "2026-08-10T10:00:00.000Z",
        lastAccessed: new Date().toISOString(),
      },
      {
        courseId: "course-4",
        enrolledAt: "2026-08-15T14:30:00.000Z",
        lastAccessed: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        courseId: "course-8",
        enrolledAt: "2026-07-01T09:00:00.000Z",
        lastAccessed: new Date(Date.now() - 172800000).toISOString(),
      }
    ]);
  }

  // 4. Progress data
  const existingProgress = getStorageItem(STORAGE_KEYS.PROGRESS);
  if (!existingProgress) {
    setStorageItem(STORAGE_KEYS.PROGRESS, {
      "course-1": {
        completedLessons: ["les-1-1-1", "les-1-1-2"],
        lastLessonId: "les-1-1-3",
        quizScores: {},
        updatedAt: new Date().toISOString(),
      },
      "course-4": {
        completedLessons: ["les-4-1-1"],
        lastLessonId: "les-4-1-2",
        quizScores: {},
        updatedAt: new Date(Date.now() - 86400000).toISOString(),
      },
      "course-8": {
        // Course 8 has 6 lessons total -> all 6 completed
        completedLessons: [
          "les-8-1-1",
          "les-8-1-2",
          "les-8-1-3",
          "les-8-2-1",
          "les-8-2-2"
        ],
        lastLessonId: "les-8-2-2",
        quizScores: { "quiz-speaking-1": 100, "quiz-capstone-speaking": 100 },
        completedAt: "2026-08-20T16:00:00.000Z",
        updatedAt: "2026-08-20T16:00:00.000Z",
      }
    });
  }

  // 5. Wishlist
  const existingWishlist = getStorageItem(STORAGE_KEYS.WISHLIST);
  if (!existingWishlist) {
    setStorageItem(STORAGE_KEYS.WISHLIST, ["course-2", "course-3"]);
  }

  // 6. Certificates
  const existingCerts = getStorageItem(STORAGE_KEYS.CERTIFICATES);
  if (!existingCerts) {
    setStorageItem(STORAGE_KEYS.CERTIFICATES, [
      {
        id: "CERT-EDU-8824-A",
        courseId: "course-8",
        courseTitle: "High-Impact Public Speaking & Executive Leadership",
        instructorName: "Amara Okonjo",
        studentName: "Alex Morgan",
        issueDate: "August 20, 2026",
        score: 100,
        grade: "Distinction",
        verificationUrl: "https://eduflow.io/verify/CERT-EDU-8824-A"
      }
    ]);
  }

  // 7. Recent activity timeline
  const existingActivity = getStorageItem(STORAGE_KEYS.ACTIVITY);
  if (!existingActivity) {
    setStorageItem(STORAGE_KEYS.ACTIVITY, [
      {
        id: "act-1",
        type: "lesson_completed",
        title: "Completed 'React Component Hierarchy & State Lifecycle'",
        course: "Full-Stack React & Modern Node.js Masterclass",
        timestamp: "2 hours ago"
      },
      {
        id: "act-2",
        type: "quiz_passed",
        title: "Passed Vocal Delivery Quiz with 100%",
        course: "High-Impact Public Speaking & Executive Leadership",
        timestamp: "Yesterday"
      },
      {
        id: "act-3",
        type: "certificate_earned",
        title: "Earned Executive Leadership Certificate",
        course: "High-Impact Public Speaking & Executive Leadership",
        timestamp: "3 days ago"
      },
      {
        id: "act-4",
        type: "course_enrolled",
        title: "Enrolled in Digital Marketing & Growth Hacking 2026",
        course: "Digital Marketing & Growth Hacking 2026",
        timestamp: "5 days ago"
      }
    ]);
  }
}
