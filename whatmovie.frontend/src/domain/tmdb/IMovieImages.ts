import { IMovieImage } from "./IMovieImage";

export interface IMovieImages {
  id: number;
  backdrops: IMovieImage[];
  posters: IMovieImage[];
}