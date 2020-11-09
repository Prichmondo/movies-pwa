import { IResponse, getErrorResponse, getSuccessResponse } from "../domain/IResponse";
import { get, getFromCache,  put, del, BASEURL } from './apiClient';
import { IPagingData } from "../domain/IPagingData";
import { IMovie } from "../domain/IMovie";
import { cleanCache } from "./movieService";

export async function getWatchList(  
  currentPage: number = 0, 
  itemsPerPage: number = 40
): Promise<IResponse<IPagingData<IMovie>>> {
  
  try {
    const response = await getFromCache<IPagingData<IMovie>>(`${BASEURL}/watchlist?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`);
    return getSuccessResponse(response);
  } catch (error) {
    return getErrorResponse(error.code, error.message);
  }

}

export async function addToWatchList(  
  movieId: number
): Promise<IResponse<IPagingData<IMovie>>> {
  try {
    const response = await put<IPagingData<IMovie>>(`${BASEURL}/watchlist`, { body: JSON.stringify({ 'movieId': movieId }) });
    await cleanCache();
    return getSuccessResponse(response);
  } catch (error) {
    return getErrorResponse(error.code, error.message);
  }

}

export async function removeToWatchList(  
  movieId: number
): Promise<IResponse<IPagingData<IMovie>>> {
  try {
    const response = await del<IPagingData<IMovie>>(`${BASEURL}/watchlist`, { body: JSON.stringify({ 'movieId': movieId }) });
    await cleanCache();
    return getSuccessResponse(response);
  } catch (error) {
    return getErrorResponse(error.code, error.message);
  }
}