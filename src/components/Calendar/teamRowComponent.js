import { Component } from "../component";
import { TeamName } from "./teamNameComponent";
import { TeamCell } from "./teamCellComponent";
import { TeamSum } from "./teamSumComponent";

export class TeamRowComponent extends Component {
  constructor(parentSelector, depTeamInfo, monthLength, date) {
    super(parentSelector, "tr");
    this.teamMembers = [];
    this.date = date;
    this.monthLength = monthLength;
    this.depTeamInfo = depTeamInfo;
    this.component.className = `mainRow ${this.depTeamInfo.name
      .split(" ")[0]
      .toLowerCase()}`;
  }

  generateTeamHeader() {
    const teamName = new TeamName(this.component, this.depTeamInfo, this.date);
    this.component.append(teamName);

    for (let index = 0; index < this.monthLength; index++) {
      const teamCell = new TeamCell(
        this.component,
        this.depTeamInfo,
        this.monthLength,
        this.date,
      );
      this.component.append(teamCell);
    }

    const teamSum = new TeamSum();
    this.component.append(teamSum);
  }

  render() {
    this.generateTeamHeader();
    super.render();
  }
}
