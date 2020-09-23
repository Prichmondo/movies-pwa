import React from "react"
import styled, { useTheme } from "styled-components"
import { WatchList } from "../icons/watchList"
import { WatchListAdd } from "../icons/watchListAdd"
import { Theme } from "../types/theme"
import { Spinner } from "./spinner"

type Props = {
  inWatchlist: boolean;
  loading: boolean;
  onClick: () => void;
  size?: number;
}

export function WatchListButton({ loading, inWatchlist, size, onClick }: Props) {

  const theme = useTheme() as Theme;
  const spinnerSize = size ? size : 20;
  const iconSize = size ? size*1.25 : 24;
  const getWatchListAction = () => {

    if(loading) {
      return <Spinner variant="secondary" width={spinnerSize} borderSize={3} />
    }

    return inWatchlist
      ? <WatchList 
          width={iconSize}
          height={iconSize}
          fill={theme.palette.tertiary.main} 
          />
      : <WatchListAdd 
          width={iconSize}
          height={iconSize}
          fill={theme.palette.secondary.lighter} 
          />
  }
  
  return (
    <WatchListButtonStyle onClick={onClick}>
      {getWatchListAction()}
    </WatchListButtonStyle>
  )
}

const WatchListButtonStyle = styled.div`
  cursor: pointer;
  height: 24px;
`;