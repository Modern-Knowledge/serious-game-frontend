import { Component, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Helptext } from "serious-game-library/dist/models/Helptext";

@Component({
    selector: "serious-game-helptext",
    styleUrls: ["./helptext.component.scss"],
    templateUrl: "./helptext.component.html"
})
export class HelptextComponent {
    @Input() public helptexts: Helptext[];

    constructor(private modalController: ModalController) {}

    public dismiss() {
        this.modalController.dismiss({
            dismissed: true
        });
    }
}
