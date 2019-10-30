import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "serious-game-scored-points",
  templateUrl: "./scored-points.component.html",
  styleUrls: ["./scored-points.component.scss"]
})
export class ScoredPointsComponent implements OnInit {
  @Input() time: number;
  private points: number = 100;

  constructor() {}

  ngOnInit() {}

  calculatePoints(): number {
    return this.points > 0 ? this.points - this.time / 1000 : 0;
  }

  deductScore(value: number) {
    // TODO: store score in database - the score cannot be calculated with only the elapsed time, because
    // points must be deductable on an error
    this.points -= value;
  }

  resetScore() {
    this.points = 100;
  }

  ngOnDestroy() {
    this.resetScore();
  }
}
