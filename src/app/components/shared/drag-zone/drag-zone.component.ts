import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "serious-game-drag-zone",
  templateUrl: "./drag-zone.component.html",
  styleUrls: ["./drag-zone.component.scss"]
})
export class DragZoneComponent implements OnInit {
  @Input() name: string;
  @Input() model: string;

  constructor() {}

  ngOnInit() {}
}
