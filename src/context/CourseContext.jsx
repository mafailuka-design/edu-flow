import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  getStorageItem, 
  setStorageItem, 
  STORAGE_KEYS, 
  initializeSeedData 
} from '../utils/localStorage';
import { INITIAL_COURSES } from '../data/mockCourses';

const CourseContext = createContext();

export function CourseProvider({ children }) {
  const [courses, setCourses] = useState(() => {
    initializeSeedData();
    const stored = getStorageItem(STORAGE_KEYS.COURSES);
    return Array.isArray(stored) && stored.length > 0 ? stored : INITIAL_COURSES;
  });

  const [enrollments, setEnrollments] = useState(() => {
    return getStorageItem(STORAGE_KEYS.ENROLLMENTS, []);
  });

  const [wishlist, setWishlist] = useState(() => {
    return getStorageItem(STORAGE_KEYS.WISHLIST, []);
  });

  // Sync to localStorage
  useEffect(() => {
    setStorageItem(STORAGE_KEYS.COURSES, courses);
  }, [courses]);

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.ENROLLMENTS, enrollments);
  }, [enrollments]);

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.WISHLIST, wishlist);
  }, [wishlist]);

  const getCourseById = (id) => {
    return courses.find(c => String(c.id) === String(id)) || null;
  };

  const isEnrolled = (courseId) => {
    return enrollments.some(e => String(e.courseId) === String(courseId));
  };

  const isWishlisted = (courseId) => {
    return wishlist.some(id => String(id) === String(courseId));
  };

  const enrollInCourse = (courseId) => {
    if (isEnrolled(courseId)) return { success: true, message: "Already enrolled" };

    const newEnrollment = {
      courseId: String(courseId),
      enrolledAt: new Date().toISOString(),
      lastAccessed: new Date().toISOString()
    };

    setEnrollments(prev => [newEnrollment, ...prev]);

    // Update course student count
    setCourses(prev => prev.map(c => {
      if (String(c.id) === String(courseId)) {
        return { ...c, students: (c.students || 0) + 1 };
      }
      return c;
    }));

    // Remove from wishlist if present
    if (isWishlisted(courseId)) {
      toggleWishlist(courseId);
    }

    return { success: true, message: "Successfully enrolled!" };
  };

  const updateLastAccessed = (courseId) => {
    setEnrollments(prev => prev.map(e => {
      if (String(e.courseId) === String(courseId)) {
        return { ...e, lastAccessed: new Date().toISOString() };
      }
      return e;
    }));
  };

  const toggleWishlist = (courseId) => {
    const sId = String(courseId);
    setWishlist(prev => {
      if (prev.some(id => String(id) === sId)) {
        return prev.filter(id => String(id) !== sId);
      } else {
        return [...prev, sId];
      }
    });
  };

  const getEnrolledCourses = () => {
    return enrollments.map(e => {
      const course = courses.find(c => String(c.id) === String(e.courseId));
      return {
        ...course,
        enrolledAt: e.enrolledAt,
        lastAccessed: e.lastAccessed
      };
    }).filter(Boolean);
  };

  const getWishlistCourses = () => {
    return wishlist.map(id => courses.find(c => String(c.id) === String(id))).filter(Boolean);
  };

  // Instructor Actions
  const addCourse = (courseData) => {
    const newCourse = {
      id: `course-${Date.now()}`,
      slug: courseData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      rating: 5.0,
      reviewsCount: 0,
      students: 0,
      lastUpdated: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      reviews: [],
      ...courseData,
    };

    setCourses(prev => [newCourse, ...prev]);
    return { success: true, course: newCourse };
  };

  const updateCourse = (courseId, updatedData) => {
    setCourses(prev => prev.map(c => {
      if (String(c.id) === String(courseId)) {
        return {
          ...c,
          ...updatedData,
          lastUpdated: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        };
      }
      return c;
    }));
    return { success: true };
  };

  const deleteCourse = (courseId) => {
    setCourses(prev => prev.filter(c => String(c.id) !== String(courseId)));
    // Also remove from enrollments and wishlist
    setEnrollments(prev => prev.filter(e => String(e.courseId) !== String(courseId)));
    setWishlist(prev => prev.filter(id => String(id) !== String(courseId)));
    return { success: true };
  };

  const getInstructorCourses = (instructorIdentifier) => {
    // If no identifier, return all courses matching current user or fallback to Sarah Jenkins / Alex Rivera
    return courses.filter(c => {
      if (!instructorIdentifier) return true;
      const instName = c.instructor?.name || "";
      const instId = c.instructor?.id || "";
      return instName.toLowerCase().includes(instructorIdentifier.toLowerCase()) || 
             instId.toLowerCase().includes(instructorIdentifier.toLowerCase());
    });
  };

  return (
    <CourseContext.Provider
      value={{
        courses,
        enrollments,
        wishlist,
        getCourseById,
        isEnrolled,
        isWishlisted,
        enrollInCourse,
        toggleWishlist,
        updateLastAccessed,
        getEnrolledCourses,
        getWishlistCourses,
        addCourse,
        updateCourse,
        deleteCourse,
        getInstructorCourses
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}

export function useCourses() {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
}
