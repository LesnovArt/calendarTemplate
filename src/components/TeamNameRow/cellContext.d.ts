import { ITeams } from "../../utils/IDepartment-teams"

export interface ICell {
  hide(): void;
  show(): void;
  parent: string | HTMLElement;
  component: string | HTMLElement;
  depTeamInfo: ITeams;
  monthLength: number;
  date: Date;
}

