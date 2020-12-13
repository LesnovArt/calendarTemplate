import { ITeams } from "../../utils/IDepartment-teams"

export interface ICell {
  hide(): void;
  show(): void;
  parent: string | HTMLElement | Element;
  component: string | HTMLElement | Element;
  depTeamInfo: ITeams;
  monthLength: number;
  date: Date;
}

