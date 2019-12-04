import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "serious-game-drag-zone",
  templateUrl: "./drag-zone.component.html",
  styleUrls: ["./drag-zone.component.scss"]
})
export class DragZoneComponent implements OnInit {
  @Input() public id: string;
  @Input() public name: string;
  @Input() public model: string;

  constructor() {}

  public ngOnInit() {}
}
