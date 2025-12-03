import { ICourseDetailData } from "../../interfaces/CourseVideo/ICourseVideo";
import { get } from "../../../../ultils/request";
import { handleResponse, getErrorMessage } from "../../../../../../helpers/api/response/handleResponse";
import { IApiResponse } from "../../../../../../helpers/api/response/IResponse";

/**
 * Load course detail data from API for details page
 */
export const loadCourseDetailData = async (id: string): Promise<ICourseDetailData | null> => {
  try {
    const result = await get(`/admin/courses/details/${id}`) as IApiResponse<ICourseDetailData>;
    const { isSuccess, data, error } = handleResponse(result);
    
    if (isSuccess && data) {
      return data;
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


