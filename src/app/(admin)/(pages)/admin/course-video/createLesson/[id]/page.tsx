"use client";
import { use, useState, useRef } from "react";
import { FaPlus, FaCopy, FaTrash, FaEllipsisV, FaCloudUploadAlt } from "react-icons/fa";
import { Add as AddIcon } from "@mui/icons-material";
import { Button, Menu, MenuItem } from "@mui/material";
import { post } from "../../../../../ultils/request";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

interface VideoItem {
  id: string;
  title: string;
  file: File | null;
  uploadProgress: number;
  showUpload: boolean;
  videoUrl: string;
  duration: number;
}

interface LessonCard {
  id: string;
  topic: string;
  videos: VideoItem[];
}

export default function CreateLessonPage({ params }: PageProps) {
  const { id } = use(params);
  const [lessonCards, setLessonCards] = useState<LessonCard[]>([
    {
      id: "1",
      topic: "",
      videos: [
        {
          id: "1",
          title: "",
          file: null,
          uploadProgress: 0,
          showUpload: false,
          videoUrl: "",
          duration: 0,
        },
      ],
    },
  ]);

  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
  const [menuForVideoId, setMenuForVideoId] = useState<string | null>(null);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, videoId: string) => {
    setMenuAnchorEl(event.currentTarget);
    setMenuForVideoId(videoId);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setMenuForVideoId(null);
  };

  const addNewVideo = (cardId: string) => {
    const newVideo: VideoItem = {
      id: Date.now().toString() + Math.random(),
      title: "",
      file: null,
      uploadProgress: 0,
      showUpload: false,
      videoUrl: "",
      duration: 0,
    };

    setLessonCards(
      lessonCards.map((card) =>
        card.id === cardId
          ? { ...card, videos: [...card.videos, newVideo] }
          : card
      )
    );
  };

  const addNewCard = (afterId: string) => {
    const newCard: LessonCard = {
      id: Date.now().toString(),
      topic: "",
      videos: [
        {
          id: Date.now().toString(),
          title: "",
          file: null,
          uploadProgress: 0,
          showUpload: false,
          videoUrl: "",
          duration: 0,
        },
      ],
    };

    const index = lessonCards.findIndex((card) => card.id === afterId);
    const newCards = [...lessonCards];
    newCards.splice(index + 1, 0, newCard);
    setLessonCards(newCards);
  };

  const duplicateCard = (cardId: string) => {
    const cardToDuplicate = lessonCards.find((card) => card.id === cardId);
    if (!cardToDuplicate) return;

    const duplicatedCard: LessonCard = {
      ...cardToDuplicate,
      id: Date.now().toString(),
      videos: cardToDuplicate.videos.map((video) => ({
        ...video,
        id: Date.now().toString() + Math.random(),
      })),
    };

    const index = lessonCards.findIndex((card) => card.id === cardId);
    const newCards = [...lessonCards];
    newCards.splice(index + 1, 0, duplicatedCard);
    setLessonCards(newCards);
  };

  const deleteCard = (cardId: string) => {
    if (lessonCards.length === 1) return;
    setLessonCards(lessonCards.filter((card) => card.id !== cardId));
  };

  const updateTopic = (cardId: string, topic: string) => {
    setLessonCards(
      lessonCards.map((card) => (card.id === cardId ? { ...card, topic } : card))
    );
  };

  const updateVideoTitle = (cardId: string, videoId: string, title: string) => {
    setLessonCards(
      lessonCards.map((card) =>
        card.id === cardId
          ? {
              ...card,
              videos: card.videos.map((video) =>
                video.id === videoId ? { ...video, title } : video
              ),
            }
          : card
      )
    );
  };

  const toggleShowUpload = (cardId: string, videoId: string) => {
    setLessonCards(
      lessonCards.map((card) =>
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
      )
    );
    handleMenuClose();
  };

  const deleteVideo = (cardId: string, videoId: string) => {
    setLessonCards(
      lessonCards.map((card) =>
        card.id === cardId
          ? {
              ...card,
              videos: card.videos.filter((video) => video.id !== videoId),
            }
          : card
      )
    );
    handleMenuClose();
  };

  const deleteUploadedFile = (cardId: string, videoId: string) => {
    setLessonCards(
      lessonCards.map((card) =>
        card.id === cardId
          ? {
              ...card,
              videos: card.videos.map((video) =>
                video.id === videoId
                  ? { ...video, file: null, uploadProgress: 0, videoUrl: "", duration: 0 }
                  : video
              ),
            }
          : card
      )
    );
  };

  const handleFileChange = async (cardId: string, videoId: string, file: File) => {
    // Set file và bắt đầu upload
    setLessonCards(
      lessonCards.map((card) =>
        card.id === cardId
          ? {
              ...card,
              videos: card.videos.map((video) =>
                video.id === videoId
                  ? { ...video, file, uploadProgress: 0 }
                  : video
              ),
            }
          : card
      )
    );

    // Upload file lên API route
    try {
      const formData = new FormData();
      formData.append('video', file);

      // use shared post helper (supports FormData)
      const result = await post('admin/api/upload-video', formData);

      // Cập nhật videoUrl sau khi upload thành công
      setLessonCards((prevCards) =>
        prevCards.map((card) =>
          card.id === cardId
            ? {
                ...card,
                videos: card.videos.map((video) =>
                  video.id === videoId
                    ? { ...video, videoUrl: result.videoUrl, uploadProgress: 100 }
                    : video
                ),
              }
            : card
        )
      );

      console.log('Upload success:', result);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Lỗi khi upload video!');
    }

    simulateUpload(cardId, videoId);
  };

  const simulateUpload = (cardId: string, videoId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setLessonCards((prevCards) =>
        prevCards.map((card) =>
          card.id === cardId
            ? {
                ...card,
                videos: card.videos.map((video) =>
                  video.id === videoId
                    ? { ...video, uploadProgress: progress }
                    : video
                ),
              }
            : card
        )
      );
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Tạo payload theo cấu trúc testDb.json
    const payload = lessonCards.flatMap((card, cardIndex) =>
      card.videos.map((video, videoIndex) => ({
        courseId: parseInt(id),
        topic: card.topic,
        lessons: {
          title: video.title,
          videoUrl: video.videoUrl,
          duration: video.duration,
          orderIndex: videoIndex + 1,
        },
        orderIndex: cardIndex + 1,
      }))
    );

    // Log payload dạng JSON
    console.log("JSON Payload:");
    console.log(JSON.stringify(payload, null, 2));

    // try {
    //   const result = await post("lessons", payload);
    //   console.log("Response:", result);
    //   alert("Tạo bài giảng thành công!");
    // } catch (error) {
    //   console.error("Error:", error);
    //   alert("Có lỗi xảy ra khi tạo bài giảng!");
    // }
  };

    return (
    <>
      <form method="post" onSubmit={handleSubmit}>
        <input type="hidden" name="courseId" value={id} />
        <div className="p-6 bg-gray-50 min-h-screen">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h1 className="text-2xl font-normal">Thêm bài giảng</h1>
            </div>

            <div className="space-y-6">
              {lessonCards.map((card) => (
                <div key={card.id} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-start mb-4">
                    <input
                      type="text"
                      placeholder="Chủ đề"
                      value={card.topic}
                      onChange={(e) => updateTopic(card.id, e.target.value)}
                      className="flex-1 text-lg border-b-2 border-gray-300 focus:border-[var(--color-main-admin)] outline-none pb-2"
                    />
                    <button
                      type="button"
                      onClick={() => addNewVideo(card.id)}
                      className="ml-4 w-10 h-10 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <FaPlus className="text-gray-600 text-sm" />
                    </button>
                  </div>

                  <div className="space-y-4 mb-6">
                    {card.videos.map((video) => (
                      <div key={video.id} className="lesson-item" data-video-id={video.id}>
                        <div className="flex items-center gap-3">
                          <input
                            type="text"
                            placeholder="Bài học"
                            value={video.title}
                            onChange={(e) =>
                              updateVideoTitle(card.id, video.id, e.target.value)
                            }
                            className="flex-1 border-b border-gray-300 focus:border-[var(--color-main-admin)] outline-none pb-1"
                          />
                          <button
                            type="button"
                            onClick={(e) => handleMenuOpen(e, video.id)}
                            className="p-2 hover:bg-gray-100 rounded transition-colors"
                          >
                            <FaEllipsisV className="text-gray-600" />
                          </button>
                          <Menu
                            anchorEl={menuAnchorEl}
                            open={menuForVideoId === video.id}
                            onClose={handleMenuClose}
                          >
                            <MenuItem onClick={() => deleteVideo(card.id, video.id)}>
                              Xóa
                            </MenuItem>
                            <MenuItem onClick={() => toggleShowUpload(card.id, video.id)}>
                              Thêm video
                            </MenuItem>
                          </Menu>
                        </div>

                        <div className={`mt-3 max-w-[95%] upload-area ${!video.showUpload ? 'hidden' : ''}`}>
                            {!video.file ? (
                              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                                <div className="flex flex-col items-center">
                                  <FaCloudUploadAlt className="text-blue-500 text-5xl mb-3" />
                                  <div className="text-sm text-gray-600 mb-1">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        fileInputRefs.current[video.id]?.click()
                                      }
                                      className="text-blue-500 hover:underline font-medium"
                                    >
                                      Click to Upload
                                    </button>
                                    {" "}or drag and drop
                                  </div>
                                  <input
                                    ref={(el) => {
                                      fileInputRefs.current[video.id] = el;
                                    }}
                                    type="file"
                                    accept="video/*"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        handleFileChange(card.id, video.id, file);
                                      }
                                    }}
                                    className="hidden"
                                  />
                                </div>
                              </div>
                            ) : (
                              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-colors">
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                    <div className="flex items-center gap-3">
                                      <div className="text-blue-500">
                                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                        </svg>
                                      </div>
                                      <div className="text-left">
                                        <div className="text-sm font-medium text-gray-900">
                                          {video.file.name}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                          {(video.file.size / 1024).toFixed(2)} KB
                                        </div>
                                      </div>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => deleteUploadedFile(card.id, video.id)}
                                      className="text-red-500 hover:text-red-700 p-2"
                                    >
                                      <FaTrash />
                                    </button>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                      style={{ width: `${video.uploadProgress}%` }}
                                    />
                                  </div>
                                  <div className="text-right text-sm text-gray-600">
                                    {video.uploadProgress}%
                                  </div>
                                </div>
                              </div>
                            )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => addNewCard(card.id)}
                      className="text-blue-500 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                    >
                      <FaPlus className="text-xs" />
                      Thêm chủ đề
                    </button>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => duplicateCard(card.id)}
                        className="p-2 hover:bg-gray-100 rounded transition-colors"
                        title="Sao chép"
                      >
                        <FaCopy className="text-gray-600 text-lg" />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteCard(card.id)}
                        className="p-2 hover:bg-gray-100 rounded transition-colors"
                        title="Xóa"
                        disabled={lessonCards.length === 1}
                      >
                        <FaTrash
                          className={`text-lg ${
                            lessonCards.length === 1
                              ? "text-gray-300"
                              : "text-gray-600"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <Button variant="contained" type="submit" startIcon={<AddIcon />}>
                Tạo bài giảng
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
    );
}
