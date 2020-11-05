import React, {  } from "react"
import styled, { css, useTheme } from "styled-components";
import { Theme, WithThemeProps } from "../types/theme";
import { GridItem } from "../components/gridItem";
import { Grid } from "../components/grid";
import { Typography } from "../components/typography";
import { RatingStars } from "../components/ratingStars";
import { InteractiveRatingStars } from "../components/InteractiveRatingStars";
import { WatchListButton } from "../components/watchListButton";
import { TextSkeleton } from "./skeletons/textSkeleton";

type Props = {
  loading: boolean;
  userRating: number;
  avgRating: number;
  watchList: boolean;
  watchlistLoading: boolean;
  ratingLoading: boolean;
  onWatchListChange: () => void;
  onRatingChange: (value: number) => void;
}

const MovieDetailAction = ({ 
  loading, ratingLoading, watchlistLoading, userRating, avgRating, watchList, onWatchListChange, onRatingChange
}: Props) => { 
  
  const theme = useTheme() as Theme;

  const handleWatchListChange = async () => {
    onWatchListChange();
  }

  const handleRatingChange = async (userRating: number) => {    
    onRatingChange(userRating); 
  }

  return (
    <Grid>
      <GridItem xs={12} md={8} align="left">

        <PanelWrapper>
          <Grid>
            <GridItem xs={6} align="center">
              <RatingContainer>
                {loading 
                  ? <TextSkeleton /> 
                  : <Typography testid="avg-rating" component="span">Users rating</Typography> 
                }
                <RatingStars rating={avgRating} />        
              </RatingContainer>                      
            </GridItem>
            <GridItem xs={6} align="center">
              <RatingContainer>
                {loading 
                  ? <TextSkeleton /> 
                  : <Typography testid="user-rating" component="span">Your rating</Typography>
                }
                <InteractiveRatingStars
                  disabled={loading || watchlistLoading}
                  color={theme.palette.tertiary.main} 
                  rating={userRating}
                  onChange={handleRatingChange}
                  />          
              </RatingContainer>
            </GridItem>
          </Grid>
        </PanelWrapper>

      </GridItem>
      <GridItem xs={12} md={4} align="right">
        <MyListPanelWrapper onClick={handleWatchListChange}>
          <WatchListButton 
            loading={watchlistLoading}
            inWatchlist={watchList}                        
            size={24}
            />
          {loading 
            ? <TextSkeleton style={{ width: '25%' }}/> 
            : <Typography testid="my-list-text" component="span">My List</Typography> 
          } 
        </MyListPanelWrapper>
      </GridItem>            
    </Grid>
  );
}


const PanelWrapper = styled.div`
  ${({ theme }: WithThemeProps) => css`
    padding: ${theme.gutter/1.5}px ${theme.gutter}px;
    width: 100%;
    background-color: rgba(3,29,51,0.5);
    border-radius: ${theme.borderRadius.lg};
  `}
`

const MyListPanelWrapper = styled(PanelWrapper)`
  ${({ theme }: WithThemeProps) => css`
    display: flex;
    text-align: left;
    align-items: center;
    justify-content: center;
    margin-top: ${theme.gutter}px;
    cursor: pointer;

    & > *:last-child {
      margin-left: 5px;
    }

    @media (min-width: ${theme.breakPoints.md}px) {
      margin-top: 0;
    }
  `}
`

const RatingContainer = styled.div`
  ${({ theme }: WithThemeProps) => css`
    
    text-align: center;
    font-size: ${theme.typography.size.small};
    color: ${theme.palette.secondary.lighter};
    & > div {
      margin-top: 5px;
      max-width: 100px;
    }

    @media (min-width: ${theme.breakPoints.md}px) {
      font-size: ${theme.typography.size.main};
    }
  `}
`;

export default MovieDetailAction
