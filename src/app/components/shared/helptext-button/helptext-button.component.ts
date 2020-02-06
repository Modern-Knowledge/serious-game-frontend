import { Component, Input } from "@angular/core";
import { ModalWrapper } from "src/app/util/ModalWrapper";
import { Helptext } from "src/lib/models/Helptext";

import { HelptextComponent } from "../helptext/helptext.component";

@Component({
    providers: [ModalWrapper],
    selector: "serious-game-helptext-button",
    styleUrls: ["./helptext-button.component.scss"],
    templateUrl: "./helptext-button.component.html"
})
export class HelptextButtonComponent {
    @Input() public helptexts: Helptext[];
    constructor(private modalWrapper: ModalWrapper) {}

    public showHelpText() {
        this.modalWrapper.present(HelptextComponent, {
            helptexts: this.helptexts
        });
    }
}
