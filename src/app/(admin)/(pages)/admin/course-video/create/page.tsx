"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { FaCloudUploadAlt, FaTrash } from "react-icons/fa";
import { ICourseCreate } from "../../interfaces/ICourseCreate";
import { post } from "../../../../ultils/request";
import { ApiResponse } from "../../../../helpers/handleReponse";
import Image from "next/image";
import {
  createImagePreview,
  revokeImagePreview,
  validateFileSize as validateFileSizeHelper,
} from "../services/EditLessonService";

export default function CreateCoursePage() {
  const [formData, setFormData] = useState<ICourseCreate>({
    userId: 1,
    title: "",
    description: "",
    target: "",
    result: "",
    image: "",
    duration: 0,
    price: 0,
    type: "video",
    discountPercent: 0,
  });
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [imagePreview, setImagePreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "duration" || name === "price" || name === "discountPercent"
        ? parseFloat(value) || 0
        : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!validateFileSizeHelper(file)) {
        return;
      }
      // Revoke previous preview URL if exists
      if (imagePreview) {
        revokeImagePreview(imagePreview);
      }
      // Create new preview URL
      const previewUrl = createImagePreview(file);
      setImagePreview(previewUrl);
      setUploadedFile(file);
      setUploadProgress(0);
      simulateUpload();
      setFormData((prev) => ({
        ...prev,
        image: file.name,
      }));
    }
  };

  const simulateUpload = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 200);
  };

  const handleDeleteFile = () => {
    // Revoke preview URL to free memory
    if (imagePreview) {
      revokeImagePreview(imagePreview);
      setImagePreview("");
    }
    setUploadedFile(null);
    setUploadProgress(0);
    setFormData((prev) => ({
      ...prev,
      image: "",
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (!validateFileSizeHelper(file)) {
        return;
      }
      // Revoke previous preview URL if exists
      if (imagePreview) {
        revokeImagePreview(imagePreview);
      }
      // Create new preview URL
      const previewUrl = createImagePreview(file);
      setImagePreview(previewUrl);
      setUploadedFile(file);
      setUploadProgress(0);
      simulateUpload();
      setFormData((prev) => ({
        ...prev,
        image: file.name,
      }));
    }
  };

  // Cleanup: revoke preview URL when component unmounts or imagePreview changes
  useEffect(() => {
    return () => {
      if (imagePreview) {
        revokeImagePreview(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const body = new FormData();
      body.append("user_id", String(formData.userId));
      body.append("title", formData.title);
      body.append("description", formData.description);
      body.append("target", formData.target);
      body.append("result", formData.result);
      body.append("duration", String(formData.duration));
      body.append("price", String(formData.price));
      body.append("type", formData.type);
      body.append("discount_percent", String(formData.discountPercent));

      if (uploadedFile) {
        body.append("image", uploadedFile);
      }

      const result = await post('/admin/courses/create', body) as ApiResponse;
      
      if (result.success) {
        alert("Tạo khoá học thành công!");
        setFormData({
          userId: 1,
          title: "",
          description: "",
          target: "",
          result: "",
          image: "",
          duration: 0,
          price: 0,
          type: "video",
          discountPercent: 0,
        });
        // Revoke preview URL to free memory
        if (imagePreview) {
          revokeImagePreview(imagePreview);
          setImagePreview("");
        }
        setUploadedFile(null);
        setUploadProgress(0);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        // Handle validation errrs
        if (result.error.code === 'VALIDATION_ERROR' && result.error.errors) {
          alert(`${result.error.message}`);
        } else {
          alert(`Lỗi: ${result.error.message || 'Có lỗi xảy ra khi tạo khóa học!'}`);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = error instanceof Error ? error.message : 'Có lỗi xảy ra khi tạo khóa học!';
      alert(errorMessage);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Thêm khóa học mới</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-[5px] shadow p-6 max-w-3xl">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tên khóa học
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-[5px] focus:outline-none focus:border-[var(--color-main-admin)]"
            placeholder="Nhập tên khóa học"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mô tả
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-[5px] focus:outline-none focus:border-[var(--color-main-admin)]"
            placeholder="Nhập mô tả khóa học"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mục tiêu
          </label>
          <textarea
            name="target"
            value={formData.target}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-[5px] focus:outline-none focus:border-[var(--color-main-admin)]"
            placeholder="Nhập mục tiêu khóa học"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kết quả
          </label>
          <textarea
            name="result"
            value={formData.result}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-[5px] focus:outline-none focus:border-[var(--color-main-admin)]"
            placeholder="Nhập kết quả khóa học"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hình ảnh khóa học
          </label>
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors"
          >
            {!uploadedFile ? (
              <div className="flex flex-col items-center">
                <FaCloudUploadAlt className="text-blue-500 text-5xl mb-3" />
                <div className="text-sm text-gray-600 mb-1">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-blue-500 hover:underline font-medium"
                  >
                    Click to Upload
                  </button>
                  {" "}or drag and drop
                </div>
                <div className="text-xs text-gray-500">(Max. file size: 25 MB)</div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-3">
                    {imagePreview ? (
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        width={80}
                        height={80}
                        className="w-20 h-20 object-cover "
                        unoptimized
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center">
                        <FaCloudUploadAlt className="text-gray-400 text-2xl" />
                      </div>
                    )}
                    <div className="text-left">
                      <div className="text-sm font-medium text-gray-900">{uploadedFile.name}</div>
                      <div className="text-xs text-gray-500">{(uploadedFile.size / 1024).toFixed(2)} KB</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleDeleteFile}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <FaTrash />
                  </button>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <div className="text-right text-sm text-gray-600">{uploadProgress}%</div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Thời lượng (giờ)
            </label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-[5px] focus:outline-none focus:border-[var(--color-main-admin)]"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loại khóa học
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-[5px] focus:outline-none focus:border-[var(--color-main-admin)] bg-white"
            >
              <option value="video">Video</option>
              <option value="zoom">Zoom</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Giá (VNĐ)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-[5px] focus:outline-none focus:border-[var(--color-main-admin)]"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Giảm giá (%)
            </label>
            <input
              type="number"
              name="discountPercent"
              value={formData.discountPercent}
              onChange={handleChange}
              min="0"
              max="100"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 rounded-[5px] focus:outline-none focus:border-[var(--color-main-admin)]"
              placeholder="0"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outlined" color="inherit">
            Hủy
          </Button>
          <Button variant="contained" type="submit" startIcon={<AddIcon />}>
            Thêm
          </Button>
        </div>
      </form>
    </div>
  );
}

