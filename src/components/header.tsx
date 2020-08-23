import React, { useContext } from "react"
import { Link, navigate } from "gatsby"
import styled from "styled-components"
import { AuthContext } from "../context/authContext"

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
      return <button type="button" onClick={handleSignOutClick}>Sign out</button>
    }

    return <button type="button" onClick={handleSignInClick}>Sign in</button>
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
  background: black;
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
