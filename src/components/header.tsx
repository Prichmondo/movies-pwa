import { Link, navigate } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

type Props = {
  siteTitle: string
}

const Header = ({ siteTitle }: Props) => {

  const handleClick = () => {
    navigate('/login');
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
          <button type="button" onClick={handleClick}>Login</button>
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
