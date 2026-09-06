import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  getStorageItem, 
  setStorageItem, 
  removeStorageItem, 
  STORAGE_KEYS, 
  DEMO_STUDENT, 
  DEMO_INSTRUCTOR,
  initializeSeedData 
} from '../utils/localStorage';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    initializeSeedData();
    return getStorageItem(STORAGE_KEYS.USER, DEMO_STUDENT);
  });

  useEffect(() => {
    if (user) {
      setStorageItem(STORAGE_KEYS.USER, user);
    } else {
      removeStorageItem(STORAGE_KEYS.USER);
    }
  }, [user]);

  const login = (email, password, role = 'student') => {
    // Check if matching demo instructor
    if (email.toLowerCase().includes('instructor') || email.toLowerCase().includes('sarah') || role === 'instructor') {
      const instructorUser = { ...DEMO_INSTRUCTOR, email: email || DEMO_INSTRUCTOR.email };
      setUser(instructorUser);
      return { success: true, user: instructorUser };
    }

    // Default to student user
    const studentUser = {
      ...DEMO_STUDENT,
      name: email ? email.split('@')[0].replace('.', ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase()) : DEMO_STUDENT.name,
      email: email || DEMO_STUDENT.email,
      role: 'student'
    };
    setUser(studentUser);
    return { success: true, user: studentUser };
  };

  const loginAsDemoStudent = () => {
    setUser(DEMO_STUDENT);
    return { success: true, user: DEMO_STUDENT };
  };

  const loginAsDemoInstructor = () => {
    setUser(DEMO_INSTRUCTOR);
    return { success: true, user: DEMO_INSTRUCTOR };
  };

  const register = ({ name, email, role = 'student' }) => {
    const newUser = {
      id: `user-${Date.now()}`,
      name: name || "New Learner",
      email: email || "learner@example.com",
      role: role || 'student',
      avatar: role === 'instructor' 
        ? "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80"
        : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      bio: role === 'instructor' ? "Passionate educator sharing industry knowledge." : "Excited to learn new skills and accelerate my career.",
      interests: ["Development", "Design"],
      headline: role === 'instructor' ? "Course Creator & Educator" : "Student",
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      hoursLearned: 0,
    };
    setUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updatedFields) => {
    setUser(prev => {
      const updated = { ...prev, ...updatedFields };
      setStorageItem(STORAGE_KEYS.USER, updated);
      return updated;
    });
    return { success: true };
  };

  const switchRole = () => {
    if (!user) {
      setUser(DEMO_STUDENT);
      return;
    }
    if (user.role === 'student') {
      setUser({ ...DEMO_INSTRUCTOR, name: user.name });
    } else {
      setUser({ ...DEMO_STUDENT, name: user.name });
    }
  };

  const isInstructor = user?.role === 'instructor';
  const isStudent = user?.role === 'student';

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isInstructor,
        isStudent,
        login,
        loginAsDemoStudent,
        loginAsDemoInstructor,
        register,
        logout,
        updateProfile,
        switchRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
