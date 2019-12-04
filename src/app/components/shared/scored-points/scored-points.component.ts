import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "serious-game-scored-points",
  templateUrl: "./scored-points.component.html",
  styleUrls: ["./scored-points.component.scss"]
})
export class ScoredPointsComponent implements OnInit {
  @Input() public time: number;
  private points: number = 100;

  constructor() {}

  public ngOnInit() {}

  public calculatePoints(): number {
    return this.points > 0 ? this.points - this.time / 1000 : 0;
  }

  public deductScore(value: number) {
    this.points -= value;
  }

  public resetScore() {
    this.points = 100;
  }

  public ngOnDestroy() {
    this.resetScore();
  }
}
