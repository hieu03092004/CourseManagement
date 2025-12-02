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
}

