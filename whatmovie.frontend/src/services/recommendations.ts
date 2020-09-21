import { IResponse, getErrorResponse, getSuccessResponse } from "../domain/IResponse";
import { get, BASEURL } from './apiClient';
import { IPagingData } from "../domain/IPagingData";
import { IMovie } from "../domain/IMovie";

export async function getRecommendations(  
  currentPage: number = 0, 
  itemsPerPage: number = 40
): Promise<IResponse<IPagingData<IMovie>>> {
  
  try {
    const response = await get<IPagingData<IMovie>>(`${BASEURL}/recommendations?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`);
    return getSuccessResponse(response);
  } catch (error) {
    return getErrorResponse(error.code, error.message);
  }

}