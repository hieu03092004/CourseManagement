export interface ILesson {
  id: number;
  title: string;
  videoUrl: string;
  duration: number;
  orderIndex: number;
}

export interface ITopic {
  title: string;
  orderIndex: number;
  lessons: ILesson[];
}

export interface IFeedback {
  fullName: string;
  comment: string;
  rating: number;
}

export interface ICourseDetail {
  title: string;
  image: string;
  description: string;
  target: string;
  result: string;
  duration: number;
  type: string;
  price: number;
  discountPercent: number;
  rating: number;
  studentCount: number;
  reviews: number;
  feedback: IFeedback[];
  topics: ITopic[];
}

