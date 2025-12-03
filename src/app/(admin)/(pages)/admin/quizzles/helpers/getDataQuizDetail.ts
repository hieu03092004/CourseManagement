import { get } from "../../../../ultils/request";
import { handleResponse } from "../../../../../../helpers/api/response/handleResponse";
import { IApiResponse } from "../../../../../../helpers/api/response/IResponse";
import { BackendQuizData } from "../../interfaces/Quiz/IQuiz";

export const getDataQuizDetail = async (id: string): Promise<BackendQuizData | null> => {
  try {
    const response = await get(`/admin/quizz/details/${id}`) as IApiResponse<BackendQuizData>;
    const { isSuccess, data, error } = handleResponse(response);

    if (isSuccess && data) {
      return data;
    } else {
      console.error("Error:", error);
      return null;
    }
  } catch (error) {
    console.error("Error fetching quiz detail:", error);
    return null;
  }
};

