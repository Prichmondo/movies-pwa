import React from "react"
import { AuthContextProvider } from "./providers/authProvider"

type Props = {
    element: any
}

export default ({ element }: Props) => (
    <AuthContextProvider>
        {element}
    </AuthContextProvider>
)