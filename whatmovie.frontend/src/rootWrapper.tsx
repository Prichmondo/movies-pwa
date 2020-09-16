import './amplify.config';
import React from "react"
import { AuthContextProvider } from "./providers/authContextProvider"
import { MovieSearchContextProvider } from "./providers/movieSearchContextProvider"

type Props = {
    element: any
}

export default ({ element }: Props) => (
    <AuthContextProvider>
      <MovieSearchContextProvider>
        {element}
      </MovieSearchContextProvider>
    </AuthContextProvider>
)