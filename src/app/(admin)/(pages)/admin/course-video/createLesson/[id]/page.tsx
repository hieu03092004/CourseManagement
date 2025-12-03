"use client";
import { use, useState, useRef } from "react";
import { FaPlus, FaCopy, FaTrash, FaEllipsisV, FaCloudUploadAlt } from "react-icons/fa";
import { Add as AddIcon } from "@mui/icons-material";
import { Button, Menu, MenuItem } from "@mui/material";
import {
  ICreateLessonPageProps,
  IVideoItem,
  ILessonCard,
} from "../../../interfaces/CourseVideo/ICourseVideo";
import {
  readVideoDuration,
  deleteCard,
  updateTopic,
  updateVideoTitle,
  toggleShowUpload,
  deleteVideo,
  deleteUploadedFile,
  updateVideoFile,
  updateVideoDuration,
  prepareFormData,
  submitLesson,
  addNewVideo,
  addNewCard,
  duplicateCard,
  initializeInitialState,
} from "../../services/createLesson";
import { handleResponse, getErrorMessage } from "../../../../../../../helpers/api/response/handleResponse";
import { IApiResponse } from "../../../../../../../helpers/api/response/IResponse";

type PageProps = ICreateLessonPageProps;
type VideoItem = IVideoItem;
type LessonCard = ILessonCard;

export default function CreateLessonPage({ params }: PageProps) {
  const resolvedParams = use(params) as { id: string };
  const { id } = resolvedParams;
  
  const [lessonCards, setLessonCards] = useState<LessonCard[]>(initializeInitialState);

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

  const handleAddNewVideo = (cardId: string) => {
    setLessonCards(addNewVideo(lessonCards, cardId));
  };

  const handleAddNewCard = (afterId: string) => {
    setLessonCards(addNewCard(lessonCards, afterId));
  };

  const handleDuplicateCard = (cardId: string) => {
    setLessonCards(duplicateCard(lessonCards, cardId));
  };

  const handleDeleteCard = (cardId: string) => {
    setLessonCards(deleteCard(lessonCards, cardId));
  };

  const handleUpdateTopic = (cardId: string, topic: string) => {
    setLessonCards(updateTopic(lessonCards, cardId, topic));
  };

  const handleUpdateVideoTitle = (cardId: string, videoId: string, title: string) => {
    setLessonCards(updateVideoTitle(lessonCards, cardId, videoId, title));
  };

  const handleToggleShowUpload = (cardId: string, videoId: string) => {
    setLessonCards(toggleShowUpload(lessonCards, cardId, videoId));
    handleMenuClose();
  };

  const handleDeleteVideo = (cardId: string, videoId: string) => {
    setLessonCards(deleteVideo(lessonCards, cardId, videoId));
    handleMenuClose();
  };

  const handleDeleteUploadedFile = (cardId: string, videoId: string) => {
    setLessonCards(deleteUploadedFile(lessonCards, cardId, videoId));
  };

  const handleFileChange = async (cardId: string, videoId: string, file: File) => {
    setLessonCards(updateVideoFile(lessonCards, cardId, videoId, file));
    const duration = await readVideoDuration(file);
    setLessonCards((prev) => updateVideoDuration(prev, cardId, videoId, duration));
  };

  // Bỏ mô phỏng progress: không còn dùng

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { formData } = prepareFormData(lessonCards, id);

    try {
      const result = await submitLesson(formData) as IApiResponse;
      const { isSuccess, error } = handleResponse(result);
      
      if (isSuccess) {
        console.log("Response:", result);
        alert("Tạo bài giảng thành công!");
        setLessonCards(initializeInitialState());
        handleMenuClose();
      } else {
        const errorMessage = error?.message || 'Có lỗi xảy ra khi tạo bài giảng!';
        console.error("Error:", error);
        alert(errorMessage);
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      console.error("Error:", error);
      alert(errorMessage);
    }
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
                      onChange={(e) => handleUpdateTopic(card.id, e.target.value)}
                      className="flex-1 text-lg border-b-2 border-gray-300 focus:border-[var(--color-main-admin)] outline-none pb-2"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddNewVideo(card.id)}
                      className="ml-4 w-10 h-10 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <FaPlus className="text-gray-600 text-sm" />
                    </button>
                  </div>

                  <div className="space-y-4 mb-6">
                    {(card.videos || []).map((video: VideoItem) => (
                      <div key={video.id} className="lesson-item" data-video-id={video.id}>
                        <div className="flex items-center gap-3">
                          <input
                            type="text"
                            placeholder="Bài học"
                            value={video.title}
                            onChange={(e) =>
                              handleUpdateVideoTitle(card.id, video.id, e.target.value)
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
                            <MenuItem onClick={() => handleDeleteVideo(card.id, video.id)}>
                              Xóa
                            </MenuItem>
                            <MenuItem onClick={() => handleToggleShowUpload(card.id, video.id)}>
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
                                          {(video.file.size / 1024).toFixed(2)} KB • Duration: {video.duration}s
                                        </div>
                                      </div>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteUploadedFile(card.id, video.id)}
                                      className="text-red-500 hover:text-red-700 p-2"
                                    >
                                      <FaTrash />
                                    </button>
                                  </div>
                                  {/* Đã bỏ progress bar */}
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
                      onClick={() => handleAddNewCard(card.id)}
                      className="text-blue-500 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                    >
                      <FaPlus className="text-xs" />
                      Thêm chủ đề
                    </button>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => handleDuplicateCard(card.id)}
                        className="p-2 hover:bg-gray-100 rounded transition-colors"
                        title="Sao chép"
                      >
                        <FaCopy className="text-gray-600 text-lg" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteCard(card.id)}
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
// fdEntries (log minh họa các phần tử trong FormData gửi lên BE)