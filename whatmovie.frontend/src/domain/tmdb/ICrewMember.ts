import { ICreditsPerson } from "./ICreditsPerson";

export interface ICrewMember extends ICreditsPerson {
  department: string;
  job: string;
}