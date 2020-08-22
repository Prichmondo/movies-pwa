import { Link, navigate } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext } from "react"
import styled from "styled-components"
import { AuthContext } from "../context/authContext"
import { signOut } from "../services/authService"

type Props = {
  siteTitle: string
}

const Header = ({ siteTitle }: Props) => {

  const { isLoggedin, isLoading, setLoggedin } = useContext(AuthContext);

  const handleSignInClick = () => {
    navigate('/login');
  }

  const handleSignOutClick = async () => {
    const response = await signOut();
    console.log('SignOut response', response);
    setLoggedin(false);
    navigate('/');
  }

  function getUserAction() {
    if(isLoading) {
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
