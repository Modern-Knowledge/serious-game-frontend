import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { DragulaService } from "ng2-dragula";

@Component({
  selector: "serious-game-drop-zone",
  templateUrl: "./drop-zone.component.html",
  styleUrls: ["./drop-zone.component.scss"]
})
export class DropZoneComponent implements OnInit {
  @Input() name: string;
  @Input() model: string;
  @Output() itemDropped: EventEmitter<any> = new EventEmitter<any>();

  constructor(private dragulaService: DragulaService) {}

  ngOnInit() {
    this.dragulaService.dropModel(this.name).subscribe(value => {
      this.itemDropped.emit(value.item);
    });
  }
}
