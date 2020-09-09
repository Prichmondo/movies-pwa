import './amplify.config';
import React from "react"
import { AuthContextProvider } from "./providers/authContextProvider"

type Props = {
    element: any
}

export default ({ element }: Props) => (
    <AuthContextProvider>
        {element}
    </AuthContextProvider>
)