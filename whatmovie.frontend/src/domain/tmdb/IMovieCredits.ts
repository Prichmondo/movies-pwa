import { ICastMember } from './ICastMember';
import { ICrewMember } from './ICrewMember';


export interface IMovieCredits {
  id: number;
  cast: ICastMember[];
  crew: ICrewMember[];
}