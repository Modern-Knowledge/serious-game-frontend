import { Component, Input, OnDestroy } from "@angular/core";

@Component({
    selector: "serious-game-scored-points",
    styleUrls: ["./scored-points.component.scss"],
    templateUrl: "./scored-points.component.html"
})
export class ScoredPointsComponent implements OnDestroy {
    @Input() public time: number;
    private points: number = 100;

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
