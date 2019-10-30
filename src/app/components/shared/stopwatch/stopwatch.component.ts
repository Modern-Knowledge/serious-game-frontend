import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { timer, Subscription } from "rxjs";
import moment from "moment";
@Component({
  selector: "serious-game-stopwatch",
  templateUrl: "./stopwatch.component.html",
  styleUrls: ["./stopwatch.component.scss"]
})
export class StopwatchComponent implements OnInit {
  @Input() running: boolean;
  @Output() isReset: EventEmitter<number> = new EventEmitter();
  @Output() timeChanged: EventEmitter<number> = new EventEmitter();
  private start: number = Date.now();
  private elapsedTime: number;
  private timerSubscription: Subscription = new Subscription();
  constructor() {}

  ngOnInit() {
    this.timerSubscription = timer(0, 1).subscribe(ellapsedCycles => {
      this.elapsedTime = Date.now() - this.start;
      this.timeChanged.emit(this.elapsedTime);
    });
  }
  reset() {
    this.isReset.emit(this.elapsedTime);
    this.start = Date.now();
  }
  ngOnDestroy() {
    this.timerSubscription.unsubscribe();
  }
}
