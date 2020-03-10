import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "serious-game-list-accordion",
  styleUrls: ["./list-accordion.component.scss"],
  templateUrl: "./list-accordion.component.html"
})
export class ListAccordionComponent implements OnInit {

  @Input() public title: string;
  @Input() public expanded: boolean = false;

  constructor() {
    //
  }

  public ngOnInit() {
    //
  }

}
