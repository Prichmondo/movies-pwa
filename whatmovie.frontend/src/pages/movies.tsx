import React, { useEffect, useContext } from "react"
import { PageProps } from "gatsby"
import { searchMovies } from "../services/movieService";
import PrivateRoute from "../components/privateRoute";
import { AuthContext } from "../context/authContext";

const Movies = (props: PageProps) => { 

  const { isLoggedin, isInitializing } = useContext(AuthContext);

  const search = async () => {
    const response = await searchMovies('');
    console.log(response);
  }

  useEffect(() => {
    if(!isInitializing && isLoggedin) {
      search();
    }
  }, [isInitializing]);

  return (
    <PrivateRoute>
      
    </PrivateRoute>
  );
}

export default Movies
