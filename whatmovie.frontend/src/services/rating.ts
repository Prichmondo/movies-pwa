import { IResponse, getErrorResponse, getSuccessResponse } from "../domain/IResponse";
import { put, post, BASEURL } from './apiClient';
import { IPagingData } from "../domain/IPagingData";
import { IMovie } from "../domain/IMovie";
import { cleanCache } from "./movieService";

export async function putRating(  
  movieId: number,
  rating: number,
  genres: string,
  controller: undefined | AbortController = undefined
): Promise<IResponse<IPagingData<IMovie>>> {
  try {
    const response = await Promise.all([
      put<IPagingData<IMovie>>(
        `${BASEURL}/ratings`, 
        { body: JSON.stringify({ movieId, rating, genres }) },
        controller
      ),
      cleanCache()
    ]);
    const puResponse = response[0];
    return getSuccessResponse(puResponse);
  } catch (error) {
    return getErrorResponse(error.code, error.message);
  }
}