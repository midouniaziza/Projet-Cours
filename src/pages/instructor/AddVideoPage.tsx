import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCourses } from '../../context/CourseContext';
import { Video, Clock } from 'lucide-react';

const AddVideoPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [duration, setDuration] = useState('');
  const [error, setError] = useState('');
  
  const { currentUser } = useAuth();
  const { getCourse, addVideoToCourse } = useCourses();
  const navigate = useNavigate();
  
  const course = getCourse(courseId || '');
  
  if (!currentUser || currentUser.role !== 'instructor') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
          <p className="mt-2 text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }
  
  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Course not found</h2>
          <p className="mt-2 text-gray-600">The course you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/instructor/dashboard')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }
  
  if (course.instructorId !== currentUser.id) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
          <p className="mt-2 text-gray-600">You don't have permission to modify this course.</p>
          <button
            onClick={() => navigate('/instructor/dashboard')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!title || !description || !url || !duration) {
      setError('Please fill in all required fields');
      return;
    }
    
    addVideoToCourse(course.id, {
      title,
      description,
      url,
      duration
    });
    
    navigate(`/course/${course.id}`);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <div className="flex items-center">
              <Video className="h-6 w-6 text-indigo-600 mr-3" />
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Add Video to "{course.title}"
              </h3>
            </div>
          </div>
          
          <div className="px-4 py-5 sm:p-6">
            {error && (
              <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Video Title <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 block w-full sm:text-sm p-2"
                      //placeholder="e.g., Introduction to HTML"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Video Description <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="description"
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 block w-full sm:text-sm p-2"
                      //placeholder="Provide a description of this video"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                    Video URL <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 block w-full sm:text-sm p-2"
                      placeholder="https://vedio.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                    Video Duration <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Clock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="duration"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 block w-full pl-10 sm:text-sm p-2"
                      placeholder=""
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => navigate(`/course/${course.id}`)}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Add Video
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVideoPage;
