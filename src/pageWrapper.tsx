import React from "react"
import Layout from "./components/layout";

type Props = {
    element: any
}

export default ({ element }: Props) => (
    <Layout>
        {element}
    </Layout>
)