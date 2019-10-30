import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "serious-game-scored-points",
  templateUrl: "./scored-points.component.html",
  styleUrls: ["./scored-points.component.scss"]
})
export class ScoredPointsComponent implements OnInit {
  @Input() time: number;
  points: number = 100;

  constructor() {}

  ngOnInit() {}

  calculatePoints(): number {
    // TODO: also calculate points based on failed tries
    return this.points - this.time / 1000;
  }
}
