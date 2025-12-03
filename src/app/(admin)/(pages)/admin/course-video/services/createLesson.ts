import {
  IVideoItem,
  ILessonCard,
  ITopicData,
  ITopicPreview,
  ILessonData,
  IFormDataEntry,
} from "../../interfaces/CourseVideo/ICourseVideo";
import { post } from "../../../../ultils/request";

export const readVideoDuration = (file: File): Promise<number> => {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.src = url;
    video.onloadedmetadata = () => {
      const d = video.duration;
      URL.revokeObjectURL(url);
      resolve(isNaN(d) ? 0 : Math.round(d));
    };
    video.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(0);
    };
  });
};

class IdGenerator {
  private counter = 0;

  generateCardId(): string {
    return `card-${this.counter++}`;
  }

  generateVideoId(): string {
    return `video-${this.counter++}`;
  }

  reset(): void {
    this.counter = 0;
  }
}

export const idGenerator = new IdGenerator();

export const createNewVideo = (): IVideoItem => {
  return {
    id: idGenerator.generateVideoId(),
    title: "",
    file: null,
    showUpload: false,
    duration: 0,
  };
};

export const createNewCard = (): ILessonCard => {
  return {
    id: idGenerator.generateCardId(),
    topic: "",
    videos: [createNewVideo()],
  };
};

export const initializeInitialState = (): ILessonCard[] => {
  idGenerator.reset();
  return [createNewCard()];
};

export const addNewVideo = (lessonCards: ILessonCard[], cardId: string): ILessonCard[] => {
  const newVideo = createNewVideo();
  return lessonCards.map((card) =>
    card.id === cardId
      ? { ...card, videos: [...card.videos, newVideo] }
      : card
  );
};

export const addNewCard = (lessonCards: ILessonCard[], afterId: string): ILessonCard[] => {
  const newCard = createNewCard();
  const index = lessonCards.findIndex((card) => card.id === afterId);
  const newCards = [...lessonCards];
  newCards.splice(index + 1, 0, newCard);
  return newCards;
};

export const duplicateCard = (lessonCards: ILessonCard[], cardId: string): ILessonCard[] => {
  const cardToDuplicate = lessonCards.find((card) => card.id === cardId);
  if (!cardToDuplicate) return lessonCards;

  const duplicatedCard: ILessonCard = {
    ...cardToDuplicate,
    id: idGenerator.generateCardId(),
    videos: cardToDuplicate.videos.map((video) => ({
      ...video,
      id: idGenerator.generateVideoId(),
    })),
  };

  const index = lessonCards.findIndex((card) => card.id === cardId);
  const newCards = [...lessonCards];
  newCards.splice(index + 1, 0, duplicatedCard);
  return newCards;
};

export const deleteCard = (lessonCards: ILessonCard[], cardId: string): ILessonCard[] => {
  if (lessonCards.length === 1) return lessonCards;
  return lessonCards.filter((card) => card.id !== cardId);
};

export const updateTopic = (lessonCards: ILessonCard[], cardId: string, topic: string): ILessonCard[] => {
  return lessonCards.map((card) => (card.id === cardId ? { ...card, topic } : card));
};

export const updateVideoTitle = (
  lessonCards: ILessonCard[],
  cardId: string,
  videoId: string,
  title: string
): ILessonCard[] => {
  return lessonCards.map((card) =>
    card.id === cardId
      ? {
          ...card,
          videos: card.videos.map((video) =>
            video.id === videoId ? { ...video, title } : video
          ),
        }
      : card
  );
};

export const toggleShowUpload = (
  lessonCards: ILessonCard[],
  cardId: string,
  videoId: string
): ILessonCard[] => {
  return lessonCards.map((card) =>
    card.id === cardId
      ? {
          ...card,
          videos: card.videos.map((video) =>
            video.id === videoId
              ? { ...video, showUpload: !video.showUpload }
              : video
          ),
        }
      : card
  );
};

export const deleteVideo = (lessonCards: ILessonCard[], cardId: string, videoId: string): ILessonCard[] => {
  return lessonCards.map((card) =>
    card.id === cardId
      ? {
          ...card,
          videos: card.videos.filter((video) => video.id !== videoId),
        }
      : card
  );
};

export const deleteUploadedFile = (
  lessonCards: ILessonCard[],
  cardId: string,
  videoId: string
): ILessonCard[] => {
  return lessonCards.map((card) =>
    card.id === cardId
      ? {
          ...card,
          videos: card.videos.map((video) =>
            video.id === videoId
              ? { ...video, file: null, duration: 0 }
              : video
          ),
        }
      : card
  );
};

export const updateVideoFile = (
  lessonCards: ILessonCard[],
  cardId: string,
  videoId: string,
  file: File
): ILessonCard[] => {
  return lessonCards.map((card) =>
    card.id === cardId
      ? {
          ...card,
          videos: card.videos.map((video) =>
            video.id === videoId ? { ...video, file } : video
          ),
        }
      : card
  );
};

export const updateVideoDuration = (
  lessonCards: ILessonCard[],
  cardId: string,
  videoId: string,
  duration: number
): ILessonCard[] => {
  return lessonCards.map((card) =>
    card.id === cardId
      ? {
          ...card,
          videos: card.videos.map((video) =>
            video.id === videoId ? { ...video, duration } : video
          ),
        }
      : card
  );
};

export const prepareFormData = (
  lessonCards: ILessonCard[],
  courseId: string
): { formData: FormData; data: ITopicData[]; preview: ITopicPreview[]; fdEntries: IFormDataEntry[] } => {
  const formData = new FormData();
  const data: ITopicData[] = [];

  lessonCards.forEach((card, cardIndex) => {
    const cardData: ITopicData = {
      courseId: parseInt(courseId),
      topic: card.topic,
      orderIndex: cardIndex + 1,
      lessons: [],
    };

    card.videos.forEach((video, videoIndex) => {
      const fileField = `video_file_${cardIndex}_${videoIndex}`;

      cardData.lessons.push({
        title: video.title,
        duration: video.duration,
        orderIndex: videoIndex + 1,
        fileField: fileField,
      });

      if (video.file) {
        formData.append(fileField, video.file);
      }
    });

    data.push(cardData);
  });

  formData.append('course_id', courseId);
  formData.append('data', JSON.stringify(data));

  const preview: ITopicPreview[] = data.map(item => ({
    ...item,
    lessons: item.lessons.map((lesson: ILessonData) => {
      const file = formData.get(lesson.fileField) as File | null;
      return {
        title: lesson.title,
        duration: lesson.duration,
        orderIndex: lesson.orderIndex,
        video_file: file ? {
          type: 'File',
          name: file.name,
          size: file.size,
          mime: file.type
        } : null
      };
    })
  }));

  const fdEntries: IFormDataEntry[] = [];
  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      fdEntries.push({ key, type: 'File', name: value.name, size: value.size, mime: value.type });
    } else {
      fdEntries.push({ key, value });
    }
  }

  return { formData, data, preview, fdEntries };
};

export const submitLesson = async (formData: FormData): Promise<unknown> => {
  return await post('/admin/lesson/create', formData);
};

