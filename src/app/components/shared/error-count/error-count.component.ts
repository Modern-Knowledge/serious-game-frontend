import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: "serious-game-error-count",
  templateUrl: "./error-count.component.html",
  styleUrls: ["./error-count.component.scss"]
})
export class ErrorCountComponent implements OnInit {
  /**
   * the error count passed to the component
   */
  @Input() givenErrorCount: number;

  /**
   * emits when the error count has increased
   */
  @Output() countIncreased: EventEmitter<number> = new EventEmitter();

  /**
   * error count
   */
  public errorCount: number = 0;

  constructor() {}

  ngOnInit() {
    if (this.givenErrorCount) {
      this.errorCount = this.givenErrorCount;
    }
  }

  /**
   * increase game error count
   * @param number value
   */
  increaseCount(value: number = 1) {
    this.errorCount += value;
    this.countIncreased.emit(this.errorCount);
  }

  /**
   * reset game error count to 0
   */
  reset() {
    this.errorCount = 0;
  }

  /**
   * reset counter on destroy
   */
  ngOnDestroy() {
    this.reset();
  }
}
