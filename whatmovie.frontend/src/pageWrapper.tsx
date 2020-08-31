import React from "react"
import Layout from "./components/layout";
import { ThemeProvider } from "styled-components";
import { mainTheme } from "./theme/main";

type Props = {
    element: any
}

export default ({ element }: Props) => (
    <ThemeProvider theme={mainTheme}>
        <Layout>
            {element}
        </Layout>
    </ThemeProvider>
)