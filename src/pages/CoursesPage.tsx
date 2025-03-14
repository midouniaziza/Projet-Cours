import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CourseContext';
import CourseCard from '../components/CourseCard';
import { Search } from 'lucide-react';

const CoursesPage: React.FC = () => {
  const { courses, enrollInCourse } = useCourses();
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEnroll = (courseId: string) => {
    if (currentUser) {
      enrollInCourse(courseId, currentUser.id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            All Courses
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Browse our collection of high-quality courses
          </p>
        </div>

        {/* Search Bar */}
        <div className="mt-8 max-w-xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Course Grid */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.length > 0 ? (
            filteredCourses.map(course => (
              <CourseCard 
                key={course.id} 
                course={course} 
                isEnrolled={currentUser ? course.enrolledStudents.includes(currentUser.id) : false}
                onEnroll={() => handleEnroll(course.id)}
              />
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-gray-500 text-lg">No courses found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;