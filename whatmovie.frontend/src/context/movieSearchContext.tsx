import { createContext } from "react";

export type MovieSearchProps = {
  searchTerm: string;
  genre:string;
  currentPage: number;
  itemsPerPage: number;
}

export type MovieSearchAction = {
  setSearchTerm: (searchTerm: string) => void;
  setGenre: (genre: string) => void;
  setCurrentPage: (currentPage: number) => void;
  setItemsPerPage: (itemsPerPage: number) => void;
}

export type MovieSearchState = MovieSearchProps & MovieSearchAction;

const defaultMovieSearchState: MovieSearchState = {
  searchTerm: '',
  genre:'',
  currentPage: 0,
  itemsPerPage: 36,
  setSearchTerm: () => {},
  setGenre: () => {},
  setCurrentPage: () => {},
  setItemsPerPage: () => {}
}

export const MovieSearchContext = createContext<MovieSearchState>(defaultMovieSearchState);