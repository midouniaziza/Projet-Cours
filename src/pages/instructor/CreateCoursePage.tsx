import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCourses } from '../../context/CourseContext';
import { BookOpen, Upload } from 'lucide-react';

const CreateCoursePage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState<string>('https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80');
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { currentUser } = useAuth();
  const { addCourse } = useCourses();
  const navigate = useNavigate();
  
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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!title || !description) {
      setError('Please fill in all required fields');
      return;
    }
    
    // In a real application, you would upload the file here
    // and get back a URL to use
    
    addCourse({
      title,
      description,
      instructorId: currentUser.id,
      instructorName: currentUser.name,
      thumbnail,
      videos: []
    });
    
    navigate('/instructor/dashboard');
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      
      // Create a temporary URL to preview the file
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          setThumbnail(event.target.result);
        }
      };
      fileReader.readAsDataURL(file);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <div className="flex items-center">
              <BookOpen className="h-6 w-6 text-indigo-600 mr-3" />
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Create New Course
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
                    Course Title <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md px-4 py-3"
                      placeholder="Enter course title"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Course Description <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="description"
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md px-4 py-3"
                      placeholder="Provide a detailed description of your course"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">
                    Thumbnail Image
                  </label>
                  <div className="mt-1">
                    <div className="flex items-center">
                      <input
                        type="file"
                        id="thumbnail"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Choose File
                      </button>
                      <span className="ml-3 text-sm text-gray-500">
                        {thumbnailFile ? thumbnailFile.name : 'No file chosen'}
                      </span>
                    </div>
                    
                    {/* Preview of the selected image */}
                    {thumbnailFile && (
                      <div className="mt-3">
                        <img 
                          src={thumbnail} 
                          alt="Thumbnail preview" 
                          className="h-32 w-auto object-cover rounded-md shadow-sm" 
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => navigate('/instructor/dashboard')}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Create Course
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

export default CreateCoursePage;