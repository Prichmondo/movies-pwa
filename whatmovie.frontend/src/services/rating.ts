import { IResponse, getErrorResponse, getSuccessResponse } from "../domain/IResponse";
import { put, post, BASEURL } from './apiClient';
import { IPagingData } from "../domain/IPagingData";
import { IMovie } from "../domain/IMovie";

export async function putRating(  
  movieId: number,
  rating: number,
  genres: string
): Promise<IResponse<IPagingData<IMovie>>> {
  try {
    const response = await put<IPagingData<IMovie>>(
      `${BASEURL}/ratings`, 
      { 
        body: JSON.stringify({ movieId, rating, genres }) 
      }
    );
    return getSuccessResponse(response);
  } catch (error) {
    return getErrorResponse(error.code, error.message);
  }
}