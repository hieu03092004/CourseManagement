import { ICourseCreate } from "../../interfaces/ICourseCreate";
import { get, patch } from "../../../../ultils/request";
import { handleResponse, getErrorMessage } from "../../../../../../helpers/api/response/handleResponse";
import { IApiResponse } from "../../../../../../helpers/api/response/IResponse";

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB

/**
 * Load course data from API
 */
export const loadCourseData = async (id: string): Promise<{
  initialData: ICourseCreate;
  existingImage: string;
} | null> => {
  try {
    const result = await get(`/admin/courses/details/${id}`) as IApiResponse<ICourseCreate>;
    const { isSuccess, data, error } = handleResponse(result);
    
    if (isSuccess && data) {
      const initialFormData: ICourseCreate = {
        userId: 1,
        title: data.title || "",
        description: data.description || "",
        target: data.target || "",
        result: data.result || "",
        image: data.image || "",
        duration: data.duration || 0,
        price: data.price || 0,
        type: data.type || "video",
        discountPercent: data.discountPercent || 0,
      };
      
      return {
        initialData: initialFormData,
        existingImage: data.image || "",
      };
    } else {
      const errorMessage = error?.message || 'Có lỗi xảy ra khi tải dữ liệu khóa học!';
      console.error("Error:", error);
      alert(errorMessage);
      return null;
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error("Error:", error);
    alert(errorMessage);
    return null;
  }
};

/**
 * Update form data when input changes
 */
export const updateFormData = (
  formData: ICourseCreate,
  name: string,
  value: string
): ICourseCreate => {
  return {
    ...formData,
    [name]: name === "duration" || name === "price" || name === "discountPercent"
      ? parseFloat(value) || 0
      : value,
  };
};

/**
 * Validate file size
 */
export const validateFileSize = (file: File): boolean => {
  if (file.size > MAX_FILE_SIZE) {
    alert("Kích thước file không được vượt quá 25 MB");
    return false;
  }
  return true;
};

/**
 * Simulate upload progress
 */
export const simulateUpload = (
  setUploadProgress: (progress: number) => void
): void => {
  let progress = 0;
  const interval = setInterval(() => {
    progress += 10;
    setUploadProgress(progress);
    if (progress >= 100) {
      clearInterval(interval);
    }
  }, 200);
};

/**
 * Prepare FormData with only changed fields
 */
export const prepareFormData = (
  formData: ICourseCreate,
  initialData: ICourseCreate,
  uploadedFile: File | null
): {
  formDataToSend: FormData;
  changedFields: Record<string, unknown>;
  hasChanges: boolean;
} => {
  const formDataToSend = new FormData();
  const changedFields: Record<string, unknown> = {};

  Object.keys(formData).forEach((key) => {
    const fieldKey = key as keyof ICourseCreate;
    const currentValue = formData[fieldKey];
    const initialValue = initialData[fieldKey];

    if (fieldKey === 'image') {
      if (uploadedFile) {
        changedFields[fieldKey] = uploadedFile.name;
        formDataToSend.append('image', uploadedFile);
      }
    } else if (fieldKey !== 'userId' && currentValue !== initialValue) {
      changedFields[fieldKey] = currentValue;
      if (typeof currentValue === 'string' || typeof currentValue === 'number') {
        formDataToSend.append(key, currentValue.toString());
      }
    }
  });

  const hasChanges = Object.keys(changedFields).length > 0 || uploadedFile !== null;

  return {
    formDataToSend,
    changedFields,
    hasChanges,
  };
};

/**
 * Submit course update
 */
export const submitCourseUpdate = async (
  id: string,
  formDataToSend: FormData
): Promise<{
  isSuccess: boolean;
  error?: string;
}> => {
  try {
    const result = await patch(`/admin/courses/edit/${id}`, formDataToSend) as IApiResponse;
    const { isSuccess, error } = handleResponse(result);
    
    if (isSuccess) {
      return { isSuccess: true };
    } else {
      const errorMessage = error?.message || 'Có lỗi xảy ra khi cập nhật khóa học!';
      return { isSuccess: false, error: errorMessage };
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    return { isSuccess: false, error: errorMessage };
  }
};

/**
 * Extract filename from URL
 */
export const getImageFileName = (imageUrl: string): string => {
  return imageUrl.split('/').pop() || imageUrl;
};

/**
 * Get image source for Image component
 */
export const getImageSrc = (imageUrl: string): string => {
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  return `/src/assets/images/${imageUrl}`;
};

/**
 * Initialize default form data
 */
export const initializeFormData = (): ICourseCreate => {
  return {
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
  };
};

/**
 * Create preview URL from File object
 */
export const createImagePreview = (file: File): string => {
  return URL.createObjectURL(file);
};

/**
 * Revoke preview URL to free memory
 */
export const revokeImagePreview = (url: string): void => {
  URL.revokeObjectURL(url);
};

