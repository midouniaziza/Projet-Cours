import React, { createContext, useState, useContext, useEffect } from 'react';
import { Course, Video } from '../types';

interface CourseContextType {
  courses: Course[];
  addCourse: (course: Omit<Course, 'id' | 'enrolledStudents'>) => void;
  getCourse: (id: string) => Course | undefined;
  enrollInCourse: (courseId: string, studentId: string) => void;
  getInstructorCourses: (instructorId: string) => Course[];
  getEnrolledCourses: (studentId: string) => Course[];
  addVideoToCourse: (courseId: string, video: Omit<Video, 'id'>) => void;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
};

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    // Load courses from localStorage on initial render
    const storedCourses = localStorage.getItem('courses');
    if (storedCourses) {
      setCourses(JSON.parse(storedCourses));
    } else {
      // Initialize with mock data if no courses exist
      const initialCourses: Course[] = [
        {
          id: '1',
          title: 'Introduction to React',
          description: 'Learn the basics of React and build your first application',
          instructorId: '1',
          instructorName: 'John Instructor',
          thumbnail: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          videos: [
            {
              id: '1',
              title: 'React Fundamentals',
              description: 'Understanding React components and props',
              url: 'https://www.example.com/video1',
              duration: '10:30'
            }
          ],
          enrolledStudents: ['2']
        }
      ];
      setCourses(initialCourses);
      localStorage.setItem('courses', JSON.stringify(initialCourses));
    }
  }, []);

  // Save courses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('courses', JSON.stringify(courses));
  }, [courses]);

  const addCourse = (course: Omit<Course, 'id' | 'enrolledStudents'>) => {
    const newCourse: Course = {
      ...course,
      id: `${Date.now()}`,
      enrolledStudents: []
    };
    setCourses(prevCourses => [...prevCourses, newCourse]);
  };

  const getCourse = (id: string) => {
    return courses.find(course => course.id === id);
  };

  const enrollInCourse = (courseId: string, studentId: string) => {
    setCourses(prevCourses => 
      prevCourses.map(course => 
        course.id === courseId && !course.enrolledStudents.includes(studentId)
          ? { ...course, enrolledStudents: [...course.enrolledStudents, studentId] }
          : course
      )
    );
  };

  const getInstructorCourses = (instructorId: string) => {
    return courses.filter(course => course.instructorId === instructorId);
  };

  const getEnrolledCourses = (studentId: string) => {
    return courses.filter(course => course.enrolledStudents.includes(studentId));
  };

  const addVideoToCourse = (courseId: string, video: Omit<Video, 'id'>) => {
    setCourses(prevCourses => 
      prevCourses.map(course => 
        course.id === courseId
          ? { 
              ...course, 
              videos: [...course.videos, { ...video, id: `${Date.now()}` }] 
            }
          : course
      )
    );
  };

  const value = {
    courses,
    addCourse,
    getCourse,
    enrollInCourse,
    getInstructorCourses,
    getEnrolledCourses,
    addVideoToCourse
  };

  return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>;
};