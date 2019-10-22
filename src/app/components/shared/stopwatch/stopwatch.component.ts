import { Component, OnInit } from "@angular/core";
import { timer } from "rxjs";
import moment from "moment";
@Component({
  selector: "serious-game-stopwatch",
  templateUrl: "./stopwatch.component.html",
  styleUrls: ["./stopwatch.component.scss"]
})
export class StopwatchComponent implements OnInit {
  private start: number = Date.now();
  private elapsedTime: number;
  constructor() {}

  ngOnInit() {
    console.log("start!");
    timer(0, 1).subscribe(ellapsedCycles => {
      this.elapsedTime = Date.now() - this.start;
    });
  }
  ngOnDestroy() {
    console.log("end!");
  }
}
