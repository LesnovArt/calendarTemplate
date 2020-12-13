import { Component } from "../component";
import { ITeams } from "../../utils/IDepartment-teams";

export class TeamCell extends Component {
  depTeamInfo: ITeams;
  monthLength: number;
  date: Date;

  constructor(parentSelector: string | HTMLElement, depTeamInfo: ITeams, monthLength: number, date: Date) {
    super(parentSelector, "td");
    this.depTeamInfo = depTeamInfo;
    this.monthLength = monthLength;
    this.component.className = "teamInfo";
    this.date = date;
  }
}


