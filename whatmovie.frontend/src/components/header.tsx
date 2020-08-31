import React, { useContext } from "react"
import { Link, navigate } from "gatsby"
import styled from "styled-components"
import { AuthContext } from "../context/authContext"
import { Button } from "./button"

type Props = {
  siteTitle: string
}

const Header = ({ siteTitle }: Props) => {

  const { isLoggedin, isInitializing, signOut } = useContext(AuthContext);

  const handleSignInClick = () => {
    navigate('/login');
  }

  const handleSignOutClick = async () => {
    signOut();
  }

  function getUserAction() {
    if(isInitializing) {
      return null;
    }

    if(isLoggedin) {
      return <Button type="button" variant="primary" onClick={handleSignOutClick}>Sign out</Button>
    }

    return <Button type="button" variant="primary" onClick={handleSignInClick}>Sign in</Button>
  }

  return (
    <HeaderWrapper>
      <HeaderGrid>
        <HeaderLogo>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </HeaderLogo>
        <div>
          {getUserAction()}
        </div>
      </HeaderGrid>
    </HeaderWrapper>
  )
};

const HeaderWrapper = styled.header`
  /* background: rgb(0,0,0); */
  background: linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 50%);
  margin-bottom: 1.45rem;
`

const HeaderGrid = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
  display: flex;
  flex-direction: row;
`

const HeaderLogo = styled.h1`
  margin: 0;
  flex-grow: 1;
`

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
