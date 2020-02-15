import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/providers/auth.service";

@Component({
    selector: "serious-game-score-board",
    styleUrls: ["./score-board.page.scss"],
    templateUrl: "./score-board.page.html"
})
export class ScoreBoardPage implements OnInit {
    public userIsTherapist: boolean = false;
    constructor(private authService: AuthService) {}

    public ngOnInit() {
        this.userIsTherapist = this.authService.isTherapist();
    }
}
