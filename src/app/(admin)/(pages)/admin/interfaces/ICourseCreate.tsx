export interface ICourseCreate {
  userId: number;
  title: string;
  description: string;
  target: string;
  result: string;
  image: string;
  duration: number;
  price: number;
  type: string;
  discountPercent: number;
}

