import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";

@Component({
    selector: "serious-game-error-count",
    styleUrls: ["./error-count.component.scss"],
    templateUrl: "./error-count.component.html"
})
export class ErrorCountComponent implements OnInit, OnDestroy {
    /**
     * the error count passed to the component
     */
    @Input() public givenErrorCount: number;

    /**
     * the class applied to the error counter
     */
    @Input() public class: string = "";

    /**
     * emits when the error count has increased
     */
    @Output() public countIncreased: EventEmitter<number> = new EventEmitter();

    /**
     * error count
     */
    public errorCount: number = 0;

    public ngOnInit() {
        if (this.givenErrorCount) {
            this.errorCount = this.givenErrorCount;
        }
    }

    /**
     * increase game error count
     * @param number value
     */
    public increaseCount(value: number = 1) {
        this.errorCount += value;
        this.countIncreased.emit(this.errorCount);
    }

    /**
     * reset game error count to 0
     */
    public reset() {
        this.errorCount = 0;
    }

    /**
     * reset counter on destroy
     */
    public ngOnDestroy() {
        this.reset();
    }
}
