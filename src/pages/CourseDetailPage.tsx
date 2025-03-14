import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCourses } from '../context/CourseContext';
import { useAuth } from '../context/AuthContext';
import VideoPlayer from '../components/VideoPlayer';
import { Users, Clock, ArrowLeft, Play, BookOpen, Award } from 'lucide-react';

const CourseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getCourse, enrollInCourse } = useCourses();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const course = getCourse(id || '');
  
  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
          <div className="mb-6 flex justify-center">
            <div className="bg-red-100 p-3 rounded-full">
              <BookOpen className="h-8 w-8 text-red-500" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Course not found</h2>
          <p className="mt-3 text-gray-600">The course you're looking for doesn't exist or may have been removed.</p>
          <button
            onClick={() => navigate('/courses')}
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </button>
        </div>
      </div>
    );
  }
  
  const isEnrolled = currentUser && course.enrolledStudents.includes(currentUser.id);
  const isInstructor = currentUser && currentUser.id === course.instructorId;
  
  const handleEnroll = () => {
    if (currentUser) {
      enrollInCourse(course.id, currentUser.id);
    } else {
      navigate('/login');
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <button 
            onClick={() => navigate('/courses')}
            className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all courses
          </button>
        </div>
      
        {/* Course Header */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden mb-8">
          <div className="relative">
            <img 
              src={course.thumbnail} 
              alt={course.title} 
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end">
              <div className="p-8 text-white">
                <div className="flex items-center mb-3">
                  <span className="bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {course.videos.length > 0 ? 'Course' : 'Coming Soon'}
                  </span>
                </div>
                <h1 className="text-4xl font-bold leading-tight">{course.title}</h1>
                <p className="mt-3 text-gray-200 flex items-center">
                  <span className="font-semibold">By {course.instructorName}</span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {course.enrolledStudents.length} students
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Course Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Course Info */}
          <div className="lg:w-2/3">
            <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About this course</h2>
                <p className="text-gray-700 mb-8 leading-relaxed">{course.description}</p>
                
                {(isEnrolled || isInstructor) && (
                  <>
                    <div className="border-t border-gray-100 pt-8 mt-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <Play className="h-5 w-5 mr-2 text-indigo-600" />
                        Course Content
                      </h2>
                      {course.videos.length > 0 ? (
                        <div className="space-y-4">
                          {course.videos.map((video, index) => (
                            <div key={video.id} className="bg-gray-50 rounded-xl overflow-hidden">
                              <div className="p-1">
                                <VideoPlayer video={video} />
                              </div>
                              <div className="p-4">
                                <h3 className="font-medium text-gray-900">
                                  {index + 1}. {video.title}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">{video.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-indigo-50 rounded-xl p-6 text-center">
                          <div className="mb-4 flex justify-center">
                            <div className="bg-indigo-100 p-3 rounded-full">
                              <Clock className="h-6 w-6 text-indigo-500" />
                            </div>
                          </div>
                          <p className="text-indigo-800 font-medium">Course content is coming soon!</p>
                          <p className="text-indigo-600 text-sm mt-2">
                            The instructor is currently preparing videos for this course.
                          </p>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Right Column - Enrollment */}
          <div className="lg:w-1/3">
            <div className="bg-white shadow-lg rounded-2xl overflow-hidden sticky top-8">
              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Course Summary</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start bg-gray-50 p-4 rounded-xl">
                    <div className="bg-indigo-100 p-2 rounded-lg mr-4">
                      <Play className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Content</p>
                      <p className="text-gray-600 text-sm">{course.videos.length} videos</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start bg-gray-50 p-4 rounded-xl">
                    <div className="bg-indigo-100 p-2 rounded-lg mr-4">
                      <Users className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Students</p>
                      <p className="text-gray-600 text-sm">{course.enrolledStudents.length} enrolled</p>
                    </div>
                  </div>
                </div>
                
                {!isEnrolled && !isInstructor && (
                  <button
                    onClick={handleEnroll}
                    className="w-full py-3 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                  >
                    Enroll Now
                  </button>
                )}
                
                {isEnrolled && (
                  <div className="bg-green-50 text-green-800 p-4 rounded-xl flex items-start">
                    <div className="bg-green-100 p-2 rounded-lg mr-4">
                      <Award className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">You're enrolled!</p>
                      <p className="text-sm text-green-600 mt-1">
                        You have full access to all course content.
                      </p>
                    </div>
                  </div>
                )}
                
                {isInstructor && (
                  <div className="bg-blue-50 text-blue-800 p-4 rounded-xl flex items-start">
                    <div className="bg-blue-100 p-2 rounded-lg mr-4">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">You're the instructor</p>
                      <p className="text-sm text-blue-600 mt-1">
                        Manage this course from your dashboard.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;