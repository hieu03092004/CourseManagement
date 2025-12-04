export interface IVideoItem {
  id: string;
  title: string;
  file: File | null;
  showUpload: boolean;
  duration: number;
}

export interface ILessonCard {
  id: string;
  topic: string;
  videos: IVideoItem[];
}

export interface ILessonData {
  title: string;
  duration: number;
  orderIndex: number;
  fileField: string;
}

export interface ITopicData {
  courseId: number;
  topic: string;
  orderIndex: number;
  lessons: ILessonData[];
}

export interface IFormDataEntry {
  key: string;
  type?: string;
  name?: string;
  size?: number;
  mime?: string;
  value?: unknown;
}

export interface IVideoFileInfo {
  type: string;
  name: string;
  size: number;
  mime: string;
}

export interface ILessonPreview {
  title: string;
  duration: number;
  orderIndex: number;
  video_file: IVideoFileInfo | null;
}

export interface ITopicPreview {
  courseId: number;
  topic: string;
  orderIndex: number;
  lessons: ILessonPreview[];
}

export interface ICreateLessonPageProps {
  params: Promise<{
    id: string;
  }>;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  instructor: string;
  avavatarInstructor?: string;
  lectures: number;
  students: number;
  rating?: number;
  reviews: number;
  price: number;
  originalPrice: number;
  image: string;
  duration: number;
}

export interface ICourseDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * Interface cho Lesson data từ API getDataDetailCourse
 * Mapping từ Table lesson
 */
export interface ILesson {
  id: number;
  title: string;
  videoUrl: string;
  duration: number;
  orderIndex: number;
}

/**
 * Interface cho Topic data từ API getDataDetailCourse
 * Mapping từ Table course_modules
 */
export interface ITopic {
  title: string;
  orderIndex: number;
  lessons: ILesson[];
}

/**
 * Interface cho Course Detail Data từ API /admin/courses/details/{id}
 * Structure data FE cần bên BE trả ra cho trang details và edit
 */
export interface ICourseDetailData {
  title: string;
  description: string;
  target: string;
  result: string;
  image: string;
  duration: number;
  price: number;
  type: string;
  discountPercent: number;
  rating: number;
  studentCount: number;
  reviews: number;
  topics: ITopic[];
}
