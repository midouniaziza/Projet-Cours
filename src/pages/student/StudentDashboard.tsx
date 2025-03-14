import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCourses } from '../../context/CourseContext';
import CourseCard from '../../components/CourseCard';
import { BookOpen } from 'lucide-react';

const StudentDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { getEnrolledCourses } = useCourses();
  
  if (!currentUser || currentUser.role !== 'student') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
          <p className="mt-2 text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }
  
  const enrolledCourses = getEnrolledCourses(currentUser.id);
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
          <Link
            to="/courses"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <BookOpen className="h-5 w-5 mr-2" />
            Browse More Courses
          </Link>
        </div>
        
        {/* Enrolled Courses */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Enrolled Courses
            </h3>
          </div>
          
          <div className="px-4 py-5 sm:p-6">
            {enrolledCourses.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {enrolledCourses.map(course => (
                  <CourseCard 
                    key={course.id} 
                    course={course} 
                    isEnrolled={true}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No courses</h3>
                <p className="mt-1 text-sm text-gray-500">
                  You haven't enrolled in any courses yet.
                </p>
                <div className="mt-6">
                  <Link
                    to="/courses"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <BookOpen className="-ml-1 mr-2 h-5 w-5" />
                    Browse Courses
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;