import { IResponse, getErrorResponse, getSuccessResponse } from "../domain/IResponse";
import { getFromCache } from './apiClient';
import { IMovieDetail } from "../domain/tmdb/IMovieDetail";
import { IMovieImages } from "../domain/tmdb/IMovieImages";
import { IMovieCredits } from "../domain/tmdb/IMovieCredits";

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '29fa852c4aa3afb25276f463b7b19bb1';

export async function getMovieDetails(movieId: number): Promise<IResponse<IMovieDetail>> {
  try {
    const response = await getFromCache<IMovieDetail>(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-UK`);
    return getSuccessResponse(response);
  } catch (error) {
    return getErrorResponse(error.code, error.message);
  }
}

export async function getMovieImages(movieId: number): Promise<IResponse<IMovieImages>> {
  try {
    const response = await getFromCache<IMovieImages>(`${BASE_URL}/movie/${movieId}/images?api_key=${API_KEY}&language=en`);
    return getSuccessResponse(response);
  } catch (error) {
    return getErrorResponse(error.code, error.message);
  }
}

export async function getMovieCredits(movieId: number): Promise<IResponse<IMovieCredits>> {
  try {
    const response = await getFromCache<IMovieCredits>(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en`);
    return getSuccessResponse(response);
  } catch (error) {
    return getErrorResponse(error.code, error.message);
  }
}