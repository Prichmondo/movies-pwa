import { ICreditsPerson } from "./ICreditsPerson";

export interface ICastMember extends ICreditsPerson {
  cast_id: number;
  character: string;
  order: number;
}