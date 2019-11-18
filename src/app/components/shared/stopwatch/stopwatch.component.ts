import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { Subscription, timer } from "rxjs";

@Component({
    selector: "serious-game-stopwatch",
    styleUrls: ["./stopwatch.component.scss"],
    templateUrl: "./stopwatch.component.html"
})
export class StopwatchComponent implements OnInit, OnDestroy {
    public elapsedTime: number;
    @Input() private running: boolean;
    @Output() private isReset: EventEmitter<number> = new EventEmitter();
    @Output() private timeChanged: EventEmitter<number> = new EventEmitter();
    private start: number = Date.now();
    private timerSubscription: Subscription = new Subscription();

    public ngOnInit() {
        this.timerSubscription = timer(0, 1).subscribe(() => {
            this.elapsedTime = Date.now() - this.start;
            this.timeChanged.emit(this.elapsedTime);
        });
    }
    public reset() {
        this.isReset.emit(this.elapsedTime);
        this.start = Date.now();
    }
    public ngOnDestroy() {
        this.timerSubscription.unsubscribe();
    }
}
