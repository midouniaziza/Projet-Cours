import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CourseProvider } from './context/CourseContext';
import Navbar from './components/Navbar';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import InstructorDashboard from './pages/instructor/InstructorDashboard';
import CreateCoursePage from './pages/instructor/CreateCoursePage';
import AddVideoPage from './pages/instructor/AddVideoPage';
import StudentDashboard from './pages/student/StudentDashboard';

// Protected route component
const ProtectedRoute: React.FC<{ 
  children: React.ReactNode;
  allowedRoles?: ('instructor' | 'student')[];
}> = ({ children, allowedRoles }) => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/" />;
  }
  
  return <>{children}</>;
};

function AppRoutes() {
  return (
    <Router>
      <AuthProvider>
        <CourseProvider>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/course/:id" element={<CourseDetailPage />} />
              
              {/* Instructor Routes */}
              <Route 
                path="/instructor/dashboard" 
                element={
                  <ProtectedRoute allowedRoles={['instructor']}>
                    <InstructorDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/instructor/create-course" 
                element={
                  <ProtectedRoute allowedRoles={['instructor']}>
                    <CreateCoursePage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/instructor/course/:courseId/add-video" 
                element={
                  <ProtectedRoute allowedRoles={['instructor']}>
                    <AddVideoPage />
                  </ProtectedRoute>
                } 
              />
              
              {/* Student Routes */}
              <Route 
                path="/student/dashboard" 
                element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <StudentDashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </CourseProvider>
      </AuthProvider>
    </Router>
  );
}

function App() {
  return <AppRoutes />;
}

export default App;