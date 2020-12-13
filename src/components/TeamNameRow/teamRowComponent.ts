import { Component } from "../component";
import { TeamName } from "./teamNameComponent";
import { TeamCell } from "./teamCellComponent";
import { ITeams } from "../../utils/IDepartment-teams";
import { ICell } from "./cellContext";

export class TeamRowComponent extends Component {
  depTeamInfo: ITeams;
  monthLength: number;
  date: Date;
  hideTable: Function;
  daysContext: ICell[];

  constructor(parentSelector: string | HTMLElement, depTeamInfo: ITeams, monthLength: number, date: Date, hideTable: Function) {
    super(parentSelector, "tr");
    this.hideTable = hideTable;
    this.date = date;
    this.monthLength = monthLength;
    this.depTeamInfo = depTeamInfo;
    this.component.className = `mainRow ${this.depTeamInfo.name.split(" ")[0].toLowerCase()}`;
    this.daysContext = [];
  }

  generateTeamHeader(): void {
    const teamName = new TeamName(this.component, this.depTeamInfo, this.date, this.hideTable);
    this.component.append(teamName.component);
    for (let index = 0; index <= 31; index++) {
      const teamCell = new TeamCell(this.component, this.depTeamInfo, this.monthLength, this.date);
      this.daysContext.push(teamCell);
      this.component.append(teamCell.component);
      if (index - 1 >= this.monthLength) {
        teamCell.hide();
      }
    }
  }

  updateTeamHeader(newDate: Date) {
    const daysInPreviousMonth = this.monthLength;
    this.monthLength = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate();
    const percentageOfAbsentData = this.daysContext[0].depTeamInfo.percentageOfAbsent;
    const percent = this.component.querySelector(".percent")!;
    const currentMonth = newDate.getMonth();
    percent.textContent = `${percentageOfAbsentData[currentMonth]} %`;

    if (this.monthLength < daysInPreviousMonth) {
      for (let index = this.monthLength; index < daysInPreviousMonth; index++) {
        this.daysContext[index].hide();
      }
    } else if (this.monthLength > daysInPreviousMonth) {
      for (let index = daysInPreviousMonth; index < this.monthLength; index++) {
        this.daysContext[index].show();
      }
    }
  }

  renderNameRow() {
    this.generateTeamHeader();
    super.render();
  }
}
