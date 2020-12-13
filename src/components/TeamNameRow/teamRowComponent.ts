import { Component } from "../component";
import { TeamName } from "./teamNameComponent";
import { TeamCell } from "./teamCellComponent";
import { ITeams } from "../../utils/IDepartment-teams";
import { ICell } from "./cellContext";

export class TeamRowComponent extends Component {

  // point all fields
  depTeamInfo: ITeams;
  monthLength: number;
  date: Date;
  hideTable: Function;
  daysContext: ICell[];

  constructor(parentSelector: string | HTMLElement | Element, depTeamInfo: ITeams, monthLength: number, date: Date, hideTable: Function) {
    super(parentSelector, "tr");

    // init fields
    this.hideTable = hideTable;
    this.date = date;
    this.monthLength = monthLength;
    this.depTeamInfo = depTeamInfo;
    this.component.className = `mainRow ${this.depTeamInfo.name.split(" ")[0].toLowerCase()}`;
    this.daysContext = [];
  }

  generateTeamHeader(): void {
    // add team-name into the head
    const teamName = new TeamName(this.component, this.depTeamInfo, this.date, this.hideTable);
    this.component.append(teamName.component);

    // add empty cells according the month
    for (let index = 0; index <= 31; index++) {
      const teamCell = new TeamCell(this.component, this.depTeamInfo, this.monthLength, this.date);
      this.daysContext.push(teamCell);
      this.component.append(teamCell.component);

      // hide cells, if month length is less then 31
      if (index - 1 >= this.monthLength) {
        teamCell.hide();
      }
    }
  }

  updateTeamHeader(newDate: Date) {
    // find out previous and new month`s lengths 
    const daysInPreviousMonth: number = this.monthLength;
    this.monthLength = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate();

    //get the percentage value of absent, percent holder and current month and put there the value
    const percentageOfAbsentData: number[] = this.daysContext[0].depTeamInfo.percentageOfAbsent;
    const percent: Element = this.component.querySelector(".percent")!;
    const currentMonth: number = newDate.getMonth();
    percent.textContent = `${percentageOfAbsentData[currentMonth]} %`;

    // if new month is shorter then previous, hide cells
    if (this.monthLength < daysInPreviousMonth) {
      for (let index = this.monthLength; index < daysInPreviousMonth; index++) {
        this.daysContext[index].hide();
      }
    // if new month is bigger - show according month length
    } else if (this.monthLength > daysInPreviousMonth) {
      for (let index = daysInPreviousMonth; index < this.monthLength; index++) {
        this.daysContext[index].show();
      }
    }
  }

  renderNameRow(): void {
    this.generateTeamHeader();
    super.render();
  }
}
