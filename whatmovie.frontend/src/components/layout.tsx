import React, { useContext } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import GlobalStyle from "./globalStyle";
import { AuthContext } from "../context/authContext";
import styled from "styled-components";

const Layout = ({ children }: { children: React.ReactNode }) => {
  
  const { isLoggedin } = useContext(AuthContext);

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <MainWrapper data-hidden={isLoggedin}>
      <GlobalStyle />
      <Header siteTitle={data.site.siteMetadata.title} />
      <div>
        <main>{children}</main>
        <footer>
          Empty footer
        </footer>
      </div>
    </MainWrapper>
  )
}

const MainWrapper = styled.div`
  &:after {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    bottom: 0;
    top: 0;
    background-image: url('/images/bg.jpg');
    z-index: -1;
    opacity: 0.1;
  }
  &[data-hidden="true"]{
    &:after {
      display: none;      
    }
  }
`

export default Layout
