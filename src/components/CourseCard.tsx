import React from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../types';
import { Users } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  isEnrolled?: boolean;
  onEnroll?: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, isEnrolled, onEnroll }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={course.thumbnail} 
        alt={course.title} 
        className="w-full h-48 object-cover"
      />
      
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
        <p className="text-gray-600 mb-4">{course.description}</p>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Users className="h-4 w-4 mr-1" />
          <span>{course.enrolledStudents.length} students enrolled</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-600">By {course.instructorName}</span>
          
          {isEnrolled !== undefined && (
            isEnrolled ? (
              <Link 
                to={`/course/${course.id}`}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                View Course
              </Link>
            ) : (
              <button
                onClick={onEnroll}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Enroll Now
              </button>
            )
          )}
          
          {isEnrolled === undefined && (
            <Link 
              to={`/course/${course.id}`}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              View Details
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;