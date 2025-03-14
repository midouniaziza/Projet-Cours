export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'instructor' | 'student';
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructorId: string;
  instructorName: string;
  thumbnail: string;
  videos: Video[];
  enrolledStudents: string[];
}

export interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  duration: string;
}