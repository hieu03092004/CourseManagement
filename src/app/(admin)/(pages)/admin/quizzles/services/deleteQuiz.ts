import { del } from "../../../../ultils/request";
import { IApiResponse } from "../../../../../../helpers/api/response/IResponse";

export const deleteQuiz = async (id: string): Promise<IApiResponse<unknown>> => {
  const response = await del(`/admin/quizz/delete/${id}`);
  return response as IApiResponse<unknown>;
};

