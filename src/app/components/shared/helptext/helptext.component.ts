import { Component, OnInit, Input } from "@angular/core";
import { Helptext } from "src/lib/models/Helptext";

@Component({
  selector: "serious-game-helptext",
  templateUrl: "./helptext.component.html",
  styleUrls: ["./helptext.component.scss"]
})
export class HelptextComponent implements OnInit {
  @Input() helptext: Helptext;

  constructor() {}

  ngOnInit() {}
}
