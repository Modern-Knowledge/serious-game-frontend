import { Component, Input, OnInit } from '@angular/core';

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
    this.points -= value;
  }

  resetScore() {
    this.points = 100;
  }

  ngOnDestroy() {
    this.resetScore();
  }
}
