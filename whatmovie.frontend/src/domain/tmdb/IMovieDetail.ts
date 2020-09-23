import { ICollection } from "./ICollection";
import { ICountry } from "./ICountry";
import { IGenre } from "./IGenre";
import { ILanguage } from "./ILanguage";
import { IProductionCompany } from "./IProductionCompany";

export interface IMovieDetail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: ICollection;
  budget: number;
  genres: IGenre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: 8.584;
  poster_path: string;
  production_companies: IProductionCompany[];
  production_countries: ICountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: ILanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}