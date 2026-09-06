import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { CourseProvider } from './context/CourseContext';
import { ProgressProvider } from './context/ProgressContext';

// Layouts & Guards
import ProtectedRoute from './routes/ProtectedRoute';
import StudentLayout from './components/layout/StudentLayout';
import InstructorLayout from './components/layout/InstructorLayout';

// Public Pages
import Home from './pages/public/Home';
import Courses from './pages/public/Courses';
import CourseDetails from './pages/public/CourseDetails';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import NotFound from './pages/public/NotFound';

// Student Pages
import Dashboard from './pages/student/Dashboard';
import MyCourses from './pages/student/MyCourses';
import Wishlist from './pages/student/Wishlist';
import Certificates from './pages/student/Certificates';
import Profile from './pages/student/Profile';
import Settings from './pages/student/Settings';

// Learning Interface
import Learn from './pages/learn/Learn';
import Quiz from './pages/learn/Quiz';

// Instructor Pages
import InstructorDashboard from './pages/instructor/InstructorDashboard';
import InstructorCourses from './pages/instructor/InstructorCourses';
import CreateCourse from './pages/instructor/CreateCourse';
import EditCourse from './pages/instructor/EditCourse';
import InstructorProfile from './pages/instructor/InstructorProfile';
import InstructorSettings from './pages/instructor/InstructorSettings';

// Helper to scroll to top on every navigation
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AuthProvider>
        <CourseProvider>
          <ProgressProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:id" element={<CourseDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Student Dashboard Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <StudentLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="courses" element={<MyCourses />} />
                <Route path="wishlist" element={<Wishlist />} />
                <Route path="certificates" element={<Certificates />} />
                <Route path="profile" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              {/* Dedicated Learning Player & Quiz (Protected) */}
              <Route
                path="/learn/:courseId"
                element={
                  <ProtectedRoute>
                    <Learn />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/learn/:courseId/quiz/:quizId"
                element={
                  <ProtectedRoute>
                    <Quiz />
                  </ProtectedRoute>
                }
              />

              {/* Instructor Portal Protected Routes */}
              <Route
                path="/instructor"
                element={
                  <ProtectedRoute requireInstructor={true}>
                    <InstructorLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<InstructorDashboard />} />
                <Route path="courses" element={<InstructorCourses />} />
                <Route path="create-course" element={<CreateCourse />} />
                <Route path="courses/:id/edit" element={<EditCourse />} />
                <Route path="profile" element={<InstructorProfile />} />
                <Route path="settings" element={<InstructorSettings />} />
              </Route>

              {/* 404 Catch-All */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ProgressProvider>
        </CourseProvider>
      </AuthProvider>
    </Router>
  );
}
