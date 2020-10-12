import React, { useEffect, useState, ReactNode, Provider, useReducer, ReducerAction } from "react";
import { MovieSearchState, MovieSearchContext, MovieSearchProps } from "../context/movieSearchContext";
import * as AuthService from "../services/authService";
import { navigate } from "gatsby";
import { hasValue } from "../utils";
import { CognitoUser } from 'amazon-cognito-identity-js';
import { searchMovies } from "../services/movieService";

export type Props = {
    children: ReactNode
}

export const MovieSearchContextProvider = ({ children }: Props) => {

  const [state, setState] = useState<MovieSearchProps>({
    searchTerm: '',
    genre:'',
    currentPage: 0,
    itemsPerPage: 36
  });
  
  function setSearchTerm(searchTerm: string){
    setState({...state, searchTerm, currentPage: 0 });
  }

  function setGenre(genre: string){
    setState({...state, genre});
  }

  function setCurrentPage(currentPage: number){
    setState({...state, currentPage});
  }

  function setItemsPerPage(itemsPerPage: number){
    setState({...state, itemsPerPage});
  }

  return (
      <MovieSearchContext.Provider value={{...state, 
        setSearchTerm,
        setGenre,
        setCurrentPage,
        setItemsPerPage
      }}>
          {children}
      </MovieSearchContext.Provider>
  );
}