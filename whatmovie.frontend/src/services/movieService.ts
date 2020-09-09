import { IResponse, getErrorResponse, getSuccessResponse } from "../domain/IResponse";
import { get, BASEURL } from './apiClient';

export async function searchMovies(  
  searchTerm: string,
  genre:string = '',
  currentPage: number = 0, 
  itemsPerPage: number = 40
): Promise<IResponse<any>> {
  
  try {
    const response = await get<any>(`${BASEURL}/movies?searchTerm=${searchTerm}&genre=${genre}&currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`);
    return getSuccessResponse(response);
  } catch (error) {
    return getErrorResponse(error.code, error.message);
  }

}