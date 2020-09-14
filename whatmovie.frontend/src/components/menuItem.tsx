import React, { FunctionComponent, ReactNode } from "react"
import styled, { useTheme, StyledComponentPropsWithRef } from "styled-components"
import { Theme } from "../types/theme"
import { Star } from "../icons/star"
import { Typography } from "./typography"

type Props = {
  icon: ReactNode;
} & StyledComponentPropsWithRef<'div'>;

const MenuItemComponent = ({ children, icon, ...rest }: Props) => {
  return (
    <MenuItemStyle {...rest}>
      <MenuIcon>
        {icon}
      </MenuIcon>
      <Typography as="div">
        {children}
      </Typography>
    </MenuItemStyle>   
  )
};

const MenuIcon = styled.div`
  width: 50px;
  text-align: center;
`

const MenuItemStyle = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  ${Typography} {
    align-self: center;
  }
  ${MenuIcon}, ${Typography} {
    padding-top: 10px;
    padding-bottom: 10px;
  }
`

export const MenuItem = styled<FunctionComponent<Props>>(MenuItemComponent)({}, );
