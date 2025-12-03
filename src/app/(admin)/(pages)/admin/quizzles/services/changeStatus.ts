import { patch } from "../../../../ultils/request";
import { IApiResponse } from "../../../../../../helpers/api/response/IResponse";

interface ChangeStatusRequest {
  status: "active" | "inactive";
  quizzId: string;
}

export const changeStatus = async (
  data: ChangeStatusRequest
): Promise<IApiResponse<unknown>> => {
  const response = await patch("/admin/quizz/changeStatus", data);
  return response as IApiResponse<unknown>;
};

