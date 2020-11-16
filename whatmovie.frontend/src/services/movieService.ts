import { IResponse, getErrorResponse, getSuccessResponse } from "../domain/IResponse";
import { getFromCache, BASEURL } from './apiClient';
import { IPagingData } from "../domain/IPagingData";
import { IMovie } from "../domain/IMovie";
import { Cache } from 'aws-amplify';


export async function getMovie(
  movieId: number, 
  controller: undefined | AbortController = undefined
): Promise<IResponse<IMovie>> {
  try {
    const response = await getFromCache<IMovie>(`${BASEURL}/movie?movieId=${movieId}`, {}, controller);    
    return getSuccessResponse(response);
  } catch (error) {
    return getErrorResponse(error.code, error.message);
  }
}

export async function searchMovies(  
  searchTerm: string,
  genre:string = '',
  currentPage: number = 0, 
  itemsPerPage: number = 36,
  controller: undefined | AbortController = undefined
): Promise<IResponse<IPagingData<IMovie>>> {
  
  try {
    const response = await getFromCache<IPagingData<IMovie>>(
      `${BASEURL}/movies?searchTerm=${searchTerm}&genre=${genre}&currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`, {}, controller);
    return getSuccessResponse(response);
  } catch (error) {
    return getErrorResponse(error.code, error.message);
  }

}

export async function getRated(  
  currentPage: number = 0, 
  itemsPerPage: number = 36,
  controller: undefined | AbortController = undefined
): Promise<IResponse<IPagingData<IMovie>>> {
  
  try {
    const response = await getFromCache<IPagingData<IMovie>>(
      `${BASEURL}/movies/rated?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`, {}, controller);
    return getSuccessResponse(response);
  } catch (error) {
    return getErrorResponse(error.code, error.message);
  }

}

export async function getReccomendedMovies(  
  currentPage: number = 0, 
  itemsPerPage: number = 40,
  controller: undefined | AbortController = undefined
): Promise<IResponse<IPagingData<IMovie>>> {
  
  try {
    const response = await getFromCache<IPagingData<IMovie>>(
      `${BASEURL}/recommendations?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`, {}, controller);
    return getSuccessResponse(response);
  } catch (error) {
    return getErrorResponse(error.code, error.message);
  }

}

export async function getPopularMovies(  
  currentPage: number = 0, 
  itemsPerPage: number = 40,
  genre: string = '',
  controller: undefined | AbortController = undefined
): Promise<IResponse<IPagingData<IMovie>>> {
  try {
    const response = await getFromCache<IPagingData<IMovie>>(
      `${BASEURL}/popularmovies?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}&genre=${genre}`, {}, controller);
    return getSuccessResponse(response);
  } catch (error) {
    return getErrorResponse(error.code, error.message);
  }
}

export async function cleanCache(): Promise<boolean> {
  try {
    const keys = await Cache.getAllKeys();
    const moviesApiKeys = keys.filter(k => k.indexOf(BASEURL) > -1);
    moviesApiKeys.forEach(key => {
      Cache.removeItem(key);
    });
    return true;
  } catch (error) {
    return false;
  }  
}