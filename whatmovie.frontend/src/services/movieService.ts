import { IResponse, getErrorResponse, getSuccessResponse } from "../domain/IResponse";
import { get, BASEURL } from './apiClient';
import { IPagingData } from "../domain/IPagingData";
import { IMovie } from "../domain/IMovie";


export async function getMovie(movieId: number): Promise<IResponse<IMovie>> {
  try {
    const response = await get<IMovie>(`${BASEURL}/movie?movieId=${movieId}`);    
    return getSuccessResponse(response);
  } catch (error) {
    return getErrorResponse(error.code, error.message);
  }
}

export async function searchMovies(  
  searchTerm: string,
  genre:string = '',
  currentPage: number = 0, 
  itemsPerPage: number = 40
): Promise<IResponse<IPagingData<IMovie>>> {
  
  try {
    const response = await get<IPagingData<IMovie>>(`${BASEURL}/movies?searchTerm=${searchTerm}&genre=${genre}&currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`);
    return getSuccessResponse(response);
  } catch (error) {
    return getErrorResponse(error.code, error.message);
  }

}

export async function getReccomendedMovies(  
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

export async function getPopularMovies(  
  currentPage: number = 0, 
  itemsPerPage: number = 40
): Promise<IResponse<IPagingData<IMovie>>> {
  try {
    const response = await get<IPagingData<IMovie>>(`${BASEURL}/popularmovies?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`);
    return getSuccessResponse(response);
  } catch (error) {
    return getErrorResponse(error.code, error.message);
  }
}