import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Helptext } from "src/lib/models/Helptext";

@Component({
  selector: "serious-game-helptext",
  templateUrl: "./helptext.component.html",
  styleUrls: ["./helptext.component.scss"]
})
export class HelptextComponent implements OnInit {
  @Input() public helptexts: Helptext[];

  constructor(private modalController: ModalController) {}

  public ngOnInit() {}

  public dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }
}
